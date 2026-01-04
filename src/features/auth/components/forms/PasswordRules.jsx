function Rule({ valid, children }) {
  return (
    <li
      className={`flex items-center gap-2 text-sm
        ${valid ? "text-green-400" : "text-gray-400"}
      `}
    >
      <span>{valid ? "✓" : "•"}</span>
      {children}
    </li>
  );
}

export default function PasswordRules({ rules }) {
  return (
    <ul className="mt-2 space-y-1">
      <Rule valid={rules.length}>At least 8 characters</Rule>
      <Rule valid={rules.uppercase}>One uppercase letter</Rule>
      <Rule valid={rules.number}>One number</Rule>
      {"match" in rules && (
        <Rule valid={rules.match}>Passwords match</Rule>
      )}
    </ul>
  );
}
