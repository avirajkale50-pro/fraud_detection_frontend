import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { validateEmail, validatePassword, validateName, validateMobile } from '../../utils/validation';

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    });
    const { signup, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error for this field when user types
        if (fieldErrors[name as keyof typeof fieldErrors]) {
            setFieldErrors({ ...fieldErrors, [name]: '' });
        }
    };

    const handleBlur = (field: keyof typeof formData) => {
        let validation;
        switch (field) {
            case 'name':
                validation = validateName(formData.name);
                break;
            case 'email':
                validation = validateEmail(formData.email);
                break;
            case 'mobile':
                validation = validateMobile(formData.mobile);
                break;
            case 'password':
                validation = validatePassword(formData.password);
                break;
        }
        setFieldErrors({ ...fieldErrors, [field]: validation.isValid ? '' : validation.error || '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate all fields
        const nameValidation = validateName(formData.name);
        const emailValidation = validateEmail(formData.email);
        const mobileValidation = validateMobile(formData.mobile);
        const passwordValidation = validatePassword(formData.password);

        const errors = {
            name: nameValidation.isValid ? '' : nameValidation.error || '',
            email: emailValidation.isValid ? '' : emailValidation.error || '',
            mobile: mobileValidation.isValid ? '' : mobileValidation.error || '',
            password: passwordValidation.isValid ? '' : passwordValidation.error || '',
        };

        setFieldErrors(errors);

        // If any validation fails, don't submit
        if (!nameValidation.isValid || !emailValidation.isValid ||
            !mobileValidation.isValid || !passwordValidation.isValid) {
            return;
        }

        try {
            await signup(formData);
            navigate('/login'); // Redirect to login after successful signup
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center gap-2 group mb-6">
                        <div className="bg-black text-white p-1 rounded-md">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-black">PayShield</span>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className={`mt-1 block w-full rounded-lg border ${fieldErrors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-shadow`}
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={() => handleBlur('name')}
                            />
                            {fieldErrors.name && (
                                <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={`mt-1 block w-full rounded-lg border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-shadow`}
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={() => handleBlur('email')}
                            />
                            {fieldErrors.email && (
                                <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <input
                                id="mobile"
                                name="mobile"
                                type="tel"
                                required
                                className={`mt-1 block w-full rounded-lg border ${fieldErrors.mobile ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-shadow`}
                                placeholder="0123456789"
                                value={formData.mobile}
                                onChange={handleChange}
                                onBlur={() => handleBlur('mobile')}
                            />
                            {fieldErrors.mobile && (
                                <p className="mt-1 text-sm text-red-600">{fieldErrors.mobile}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className={`mt-1 block w-full rounded-lg border ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-shadow`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={() => handleBlur('password')}
                            />
                            {fieldErrors.password && (
                                <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                                Must be 8+ characters with uppercase, lowercase, number, and special character
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        >
                            {isLoading ? 'Creating account...' : 'Sign up'}
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-500">Already have an account? </span>
                        <Link to="/login" className="font-medium text-black hover:underline">Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
