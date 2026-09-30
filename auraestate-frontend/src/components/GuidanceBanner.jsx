import { Lightbulb, Sparkles } from "lucide-react";

const GuidanceBanner = ({ load = "low" }) => {
  const content = {
    low: {
      title: "You're doing great",
      message: "Take your time and explore properties at your own pace.",
      icon: <Sparkles size={20} />,
    },

    medium: {
      title: "Need a little guidance?",
      message:
        "You have been exploring for a while. Try using filters to narrow down your property search.",
      icon: <Lightbulb size={20} />,
    },

    high: {
      title: "Let's simplify this",
      message:
        "Your search looks a little complex. We can help you focus on the most relevant properties.",
      icon: <Lightbulb size={20} />,
    },
  };

  const current = content[load] || content.low;

  return (
    <div className={`guidance-banner ${load}`}>
      <div className="guidance-icon">{current.icon}</div>

      <div className="guidance-content">
        <strong>{current.title}</strong>
        <p>{current.message}</p>
      </div>
    </div>
  );
};

export default GuidanceBanner;