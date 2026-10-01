import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { getSessionId, trackEvent } from "../services/interactionService";

const INITIAL_MESSAGE = {
  role: "ai",
  text: "Hello! I'm your AuraGen AI Advisor. Ask me anything about properties, investment, or real estate terms.",
  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

const QUICK_QUESTIONS = [
  "Explain investment horizon",
  "What's ROI?",
  "Is this good for rental?",
  "What's nearby?",
  "Compare these properties",
];

function AIChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      role: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      // Try LLM endpoint first (if Vidya's task is done)
      const res = await api.post("/ai/adapt", {
        session_id: getSessionId(),
        page: "ai-chat",
        field: null,
        question: text,
      });

      const aiText =
        res.data?.response ||
        res.data?.guidance_text ||
        res.data?.message ||
        "I'm processing that. Could you give me more context about which property you're asking about?";

      const aiMsg = {
        role: "ai",
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      trackEvent("help_request", "ai-chat", "question");

      const fallbackMsg = {
        role: "ai",
        text:
          "I'm here to help. For now, please try asking about: investment potential, rental yield, nearby facilities, or comparing properties. The full AI integration is coming soon.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickQuestion = (q) => {
    sendMessage(q);
  };

  return (
    <>
      <Navbar />
      <div className="ai-chat-page">
        <div className="ai-chat-header">
          <div className="ai-chat-header-content">
            <div className="ai-chat-avatar">✦</div>
            <div>
              <h1>AuraGen AI Advisor</h1>
              <p>Contextual guidance · Powered by AI</p>
            </div>
          </div>
          <div className="ai-chat-status">
            <span className="status-dot"></span>
            Online
          </div>
        </div>

        <div className="ai-chat-window">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`ai-msg ai-msg-${msg.role}`}
            >
              {msg.role === "ai" && (
                <div className="ai-msg-avatar">✦</div>
              )}
              <div className="ai-msg-content">
                <div className="ai-msg-bubble">{msg.text}</div>
                <div className="ai-msg-time">{msg.time}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="ai-msg ai-msg-ai">
              <div className="ai-msg-avatar">✦</div>
              <div className="ai-msg-content">
                <div className="ai-msg-bubble ai-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {messages.length <= 1 && (
          <div className="ai-quick-questions">
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                className="ai-quick-btn"
                onClick={() => handleQuickQuestion(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <form className="ai-chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask anything about properties or investment..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="ai-chat-send" disabled={loading || !input.trim()}>
            Send →
          </button>
        </form>
      </div>
    </>
  );
}

export default AIChat;