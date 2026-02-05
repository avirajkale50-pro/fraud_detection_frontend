import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
    message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">{message}</p>
            </div>
        </div>
    );
};

export default LoadingState;
