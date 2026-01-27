import { EMAIL_REGEX, PASSWORD_REGEX, MOBILE_REGEX, VALIDATION_MESSAGES, PASSWORD_MIN_LENGTH } from '../constant/validation';

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
    if (!email || email.trim() === '') {
        return { isValid: false, error: VALIDATION_MESSAGES.EMAIL_REQUIRED };
    }

    if (!EMAIL_REGEX.test(email)) {
        return { isValid: false, error: VALIDATION_MESSAGES.EMAIL_INVALID };
    }

    return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
    if (!password || password.trim() === '') {
        return { isValid: false, error: VALIDATION_MESSAGES.PASSWORD_REQUIRED };
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
        return { isValid: false, error: VALIDATION_MESSAGES.PASSWORD_TOO_SHORT };
    }

    if (!PASSWORD_REGEX.test(password)) {
        return { isValid: false, error: VALIDATION_MESSAGES.PASSWORD_WEAK };
    }

    return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
    if (!name || name.trim() === '') {
        return { isValid: false, error: VALIDATION_MESSAGES.NAME_REQUIRED };
    }

    return { isValid: true };
};

export const validateMobile = (mobile: string): ValidationResult => {
    if (!mobile || mobile.trim() === '') {
        return { isValid: false, error: VALIDATION_MESSAGES.MOBILE_REQUIRED };
    }

    if (!MOBILE_REGEX.test(mobile)) {
        return { isValid: false, error: VALIDATION_MESSAGES.MOBILE_INVALID };
    }

    return { isValid: true };
};
