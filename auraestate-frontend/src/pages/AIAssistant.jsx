import { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text,
      },
      {
        type: "ai",
        text: "I can help you explore properties, compare options, and find a home based on your preferences.",
      },
    ]);

    setMessage("");
  };

  return (
    <>
      <Navbar />

      <main className="page-container ai-page">
        <div className="page-header">
          <p className="small-label">
            <Sparkles size={14} />
            AI-POWERED GUIDANCE
          </p>

          <h1>AI Assistant</h1>

          <p>
            Tell me what you're looking for and I'll
            guide you through your property search.
          </p>
        </div>

        <section className="ai-assistant-container">

          <div className="ai-welcome">
            <div className="ai-icon">
              <Bot size={28} />
            </div>

            <div>
              <h2>How can I help you?</h2>

              <p>
                Ask me about properties, locations,
                budgets, or comparisons.
              </p>
            </div>
          </div>


          <div className="ai-suggestions">

            <button
              onClick={() =>
                setMessage(
                  "Show me properties under ₹50 lakhs"
                )
              }
            >
              Properties under ₹50 lakhs
            </button>

            <button
              onClick={() =>
                setMessage(
                  "Find properties suitable for a family"
                )
              }
            >
              Family-friendly properties
            </button>

            <button
              onClick={() =>
                setMessage(
                  "Help me compare properties"
                )
              }
            >
              Help me compare properties
            </button>

          </div>


          <div className="ai-chat">

            {messages.length === 0 ? (
              <div className="ai-empty">
                <Bot size={30} />

                <p>
                  Start a conversation with your AI
                  property assistant.
                </p>
              </div>
            ) : (
              messages.map((item, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    item.type === "user"
                      ? "user-message"
                      : "ai-message"
                  }`}
                >
                  <div className="chat-avatar">
                    {item.type === "user" ? (
                      <User size={16} />
                    ) : (
                      <Bot size={16} />
                    )}
                  </div>

                  <p>{item.text}</p>
                </div>
              ))
            )}

          </div>


          <div className="ai-input-area">

            <input
              type="text"
              value={message}
              placeholder="Ask about properties..."
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              type="button"
            >
              <Send size={18} />
              Send
            </button>

          </div>

        </section>
      </main>
    </>
  );
}