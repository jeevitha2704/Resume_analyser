# AI Resume Analyzer & Job Match Platform

A full-stack AI-powered web application that analyzes resumes, provides ATS scoring, skill extraction, job matching, and improvement suggestions.

## 🚀 Features

- **Resume Upload & Parsing**: Support for PDF & DOCX files with intelligent text extraction
- **AI Resume Analysis**: ATS compatibility scoring, keyword optimization, grammar checking
- **Job Description Matching**: Compare resumes against job descriptions with match percentages
- **AI Suggestions Engine**: Resume improvements, skill additions, project suggestions
- **Modern Dashboard**: Clean, responsive UI with dark/light mode

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Recharts (charts & visualizations)
- Axios (API calls)

### Backend
- Python FastAPI
- PostgreSQL database
- JWT authentication
- OpenAI/Local LLM integration

### AI/NLP
- Resume parsing using NLP
- Skill extraction via embeddings
- Cosine similarity for job matching

## 📁 Project Structure

```
resume_analyser/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── requirements.txt
│   └── main.py
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables

Create `.env` files in both backend and frontend directories with the required variables.

## 📊 Database Schema

- `users`: User authentication and profile
- `resumes`: Uploaded resume data
- `analysis_results`: AI analysis results
- `job_matches`: Job description comparisons

## 🤖 AI Features

- ATS compatibility scoring (0-100)
- Skill extraction and categorization
- Resume-JD matching with cosine similarity
- Personalized improvement suggestions
- Role-specific recommendations

## 🎨 UI/UX

- Clean, minimal design
- Mobile responsive
- Dark/Light mode support
- Color-coded feedback (Green/Yellow/Red)
- Interactive charts and progress bars

## 📝 API Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /resume/upload` - Upload resume
- `POST /resume/analyze` - Analyze resume
- `POST /job/match` - Match with job description
- `GET /history` - User history

## 🧪 Testing

Mock data included for:
- Python Developer resumes
- Data Analyst resumes
- Frontend Developer resumes

## 📄 License

MIT License
