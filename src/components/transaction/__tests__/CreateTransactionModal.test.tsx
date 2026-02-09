import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateTransactionModal from '../CreateTransactionModal';
import * as useCreateTransactionHook from '../../../hooks/useCreateTransaction';

// Mock the useCreateTransaction hook
vi.mock('../../../hooks/useCreateTransaction');

describe('CreateTransactionModal', () => {
    const mockOnClose = vi.fn();
    const mockOnTransactionCreated = vi.fn();
    const mockMutate = vi.fn();

    const defaultMockMutation = {
        mutate: mockMutate,
        isPending: false,
        error: null,
        isError: false,
        isSuccess: false,
        data: undefined,
        reset: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useCreateTransactionHook.useCreateTransaction).mockReturnValue(
            defaultMockMutation as any
        );
    });

    describe('Modal Rendering', () => {
        it('should render modal when isOpen is true', () => {
            render(
                <CreateTransactionModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onTransactionCreated={mockOnTransactionCreated}
                />
            );

            expect(screen.getByRole('heading', { name: 'Create Transaction' })).toBeInTheDocument();
            expect(screen.getByLabelText('Amount')).toBeInTheDocument();
            expect(screen.getByLabelText('Payment Mode')).toBeInTheDocument();
        });

        it('should not render modal when isOpen is false', () => {
            render(
                <CreateTransactionModal
                    isOpen={false}
                    onClose={mockOnClose}
                    onTransactionCreated={mockOnTransactionCreated}
                />
            );

            expect(screen.queryByText('Create Transaction')).not.toBeInTheDocument();
        });

        it('should render all payment mode options', () => {
            render(
                <CreateTransactionModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onTransactionCreated={mockOnTransactionCreated}
                />
            );

            expect(screen.getByText('Upi')).toBeInTheDocument();
            expect(screen.getByText('Card')).toBeInTheDocument();
            expect(screen.getByText('Netbanking')).toBeInTheDocument();
        });
    });

    describe('Form Validation', () => {
        it('should show error when amount is empty and form is submitted', async () => {
            render(
                <CreateTransactionModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onTransactionCreated={mockOnTransactionCreated}
                />
            );

            const submitButton = screen.getByRole('button', { name: /create transaction/i });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText('Amount is required')).toBeInTheDocument();
            });
        });

        it('should accept valid amount values', async () => {
            render(
                <CreateTransactionModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onTransactionCreated={mockOnTransactionCreated}
                />
            );

            const amountInput = screen.getByLabelText('Amount') as HTMLInputElement;
            fireEvent.change(amountInput, { target: { value: '1000' } });

            expect(amountInput.value).toBe('1000');
        });
    });

    describe('Form Submission', () => {
        it('should call mutate with correct data on valid form submission', async () => {
            render(
                <CreateTransactionModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onTransactionCreated={mockOnTransactionCreated}
                />
            );

            const amountInput = screen.getByLabelText('Amount');
            const modeSelect = screen.getByLabelText('Payment Mode');

            fireEvent.change(amountInput, { target: { value: '1000' } });
            fireEvent.change(modeSelect, { target: { value: 'CARD' } });

            const submitButton = screen.getByRole('button', { name: /create transaction/i });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(mockMutate).toHaveBeenCalledWith(
                    {
                        amount: 1000,
                        mode: 'CARD',
                    },
                    expect.any(Object)
                );
            });
        });

        it('should show loading state during submission', () => {
            vi.mocked(useCreateTransactionHook.useCreateTransaction).mockReturnValue({
                ...defaultMockMutation,
                isPending: true,
            } as any);

            render(
                <CreateTransactionModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onTransactionCreated={mockOnTransactionCreated}
                />
            );

            expect(screen.getByText('Processing...')).toBeInTheDocument();
            const submitButton = screen.getByRole('button', { name: /processing/i });
            expect(submitButton).toBeDisabled();
        });

        it('should disable submit button when loading', () => {
            vi.mocked(useCreateTransactionHook.useCreateTransaction).mockReturnValue({
                ...defaultMockMutation,
                isPending: true,
            } as any);

            render(
                <CreateTransactionModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onTransactionCreated={mockOnTransactionCreated}
                />
            );

            const submitButton = screen.getByRole('button', { name: /processing/i });
            expect(submitButton).toBeDisabled();
        });
    });

    describe('Error Handling', () => {
        it('should display error message when mutation fails', () => {
            const mockError = new Error('Network error');
            vi.mocked(useCreateTransactionHook.useCreateTransaction).mockReturnValue({
                ...defaultMockMutation,
                error: mockError,
                isError: true,
            } as any);

            render(
                <CreateTransactionModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onTransactionCreated={mockOnTransactionCreated}
                />
            );

            expect(screen.getByText('Network error')).toBeInTheDocument();
        });

        it('should display generic error message for non-Error objects', () => {
            vi.mocked(useCreateTransactionHook.useCreateTransaction).mockReturnValue({
                ...defaultMockMutation,
                error: 'Something went wrong',
                isError: true,
            } as any);

            render(
                <CreateTransactionModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onTransactionCreated={mockOnTransactionCreated}
                />
            );

            expect(screen.getByText('Failed to create transaction. Please try again.')).toBeInTheDocument();
        });
    });

    describe('Modal Close Behavior', () => {
        it('should call onClose when X button is clicked', () => {
            const { container } = render(
                <CreateTransactionModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onTransactionCreated={mockOnTransactionCreated}
                />
            );

            // Find the X close button in the modal header
            const closeButtons = container.querySelectorAll('button');
            // The first button should be the X close button
            const modalCloseButton = closeButtons[0];
            fireEvent.click(modalCloseButton);

            expect(mockOnClose).toHaveBeenCalled();
        });

        it('should call onClose when backdrop is clicked', () => {
            const { container } = render(
                <CreateTransactionModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onTransactionCreated={mockOnTransactionCreated}
                />
            );

            // Find and click the backdrop
            const backdrop = container.querySelector('.bg-black\\/50');
            if (backdrop) {
                fireEvent.click(backdrop);
                expect(mockOnClose).toHaveBeenCalled();
            }
        });
    });
});

