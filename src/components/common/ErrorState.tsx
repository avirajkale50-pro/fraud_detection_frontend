import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
    error?: Error | unknown;
    onRetry?: () => void;
    title?: string;
    defaultMessage?: string;
}

/**
 * Reusable error state component
 * Displays a centered error message with optional retry button
 */
const ErrorState: React.FC<ErrorStateProps> = ({
    error,
    onRetry,
    title = 'Error',
    defaultMessage = 'Something went wrong'
}) => {
    const errorMessage = error instanceof Error ? error.message : defaultMessage;

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-500 mb-4">{errorMessage}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorState;
