export default function StatCard({
  title,
  value,
  icon,
  description,
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <p>{title}</p>
        <h2>{value}</h2>

        {description && (
          <small>{description}</small>
        )}
      </div>
    </div>
  );
}