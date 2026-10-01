import api from "./api";

// Generate a unique session ID for the user
export const getSessionId = () => {
  let sessionId = sessionStorage.getItem("session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem("session_id", sessionId);
  }
  return sessionId;
};

// Track an interaction event
export const trackEvent = async (eventType, page, fieldName = null) => {
  try {
    const response = await api.post("/interaction/event", {
      session_id: getSessionId(),
      event_type: eventType,
      page: page,
      field_name: fieldName,
    });
    return response.data;
  } catch (error) {
    console.warn("Failed to track event:", error);
    return null;
  }
};

// Get current cognitive load state for the session
export const getCognitiveLoad = async () => {
  try {
    const response = await api.get(`/cognitive-load/${getSessionId()}`);
    return response.data;
  } catch (error) {
    console.warn("Failed to get cognitive load:", error);
    return null;
  }
};