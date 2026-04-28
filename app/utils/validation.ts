export const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!hasUpperCase) {
        return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!hasNumber) {
        return { valid: false, message: 'Password must contain at least one number' };
    }
    if (!hasSymbol) {
        return { valid: false, message: 'Password must contain at least one special symbol' };
    }

    return { valid: true, message: '' };
};
