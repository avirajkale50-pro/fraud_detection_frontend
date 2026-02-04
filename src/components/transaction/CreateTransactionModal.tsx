import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../common/Modal';
import type { TransactionMode, CreateTransactionResponse } from '../../types';
import { Loader2, TrendingUp, CreditCard } from 'lucide-react';
import DecisionBadge from './DecisionBadge';
import RiskBadge from './RiskBadge';
import { useCreateTransaction } from '../../hooks/useCreateTransaction';
import { formatEnumValue } from '../../utils/formatters';

interface CreateTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTransactionCreated?: () => void;
}

interface TransactionFormData {
    amount: string;
    mode: TransactionMode;
}

const CreateTransactionModal: React.FC<CreateTransactionModalProps> = ({ isOpen, onClose, onTransactionCreated }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TransactionFormData>({
        defaultValues: {
            amount: '',
            mode: 'UPI'
        }
    });
    const [result, setResult] = useState<CreateTransactionResponse | null>(null);
    const createTransactionMutation = useCreateTransaction();

    const modes: TransactionMode[] = ['UPI', 'CARD', 'NETBANKING'];

    const onSubmit = async (data: TransactionFormData) => {
        setResult(null);

        createTransactionMutation.mutate(
            {
                amount: parseFloat(data.amount),
                mode: data.mode,
            },
            {
                onSuccess: (response) => {
                    setResult(response);
                    reset();
                },
            }
        );
    };

    const handleClose = () => {
        reset();
        const hadResult = result !== null;
        setResult(null);
        onClose();
        if (hadResult && onTransactionCreated) {
            onTransactionCreated();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Create Transaction">
            {!result ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Amount */}
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <TrendingUp className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="amount"
                                type="number"
                                step="0.01"
                                min="0"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                                placeholder="0.00"
                                {...register('amount', {
                                    required: 'Amount is required',
                                    min: { value: 0.01, message: 'Amount must be greater than 0' }
                                })}
                            />
                        </div>
                    </div>

                    {/* Mode */}
                    <div>
                        <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-1">
                            Payment Mode
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <CreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                id="mode"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 appearance-none bg-white"
                                {...register('mode')}
                            >
                                {modes.map((m) => (
                                    <option key={m} value={m}>
                                        {formatEnumValue(m)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Error Display */}
                    {createTransactionMutation.error && (
                        <div className="text-red-500 text-sm bg-red-50 p-2 rounded-md border border-red-100">
                            {createTransactionMutation.error instanceof Error
                                ? createTransactionMutation.error.message
                                : 'Failed to create transaction. Please try again.'}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={createTransactionMutation.isPending}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                    >
                        {createTransactionMutation.isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            'Create Transaction'
                        )}
                    </button>
                </form>
            ) : (
                <div className="space-y-4">
                    {/* Success Message */}
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Transaction Created</h3>
                        <p className="text-sm text-gray-500">Transaction ID: #{result.id}</p>
                    </div>

                    {/* Result Details */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Decision</span>
                            <DecisionBadge decision={result.decision} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Risk Score</span>
                            <RiskBadge score={result.risk_score} />
                        </div>
                        {result.triggered_factors.length > 0 && (
                            <div>
                                <span className="text-sm font-medium text-gray-700 block mb-2">Triggered Factors</span>
                                <div className="flex flex-wrap gap-2">
                                    {result.triggered_factors.map((factor) => (
                                        <span
                                            key={factor}
                                            className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded border border-orange-200"
                                        >
                                            {formatEnumValue(factor)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleClose}
                        className="w-full px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-medium"
                    >
                        Close
                    </button>
                </div >
            )}
        </Modal >
    );
};

export default CreateTransactionModal;
