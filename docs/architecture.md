#AuraGen system Architecture
## 1. Overview
AuraGen (AuraEstate) is an AI- powered real estate paltform that detects when user struggle with complex interactions and intelligently adapts the interface to provide guidance. 

## 2. Technology stack 
Frontend - React + Vite
Backend - Python + FastAPI
Database - PostgreSQL
ORM - SQLAlchemy 
Validation - Pydantic 
Authentication - JWT 
AI/LLM - Gemini API 
RAG - Custom retrieval system 
VD - TBD 
API testing - Swagger UI 
version control - GIT + GitHub 
## 3. High-Level-Architecture
User
↓
React Frontend
↓ HTTP / REST
FastAPI Backend
↓
├─→ PostgreSQL Database
└─→ AI Layer
↓
├─→ Gemini API
└─→ Vector DB
## 4. Backend folder structure
backend/
└── app/
├── main.py → FastAPI entry point
├── routes/ → API endpoints
│ ├── interaction.py → Event tracking
│ ├── properties.py → Property APIs
│ ├── auth.py → Authentication (in progress)
│ └── ai.py → AI assistant (planned)
├── schemas/ → Pydantic models
│ ├── interaction.py
│ ├── property.py
│ └── user.py → (planned)
├── services/ → Business logic
│ ├── cognitive_load.py → Core engine
│ ├── adaptive_ui.py → UI decisions
│ ├── properties_data.py → Mock data
│ └── auth_service.py → (planned)
├── models/ → SQLAlchemy tables (planned)
└── database/ → DB connection (planned)

## 5. Core-Flow - Cognitive Load Engine 
User interact with UI 
    |
Frontend sends event - POST/api/interaction/event
    |
Backend adds events to session Memory 
    |
Cognitive Load Engine Calculates score 
    |
Score - Level(Low,Medium,High)
    |
Adaptive UI service generates UI action 
    |
Responce sent to frontend
    |
Frontend adapts UI 
## 6. Cognitive Load Weights 
| Event Type | Weight |
|---|---|
| validation_error | +20 |
| help_request | +20 |
| repeated_click | +15 |
| section_revisit | +10 |
| back_navigation | +10 |
| long_inactivity | +10 |

## 7. Cognitive Load Thresholds

| Score Range | Level | UI Action |
|---|---|---|
| 0-30 | LOW | normal |
| 31-60 | MEDIUM | simplify |
| 61+ | HIGH | guide |

## 8. API Endpoints

### Interaction & Cognitive Load
- `POST /api/interaction/event`
- `GET /api/cognitive-load/{session_id}`

### Properties (Mock)
- `GET /api/properties`
- `GET /api/properties/{id}`

### Auth (In Progress — Vidya)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### AI (Planned — Mounika)
- `POST /api/ai/assistant`
- `POST /api/ai/guidance`

## 9. Team Roles

| Member | Role | Ownership |
|---|---|---|
| Komal | Full Stack + Core Engine Lead | Cognitive Load Engine, Adaptive UI, Integration |
| Ramya | Frontend Developer | React UI, Login, Property pages |
| Vidya | Backend + Database | PostgreSQL, Auth, User model |
| Mounika | AI + Admin/Analytics | AI architecture, Admin UI, RAG |

## 10. Development Phases

| Phase | Status |
|---|---|
| 1. Requirements | ✅ Done |
| 2. UI/UX Design | ✅ Done |
| 3. System Architecture | ✅ Done |
| 4. Database Design | ⏳ In progress |
| 5. Auth + Core Backend | ⏳ In progress |
| 6. Property + User Modules | ⏳ In progress |
| 7. Frontend Development | ⏳ In progress |
| 8. Cognitive Load Engine | ✅ Done |
| 9. Adaptive UI | ✅ Done |
| 10. LLM Integration | ⏳ Pending |
| 11. RAG + Vector DB | ⏳ Pending |
| 12. AI Guidance Cache | ⏳ Pending |
| 13. Admin Analytics | ⏳ Pending |
| 14. Testing | ⏳ Pending |
| 15. Deployment | ⏳ Pending |
| 16. Documentation | ⏳ In progress |
