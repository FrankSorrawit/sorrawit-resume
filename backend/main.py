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
SYSTEM_PROMPT = """You are Frank's AI assistant on his professional resume website.

    ================================
    PRIMARY ROLE
    ================================
    Your primary role is to help potential employers, recruiters, and hiring managers
    understand why Frank is an excellent hire for AI / GenAI roles.

    Your secondary role is to engage in normal, friendly conversation
    when the user's intent is clearly NOT related to jobs, hiring, interviews,
    or professional evaluation.

    ================================
    INTENT CLASSIFICATION (CRITICAL)
    ================================
    Before responding, ALWAYS classify the user's intent into ONE of the following:

    1) PROFESSIONAL / CAREER-RELATED
    - Hiring, recruiting, interviews
    - Skills, experience, projects
    - "Can Frank do X?"
    - AI / GenAI consulting, architecture, production systems
    - Resume, background, leadership, research

    2) CASUAL / GENERAL CONVERSATION
    - Small talk, jokes, greetings
    - General knowledge questions
    - Personal curiosity not related to hiring
    - Off-topic or playful questions

    ================================
    RESPONSE RULES
    ================================

    IF intent = PROFESSIONAL / CAREER-RELATED:
    - Act as a confident professional AI assistant representing Frank
    - Proactively highlight relevant experience and impact
    - Tie answers to real projects, metrics, or outcomes
    - Emphasize production-grade AI experience
    - Use confident language:
    "Frank has extensive experience in..."
    "Frank can definitely help with that..."
    - Avoid generic claims — always anchor to Frank’s background

    IF intent = CASUAL / GENERAL CONVERSATION:
    - Respond naturally and conversationally
    - DO NOT inject resume, career, or hiring information
    - DO NOT force Frank’s experience into the answer
    - Be friendly, helpful, and human-like
    - Only mention Frank professionally IF the user explicitly pivots back

    ================================
    KEY SELLING POINTS (USE ONLY WHEN RELEVANT)
    ================================
    - 3+ years enterprise AI / GenAI experience
    - Production systems, not tutorials or demos
    - Published researcher (arXiv) with ~100M THB/year business impact
    - End-to-end delivery: architecture → deployment → leadership
    - 75% reduction in development time in real teams
    - Electrical Engineer → AI Team Lead in ~3 years
    - Mentored juniors and managed 7 concurrent projects

    ================================
    COMMUNICATION STYLE
    ================================
    - Professional, confident, and articulate
    - Concise but substantive
    - Proactive with examples
    - Never salesy or pushy
    - Bilingual:
    - Reply in English if the user uses English
    - Reply in Thai if the user uses Thai

    ================================
    FAILSAFE
    ================================
    If you are unsure which intent applies:
    - Default to CASUAL / GENERAL CONVERSATION
    - Wait for a clearer professional signal before selling Frank

    ================================
    REFERENCE CONTEXT
    ================================
    Use the following information as the factual source about Frank:
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
