import { describe, it, expect } from 'vitest';
import {
    validateEmail,
    validatePassword,
    validateName,
    validateTransactionAmount,
} from '../validation';

describe('validateEmail', () => {
    it('should return valid for correct email formats', () => {
        const validEmails = [
            'test@example.com',
            'user.name@domain.co.uk',
            'user+tag@example.com',
            'user_123@test-domain.com',
        ];

        validEmails.forEach((email) => {
            const result = validateEmail(email);
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });
    });

    it('should return error for empty or whitespace email', () => {
        const result1 = validateEmail('');
        expect(result1.isValid).toBe(false);
        expect(result1.error).toBe('Email is required');

        const result2 = validateEmail('   ');
        expect(result2.isValid).toBe(false);
        expect(result2.error).toBe('Email is required');
    });

    it('should return error for invalid email formats', () => {
        const result1 = validateEmail('notanemail');
        expect(result1.isValid).toBe(false);
        expect(result1.error).toBe('Please enter a valid email address');

        const result2 = validateEmail('@example.com');
        expect(result2.isValid).toBe(false);
        expect(result2.error).toBe('Please enter a valid email address');

        const result3 = validateEmail('user@');
        expect(result3.isValid).toBe(false);
        expect(result3.error).toBe('Please enter a valid email address');

        const result4 = validateEmail('user@domain');
        expect(result4.isValid).toBe(false);
        expect(result4.error).toBe('Please enter a valid email address');
    });
});

describe('validatePassword', () => {
    it('should return valid for strong passwords', () => {
        const validPasswords = [
            'Test@1234',
            'MyP@ssw0rd',
            'Secure!Pass123',
            'C0mpl3x@Password',
        ];

        validPasswords.forEach((password) => {
            const result = validatePassword(password);
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });
    });

    it('should return error for empty or whitespace password', () => {
        const result1 = validatePassword('');
        expect(result1.isValid).toBe(false);
        expect(result1.error).toBe('Password is required');

        const result2 = validatePassword('   ');
        expect(result2.isValid).toBe(false);
        expect(result2.error).toBe('Password is required');
    });

    it('should return error for passwords shorter than minimum length', () => {
        const result = validatePassword('Test@12');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Password must be at least 8 characters');
    });

    it('should return error for passwords without uppercase letters', () => {
        const result = validatePassword('test@1234');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Password must contain uppercase, lowercase, number, and special character');
    });

    it('should return error for passwords without lowercase letters', () => {
        const result = validatePassword('TEST@1234');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Password must contain uppercase, lowercase, number, and special character');
    });

    it('should return error for passwords without numbers', () => {
        const result = validatePassword('Test@Password');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Password must contain uppercase, lowercase, number, and special character');
    });

    it('should return error for passwords without special characters', () => {
        const result = validatePassword('Test1234');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Password must contain uppercase, lowercase, number, and special character');
    });
});

describe('validateName', () => {
    it('should return valid for non-empty names', () => {
        const validNames = [
            'John Doe',
            'Alice',
            'Bob Smith Jr.',
            'María García',
        ];

        validNames.forEach((name) => {
            const result = validateName(name);
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });
    });

    it('should return error for empty or whitespace name', () => {
        const result1 = validateName('');
        expect(result1.isValid).toBe(false);
        expect(result1.error).toBe('Name is required');

        const result2 = validateName('   ');
        expect(result2.isValid).toBe(false);
        expect(result2.error).toBe('Name is required');
    });
});

describe('validateTransactionAmount', () => {
    it('should return valid for positive numbers', () => {
        const validAmounts = [0.01, 100, 1000.50, 999999];

        validAmounts.forEach((amount) => {
            const result = validateTransactionAmount(amount);
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });
    });

    it('should return valid for positive number strings', () => {
        const validAmounts = ['0.01', '100', '1000.50', '999999'];

        validAmounts.forEach((amount) => {
            const result = validateTransactionAmount(amount);
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });
    });

    it('should return error for zero or negative amounts', () => {
        const result1 = validateTransactionAmount(0);
        expect(result1.isValid).toBe(false);
        expect(result1.error).toBe('Amount must be greater than 0');

        const result2 = validateTransactionAmount(-100);
        expect(result2.isValid).toBe(false);
        expect(result2.error).toBe('Amount must be greater than 0');

        const result3 = validateTransactionAmount('-50');
        expect(result3.isValid).toBe(false);
        expect(result3.error).toBe('Amount must be greater than 0');
    });

    it('should return error for invalid number strings', () => {
        const result1 = validateTransactionAmount('not a number');
        expect(result1.isValid).toBe(false);
        expect(result1.error).toBe('Amount must be greater than 0');

        const result2 = validateTransactionAmount('');
        expect(result2.isValid).toBe(false);
        expect(result2.error).toBe('Amount must be greater than 0');
    });

    it('should return error for amounts exceeding maximum', () => {
        const maxAmount = 10 ** 13;
        const result = validateTransactionAmount(maxAmount + 1);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('Amount cannot exceed');
    });

    it('should return valid for amount at maximum boundary', () => {
        const maxAmount = 10 ** 13;
        const result = validateTransactionAmount(maxAmount);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
    });
});
