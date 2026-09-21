# AuraGen — API Documentation

**Base URL:** `http://127.0.0.1:8000`
**Interactive Docs:** `http://127.0.0.1:8000/docs`

## 1. Health Check

### GET /
Check if API is running.

**Response:**
```json
{"message": "AuraEstate API is running"}
2. Authentication
POST /api/auth/register
Register a new user.

Request:

json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test1234"
}
Response (200):

json
{
  "user_id": "50ec09e0-...",
  "name": "Test User",
  "email": "test@example.com",
  "token": "eyJhbGc..."
}
POST /api/auth/login
Login with email and password.

Request:

json
{
  "email": "test@example.com",
  "password": "test1234"
}
Response (200):

json
{
  "user_id": "50ec09e0-...",
  "name": "Test User",
  "token": "eyJhbGc..."
}
GET /api/auth/me
Get current user (JWT required).

Headers:

text
Authorization: Bearer <token>
Response (200):

json
{
  "user_id": "...",
  "name": "Test User",
  "email": "test@example.com",
  "role": "user"
}
3. Interaction & Cognitive Load
POST /api/interaction/event
Record a user interaction event.

Request:

json
{
  "session_id": "demo1",
  "event_type": "validation_error",
  "page": "investment-panel",
  "field_name": "roi"
}
Event Types:

validation_error

repeated_click

help_request

section_revisit

back_navigation

long_inactivity

Response (200):

json
{
  "event": {...},
  "session_total_events": 4,
  "cognitive_load": {
    "score": 65,
    "level": "HIGH",
    "total_events": 4
  },
  "adaptive_ui": {
    "ui_action": "guide",
    "show_help": true,
    "collapse_advanced": true,
    "highlight_important": true,
    "message": "Let's simplify. Focus on the highlighted field first."
  }
}
GET /api/cognitive-load/{session_id}
Get current state of a session.

Response (200):

json
{
  "session_id": "demo1",
  "cognitive_load": {"score": 65, "level": "HIGH", "total_events": 4},
  "adaptive_ui": {...}
}
4. Properties
GET /api/properties
List all properties (with optional filters).

Query Params:

city (optional)

category (optional)

Response:

json
{
  "total": 6,
  "properties": [
    {
      "id": "1",
      "property_code": "AE-CHD-000124",
      "title": "Luxury 4BHK Villa",
      "property_type": "Villa",
      "category": "Luxury",
      "price": 11500000,
      "price_display": "₹1.15 Cr",
      "area": 2100,
      "bedrooms": 4,
      "bathrooms": 3,
      "city": "Chandigarh",
      "locality": "Sector 17",
      "status": "Ready to Move",
      "image_emoji": "🏠",
      "description": "..."
    }
  ]
}
GET /api/properties/{property_id}
Get a single property.

Response (200): Property object
Response (404): {"detail": "Property not found"}

5. Planned Endpoints (AI)
POST /api/ai/assistant — Chat with AI

POST /api/ai/guidance — Contextual help

6. Status Codes
Code	Meaning
200	Success
401	Unauthorized
404	Not found
422	Validation error
500	Server error