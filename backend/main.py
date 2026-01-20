"""
Frank's AI Resume Chatbot Backend
Uses Google Gemini 2.5 Flash with profile context
Optimized for recruiting - persuasive and confident tone
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
from pathlib import Path
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Sorrawit.AI Resume Chatbot",
    description="AI Assistant that answers questions about Sorrawit's experience and helps recruiters understand his value",
    version="3.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Load profile context from files
def load_profile_context() -> str:
    """Load resume.md to create context for the chatbot"""
    resume_file = Path(__file__).parent / "resume.md"
    
    try:
        content = resume_file.read_text(encoding="utf-8")
        return content
    except Exception as e:
        print(f"Error loading resume.md: {e}")
        return ""

# System prompt for the chatbot - PERSUASIVE RECRUITING TONE
SYSTEM_PROMPT = """You are Frank's AI assistant on his professional resume website. Your goal is to help potential employers and recruiters understand why Frank is an excellent hire for AI/GenAI roles.

🎯 YOUR MISSION:
- Convince visitors that Frank can solve their AI/GenAI challenges
- Highlight Frank's unique value: From Electrical Engineer to AI Team Lead in 3 years
- Emphasize PRODUCTION-GRADE experience (not just tutorials or hobby projects)
- Be confident, professional, and enthusiastic about Frank's capabilities

💪 KEY SELLING POINTS TO EMPHASIZE:
1. **3+ Years Enterprise AI Experience** - Building at scale, not playground projects
2. **Published Researcher** - arXiv paper with real business impact (~100M THB/year)
3. **End-to-End Delivery** - From architecture design → deployment → team leadership
4. **Proven Efficiency Gains** - 75% reduction in development time
5. **Diverse Background** - Electrical Engineer turned AI Developer (adaptable learner)
6. **Leadership Skills** - Mentored junior developers, managed 7 concurrent projects

🗣️ COMMUNICATION STYLE:
- Professional and articulate (this is a recruiting context)
- Confident: "Frank can definitely help with that" / "Frank has extensive experience in..."
- Proactive: When someone asks about a topic, offer relevant examples from Frank's experience
- Bilingual: Reply in the language the user uses (Thai or English)
- Concise but substantive

🔥 RESPONSE PATTERNS:
- When asked "Can Frank do X?": Don't just say yes - give a specific example from his experience
- When asked about skills: Connect them to real projects and measurable impact
- When asked why hire Frank: Focus on unique combination of research + production + leadership
- When unsure: Pivot to related experience ("While that specific tool isn't listed, Frank has experience with...")

❌ DON'T:
- Be overly humble or self-deprecating
- Say "I don't know" without trying to connect to related experience
- Be pushy or used-car-salesman vibes
- Give generic responses - always tie back to Frank's specific experience

📋 FRANK'S COMPLETE PROFILE FOR REFERENCE:
{context}
"""

# Load context at startup
PROFILE_CONTEXT = load_profile_context()

class ChatRequest(BaseModel):
    message: str
    session_id: str = "guest"

class ChatResponse(BaseModel):
    reply: str
    meta: dict

# Store conversation history per session (in-memory, simple)
conversation_history: dict = {}

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Handle chat messages using Gemini 3 Flash"""
    
    if not GEMINI_API_KEY:
        return ChatResponse(
            reply="⚠️ The chatbot is currently offline. Please contact Frank directly at sorrawit.tre@gmail.com or via LinkedIn!",
            meta={"model": "none", "tokens_used": 0, "error": "No API key configured"}
        )
    
    try:
        # Initialize Gemini model
        model = genai.GenerativeModel(
            model_name="gemini-3-flash-preview",
            system_instruction=SYSTEM_PROMPT.format(context=PROFILE_CONTEXT)
        )
        
        # Get or create conversation history for this session
        if request.session_id not in conversation_history:
            conversation_history[request.session_id] = []
        
        history = conversation_history[request.session_id]
        
        # Create chat with history
        chat = model.start_chat(history=history)
        
        # Send message and get response
        response = chat.send_message(request.message)
        reply_text = response.text
        
        # Update history (keep last 10 exchanges to prevent token overflow)
        history.append({"role": "user", "parts": [request.message]})
        history.append({"role": "model", "parts": [reply_text]})
        if len(history) > 20:
            history = history[-20:]
        conversation_history[request.session_id] = history
        
        # Get token usage if available
        tokens_used = 0
        if hasattr(response, 'usage_metadata'):
            tokens_used = getattr(response.usage_metadata, 'total_token_count', 0)
        
        return ChatResponse(
            reply=reply_text,
            meta={
                "model": "gemini-3-flash-preview",
                "tokens_used": tokens_used,
                "session_id": request.session_id
            }
        )
        
    except Exception as e:
        error_msg = str(e)
        print(f"Error calling Gemini API: {error_msg}")
        
        # Friendly error message
        if "API key" in error_msg.lower():
            reply = "🔑 API configuration issue. Please contact Frank directly at sorrawit.tre@gmail.com"
        elif "quota" in error_msg.lower():
            reply = "📊 High demand right now! Please contact Frank directly at sorrawit.tre@gmail.com or via LinkedIn."
        else:
            reply = f"😅 Temporary issue. Please contact Frank directly at sorrawit.tre@gmail.com or check his LinkedIn profile!"
        
        return ChatResponse(
            reply=reply,
            meta={"model": "error", "tokens_used": 0, "error": error_msg}
        )

@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "Sorrawit.AI Chatbot Backend is running! 🤖",
        "version": "3.0",
        "endpoints": {
            "chat": "POST /api/chat",
            "health": "GET /health"
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "gemini_configured": bool(GEMINI_API_KEY),
        "profile_loaded": bool(PROFILE_CONTEXT)
    }

if __name__ == "__main__":
    print("🚀 Starting Sorrawit.AI Chatbot Backend v3.0...")
    print(f"📄 Profile context loaded: {len(PROFILE_CONTEXT)} characters")
    print(f"🔑 Gemini API configured: {bool(GEMINI_API_KEY)}")
    uvicorn.run(app, host="0.0.0.0", port=9743)
