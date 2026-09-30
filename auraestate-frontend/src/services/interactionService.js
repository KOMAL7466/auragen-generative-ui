const EVENT_KEY = "auraestate_events";

export const trackInteraction = (type, data = {}) => {
  const events = JSON.parse(
    localStorage.getItem(EVENT_KEY) || "[]"
  );

  const event = {
    id: Date.now().toString(),
    type,
    data,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem(
    EVENT_KEY,
    JSON.stringify([...events, event].slice(-500))
  );
};

export const getInteractions = () => {
  return JSON.parse(
    localStorage.getItem(EVENT_KEY) || "[]"
  );
};