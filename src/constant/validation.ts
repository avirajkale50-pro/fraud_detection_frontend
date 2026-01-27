// Validation regex patterns
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password requirements
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Validation messages
export const VALIDATION_MESSAGES = {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_TOO_SHORT: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    PASSWORD_WEAK: 'Password must contain uppercase, lowercase, number, and special character',
    NAME_REQUIRED: 'Name is required',
    MOBILE_REQUIRED: 'Mobile number is required',
    MOBILE_INVALID: 'Please enter a valid mobile number',
} as const;

// Mobile validation
export const MOBILE_REGEX = /^[0-9]{10}$/;
