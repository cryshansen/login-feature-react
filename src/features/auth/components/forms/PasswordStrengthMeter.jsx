export default function PasswordStrengthMeter({ strength }) {
  const colors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-emerald-500",
  ];

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded
              ${i < strength.score ? colors[strength.score] : "bg-gray-200"}
            `}
          />
        ))}
      </div>

      <p className="mt-1 text-xs text-gray-400">
        Strength: <span className="font-medium">{strength.label}</span>
      </p>
    </div>
  );
}
