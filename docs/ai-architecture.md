# AuraGen AI Architecture
## 1. Purpose

AuraGen is an AI-Adaptive Real Estate Platform that helps users discover properties, understand property information, compare properties, evaluate investment opportunities, and receive contextual AI guidance.

The AI system uses Gemini, Retrieval-Augmented Generation (RAG), embeddings, and vector-based retrieval to provide relevant and useful responses to users.

## 2. AI Components

The AuraGen AI system consists of the following components:

- Gemini API – used as the Large Language Model (LLM) for generating AI responses.
- AI Property Assistant – helps users understand properties, investment concepts, comparisons, and real-estate information.
- Knowledge Base – contains real-estate knowledge, FAQs, investment concepts, buying processes, guides, property-related information, and platform information.
- RAG (Retrieval-Augmented Generation) – retrieves relevant information from the knowledge base before generating a response.
- Embeddings – represent knowledge-base content as numerical vectors for semantic retrieval.
- Vector Database – stores embeddings and supports similarity-based retrieval.
- Prompt Engineering – defines how context and user questions are provided to the LLM.
- AI Evaluation – tests the quality, relevance, and consistency of AI responses.

## 3. AI Request Flow

The AI request flow in AuraGen follows these steps:

1. The user asks a question or requests guidance.
2. The current user context and relevant application information are collected.
3. The AI service receives the request through the FastAPI backend.
4. The system determines whether relevant knowledge needs to be retrieved.
5. If required, the RAG pipeline retrieves relevant information from the knowledge base.
6. The retrieved context is combined with the user's question and the appropriate prompt.
7. The request is sent to the Gemini API.
8. Gemini generates the AI response.
9. The response is validated and returned to the application.
10. The frontend displays the response as contextual AI guidance.

## 4. AI Property Assistant

The AI Property Assistant provides users with contextual assistance related to real estate.

It can help users with:

- Understanding property details
- Explaining why a property may be worth considering
- Understanding property advantages
- Explaining investment-related concepts
- Comparing properties
- Understanding rental suitability
- Explaining real-estate terms in simple language
- Providing information about nearby facilities when relevant

The assistant should provide concise, relevant, and easy-to-understand responses based on the user's current context.

## 5. Knowledge Base

The AuraGen knowledge base will contain information that can be used by the AI Property Assistant.

The knowledge base may include:

- Real-estate concepts and terminology
- Frequently Asked Questions (FAQs)
- Investment concepts
- Property buying processes
- Real-estate guides
- Amenities and facilities information
- Relevant documents
- Company and platform information

This knowledge base provides the source information that can be retrieved when answering user questions.

## 6. Retrieval-Augmented Generation (RAG)

RAG is used to provide the Gemini model with relevant information from the AuraGen knowledge base before generating an answer.

The RAG process follows these steps:

1. The user's question is received.
2. The question is used to identify relevant information.
3. The system retrieves relevant content from the knowledge base.
4. The retrieved content is provided as context to the Gemini model.
5. Gemini generates a response using the user's question and the retrieved context.

RAG helps the AI Property Assistant provide responses based on the available AuraGen knowledge rather than relying only on the model's general knowledge.

## 7. Embeddings

Embeddings represent text as numerical vectors that capture the semantic meaning of the content.

In AuraGen, knowledge-base content will be converted into embeddings before being stored in the vector database.

When a user asks a question, the question can also be converted into an embedding. This allows the system to identify knowledge-base content that is semantically similar to the user's question.

The embedding process supports semantic retrieval in the RAG pipeline.

## 8. Vector Database

The vector database will store embeddings generated from the AuraGen knowledge base.

When a user submits a question, the question can be converted into an embedding and compared with the stored embeddings.

The most relevant content can then be retrieved and passed to the RAG pipeline as context for generating the AI response.

The specific vector database technology will be finalized during implementation.

## 9. Prompt Engineering

Prompt engineering will be used to guide the Gemini model to generate relevant, concise, and context-aware responses.

AuraGen will use separate prompts for different AI tasks, such as:

- AI Property Assistant responses
- Contextual guidance based on the user's current situation

Prompts can include the user's question, relevant application context, retrieved knowledge, and instructions for generating the response.

The prompts will be refined and evaluated during development to improve response quality and consistency.

## 10. AI and Backend Integration

The AI functionality will be integrated with the FastAPI backend through dedicated AI routes and services.

The AI route will receive the required request data and pass it to the AI service.

The AI service will handle:

- Prompt construction
- Knowledge retrieval
- Gemini API interaction
- Response processing
- AI response validation

The backend will then return the processed AI response to the frontend.

The AI request may include information such as the user's question, current page or section, relevant application state, user context, and cognitive-load or friction signals when required.

## 11. Cognitive Load and AI Guidance

AuraGen uses cognitive-load information to provide context-aware assistance to users.

The cognitive-load system identifies the user's interaction difficulty using signals such as repeated actions, errors, navigation behavior, inactivity, and help requests.

Based on the detected cognitive-load level:

- LOW – the normal interface and interaction are maintained.
- MEDIUM – important information can be highlighted and contextual explanations can be provided.
- HIGH – the interface can be simplified and direct contextual guidance can be provided.

When AI guidance is required, the relevant user context and interaction information can be passed to the AI service. The AI system can then generate short and relevant guidance for the user's current situation.

The goal is to reduce user difficulty without removing important functionality.

## 12. AI Response Evaluation

AI responses will be evaluated to check their quality, relevance, consistency, and usefulness.

The evaluation process will include a controlled set of real-estate questions covering areas such as:

- Property information
- Real-estate terminology
- Investment concepts
- Property comparison
- Rental suitability
- Buying-related guidance

The evaluation results will be used to identify incorrect, irrelevant, or unclear responses and improve prompts, retrieval, and AI behavior.

AI response evaluation will be refined during development as the knowledge base and AI functionality evolve.

## 13. Overall AI Architecture

The overall AuraGen AI architecture can be summarized as:

User
↓
React Frontend
↓
FastAPI Backend
↓
AI Service
↓
RAG Pipeline
↓
Embedding and Vector Retrieval
↓
Relevant Context
↓
Prompt + User Question + Context
↓
Gemini API
↓
AI Response Validation
↓
Contextual AI Guidance
↓
React Frontend

