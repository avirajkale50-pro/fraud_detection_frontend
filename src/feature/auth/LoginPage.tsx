import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { validateEmail, validatePassword } from '../../utils/validation';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleEmailBlur = () => {
        const validation = validateEmail(email);
        setEmailError(validation.isValid ? '' : validation.error || '');
    };

    const handlePasswordBlur = () => {
        const validation = validatePassword(password);
        setPasswordError(validation.isValid ? '' : validation.error || '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate all fields
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);

        setEmailError(emailValidation.isValid ? '' : emailValidation.error || '');
        setPasswordError(passwordValidation.isValid ? '' : passwordValidation.error || '');

        // If any validation fails, don't submit
        if (!emailValidation.isValid || !passwordValidation.isValid) {
            return;
        }

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center gap-2 group mb-6">
                        <div className="bg-black text-white p-1 rounded-md">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-black">PayShield</span>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
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
                                className={`mt-1 block w-full rounded-lg border ${emailError ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-shadow`}
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (emailError) setEmailError('');
                                }}
                                onBlur={handleEmailBlur}
                            />
                            {emailError && (
                                <p className="mt-1 text-sm text-red-600">{emailError}</p>
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
                                autoComplete="current-password"
                                required
                                className={`mt-1 block w-full rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-shadow`}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (passwordError) setPasswordError('');
                                }}
                                onBlur={handlePasswordBlur}
                            />
                            {passwordError && (
                                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md border border-red-100">{error}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-500">Don't have an account? </span>
                        <Link to="/signup" className="font-medium text-black hover:underline">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
