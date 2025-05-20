export const handlePasswordPower = (password: string) => {
    if (!password) return 0;
    const strength = (
      (password.length >= 8 ? 1 : 0) +
      (/[A-Z]/.test(password) ? 1 : 0) +
      (/\d/.test(password) ? 1 : 0) +
      (/[!@#$%^&*-+=]/.test(password) ? 1 : 0)
    );
    return strength;
  }