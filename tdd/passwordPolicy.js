export function isPasswordStrong(password) {
  if (password == null) return false;
  if (password.length < 8) return false;
  return /\d/.test(password);
}

