export function getPasswordRules(password, confirm) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    match: confirm.length === 0 ? null : password === confirm
  };
}

export function isPasswordValid(rules) {
  return Object.values(rules).every(Boolean);
}
