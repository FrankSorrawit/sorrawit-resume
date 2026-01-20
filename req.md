# ONE-PAGE PERSONAL AI RESUME — REQUIREMENT DOCUMENT

Author: *Sorrawit Treesuk (Frank)*  
Version: **1.0**  
Platform: **HTML + CSS + JavaScript + Self-hosted LLM API**  
Purpose: สร้างเว็บ Resume หน้าเดียว พร้อม Chatbot AI ที่ตอบเกี่ยวกับประวัติ/ผลงานของผู้สร้างได้

---

# **1. Objectives**

1. สร้างเว็บ Resume หน้าเดียว (Single Page Website) สำหรับแสดง:
   - ข้อมูลส่วนตัว  
   - ประสบการณ์ทำงาน  
   - Projects / ผลงาน  
   - การสอน / สัมมนา AI & LLM  
   - ทักษะ (Skill Matrix)  
   - Journey / Career Path  
   - ช่องทางการติดต่อ  
2. มี **Chatbot AI** ที่ให้ผู้ชมถามเกี่ยวกับ:
   - ประวัติ  
   - Project  
   - Skill  
   - Career path  
   - คำถามทั่วไปที่เกี่ยวกับ Frank  
3. เว็บทั้งหมดต้องเขียนด้วย:
   - HTML  
   - CSS  
   - Vanilla JavaScript  
4. Host บน server ใดก็ได้:
   - VPS, Nginx, Apache  
   - Node static server  
   - Docker  
   - GitHub Pages / Cloudflare Pages  

---

# **2. Tech Stack**

## **Frontend**
- HTML5  
- CSS3  
- JavaScript (ES6 Modules)  
- Static assets: WebP/JPG/PNG  
- No framework required  

## **Backend (Chatbot API)**
- FastAPI / Express.js  
- JSON over HTTP  
- CORS allow from website domain  

## **LLM Gateway**
- Azure OpenAI  
- OpenAI  
- Gemini / Vertex AI  
- Local LLM via Ollama  

---

# **3. Directory Structure**

```
your-resume-site/
├─ public/
│  ├─ images/
│  ├─ cv.pdf
│
├─ src/
│  ├─ index.html
│  ├─ css/
│  │  └─ style.css
│  ├─ js/
│  │  ├─ main.js
│  │  ├─ chatbot.js
│  │  └─ data.js
│
└─ backend/
   ├─ main.py
   ├─ requirements.txt
   └─ Dockerfile
```

---

# **4. Frontend Requirements**

## **4.1 Page Sections**

### **1) Hero Section**
- Profile photo  
- Name + Title  
- Tagline  
- Buttons: CV Download, Chatbot Toggle  

### **2) About Me Section**
- Story career path  
- Strengths  
- Working photos  

### **3) Experience Section**
- Timeline style  
- EE → Data Science → AI Developer  
- Bullet impact statements  

### **4) Projects Section**
Grid layout with images + description:  
- FlowFlow  
- PisitLaw  
- KM-NLP  
- Regista  
- Manuel  

### **5) Teaching / Seminar Section**
- Image gallery  
- List of AI/LLM seminar topics  

### **6) Skills Matrix**
- AI/RAG/LLM  
- Cloud/MLOps  
- Software  
- Soft skills  

### **7) Journey (9 Steps)**
3×3 grid  
- EE → DS → AI Developer → Multi-Agent Engineer → AI System Analyst  

### **8) Contact Section**
- Email  
- LinkedIn  
- GitHub  
- Chatbot trigger button  

---

# **4.2 UI/UX Requirements**

- Responsive (mobile-friendly)  
- Modern AI color theme:  
  - #6C63FF  
  - #4C40F7  
  - #0F172A  
  - #E2E8F0  
- Fonts: Inter / Poppins / Prompt  
- Subtle animations (fade-in, hover)  
- Chatbot widget: floating & closable  

---

# **5. Chatbot Requirements**

## **5.1 Features**
- Chat window UI  
- API call to backend  
- Display messages (bot & user)  
- Error states  
- Loading animation  

## **5.2 Persona Prompt**
- Identity: *Frank-AI*  
- Tone: Friendly professional  
- Knowledge source: data.js (resume facts)  

---

# **6. Backend Requirements**

## **6.1 API Specification**

### **Endpoint**
`POST /api/chat`

### **Request JSON**
```json
{
  "message": "Tell me about your RAG experience.",
  "session_id": "abc123"
}
```

### **Response JSON**
```json
{
  "reply": "I have built several real-world RAG systems...",
  "meta": {
    "model": "gpt-4.1",
    "tokens_used": 540
  }
}
```

---

# **7. Backend Functional Requirements**

- Parse request  
- Validate body  
- Build LLM prompt (persona + memory + user message)  
- Call LLM provider  
- Return JSON  
- Log every request:
  - timestamp  
  - session_id  
  - user_message  
  - bot_reply  
  - model, tokens  

---

# **8. Backend Non-Functional Requirements**

- CORS allow only the resume domain  
- HTTPS required  
- Rate limit per IP  
- API keys stored in environment variables  
- Graceful error handling  
- Timeout 10–20 seconds  

---

# **9. Deployment Requirements**

## **Frontend Deploy Options**
- Nginx static hosting  
- GitHub Pages  
- Cloudflare Pages  
- Node `serve`  
- Docker Nginx  

## **Backend Deploy Options**
- Cloud Run (recommended)  
- Fly.io  
- Render.com  
- VPS + Docker + Nginx  
- Uvicorn/Gunicorn  

## **HTTPS / Domain**
- Cloudflare SSL  
- Certbot  

---

# **10. Future Extensions**
- Dark mode  
- Multi-language (EN/TH)  
- Add resume embeddings (RAG mini version)  
- Chat memory  
- Typing animation  
- Admin dashboard (session logs viewer)  

---

# END OF DOCUMENT
