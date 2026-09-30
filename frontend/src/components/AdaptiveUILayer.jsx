import { useEffect, useState } from "react";
import api from "../services/api";
import { getSessionId } from "../services/interactionService";

function AdaptiveUILayer({ page, field = null, children }) {
  const [adaptation, setAdaptation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdaptation();
    const interval = setInterval(fetchAdaptation, 5000);
    return () => clearInterval(interval);
  }, [page, field]);

  const fetchAdaptation = async () => {
    try {
      setLoading(true);
      const res = await api.post("/ai/adapt", {
        session_id: getSessionId(),
        page: page,
        field: field,
      });
      setAdaptation(res.data);
    } catch (err) {
      console.warn("AI adaptation unavailable:", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!adaptation) {
    return children;
  }

  const {
    ui_action,
    hide_sections = [],
    highlight_fields = [],
    guidance_text,
    layout,
  } = adaptation;

  return (
    <div
      className={`adaptive-layer layout-${layout || "normal"}`}
      data-ui-action={ui_action}
    >
      {guidance_text && (
        <div className="adaptive-guidance-banner">
          <div className="adaptive-guidance-icon">✦</div>
          <div className="adaptive-guidance-content">
            <div className="adaptive-guidance-eyebrow">
              AuraGen AI · Contextual Guidance
            </div>
            <p>{guidance_text}</p>
          </div>
        </div>
      )}

      {highlight_fields.length > 0 && (
        <div className="adaptive-highlight-notice">
          Focus on: <strong>{highlight_fields.join(", ")}</strong>
        </div>
      )}

      <div
        className="adaptive-content"
        data-hide={hide_sections.join(",")}
        data-highlight={highlight_fields.join(",")}
      >
        {children}
      </div>
    </div>
  );
}

export default AdaptiveUILayer;