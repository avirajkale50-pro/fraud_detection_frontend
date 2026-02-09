import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { validateEmail, validatePassword, validateName } from '../../utils/validation';
import { APP_CONFIG } from '../../constants/app';
import { ROUTES } from '../../constants/routes';

interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

const SignupPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<SignupFormData>({
        mode: 'onBlur',
    });
    const { signup, isLoading } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: SignupFormData) => {
        try {
            await signup(data);
            navigate(ROUTES.LOGIN);
        } catch (err) {
            setError('root', { message: 'Signup failed. Please try again.' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                <Link
                    to={ROUTES.HOME}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to home
                </Link>
                <div className="text-center">
                    <Link to={ROUTES.HOME} className="inline-flex items-center gap-2 group mb-6">
                        <div className="bg-black text-white p-1 rounded-md">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-black">{APP_CONFIG.NAME}</span>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className={`mt-1 block w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-shadow`}
                                placeholder="John Doe"
                                {...register('name', {
                                    required: 'Name is required',
                                    validate: (value) => {
                                        const validation = validateName(value);
                                        return validation.isValid || validation.error || 'Invalid name';
                                    }
                                })}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                className={`mt-1 block w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-shadow`}
                                placeholder="name@example.com"
                                {...register('email', {
                                    required: 'Email is required',
                                    validate: (value) => {
                                        const validation = validateEmail(value);
                                        return validation.isValid || validation.error || 'Invalid email';
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    className={`mt-1 block w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-shadow`}
                                    placeholder="••••••••"
                                    {...register('password', {
                                        required: 'Password is required',
                                        validate: (value) => {
                                            const validation = validatePassword(value);
                                            return validation.isValid || validation.error || 'Invalid password';
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                                Must be 8+ characters with uppercase, lowercase, number, and special character
                            </p>
                        </div>
                    </div>

                    {errors.root && (
                        <div className="text-red-500 text-sm">{errors.root.message}</div>
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
                        <Link to={ROUTES.LOGIN} className="font-medium text-black hover:underline">Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
