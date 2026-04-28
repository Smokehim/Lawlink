/**
 * Validates that a password contains:
 * - At least one uppercase letter (capture letter)
 * - At least one number
 * - At least one special symbol
 */
export const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough) return { valid: false, message: "Password must be at least 8 characters long" };
    if (!hasUpperCase) return { valid: false, message: "Password must contain at least one uppercase letter" };
    if (!hasNumber) return { valid: false, message: "Password must contain at least one number" };
    if (!hasSymbol) return { valid: false, message: "Password must contain at least one special symbol" };

    return { valid: true };
};
