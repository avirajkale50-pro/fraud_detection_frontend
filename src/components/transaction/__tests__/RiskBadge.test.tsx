import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RiskBadge from '../RiskBadge';

describe('RiskBadge', () => {
    describe('Risk Level Classification', () => {
        it('should display "Low Risk" for scores <= 40', () => {
            const scores = [0, 20, 40];

            scores.forEach((score) => {
                const { unmount } = render(<RiskBadge score={score} />);
                expect(screen.getByText('Low Risk')).toBeInTheDocument();
                expect(screen.getByText(score.toString())).toBeInTheDocument();
                unmount();
            });
        });

        it('should display "Medium Risk" for scores between 41 and 70', () => {
            const scores = [41, 50, 70];

            scores.forEach((score) => {
                const { unmount } = render(<RiskBadge score={score} />);
                expect(screen.getByText('Medium Risk')).toBeInTheDocument();
                expect(screen.getByText(score.toString())).toBeInTheDocument();
                unmount();
            });
        });

        it('should display "High Risk" for scores > 70', () => {
            const scores = [71, 85, 100];

            scores.forEach((score) => {
                const { unmount } = render(<RiskBadge score={score} />);
                expect(screen.getByText('High Risk')).toBeInTheDocument();
                expect(screen.getByText(score.toString())).toBeInTheDocument();
                unmount();
            });
        });
    });

    describe('Visual Rendering', () => {
        it('should render with green styling for low risk', () => {
            const { container } = render(<RiskBadge score={30} />);
            const badge = container.querySelector('.bg-green-100');
            expect(badge).toBeInTheDocument();
        });

        it('should render with yellow styling for medium risk', () => {
            const { container } = render(<RiskBadge score={60} />);
            const badge = container.querySelector('.bg-yellow-100');
            expect(badge).toBeInTheDocument();
        });

        it('should render with red styling for high risk', () => {
            const { container } = render(<RiskBadge score={85} />);
            const badge = container.querySelector('.bg-red-100');
            expect(badge).toBeInTheDocument();
        });

        it('should render Shield icon', () => {
            const { container } = render(<RiskBadge score={50} />);
            const icon = container.querySelector('svg');
            expect(icon).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('should handle boundary value at 40 (low risk)', () => {
            render(<RiskBadge score={40} />);
            expect(screen.getByText('Low Risk')).toBeInTheDocument();
        });

        it('should handle boundary value at 41 (medium risk)', () => {
            render(<RiskBadge score={41} />);
            expect(screen.getByText('Medium Risk')).toBeInTheDocument();
        });

        it('should handle boundary value at 70 (medium risk)', () => {
            render(<RiskBadge score={70} />);
            expect(screen.getByText('Medium Risk')).toBeInTheDocument();
        });

        it('should handle boundary value at 71 (high risk)', () => {
            render(<RiskBadge score={71} />);
            expect(screen.getByText('High Risk')).toBeInTheDocument();
        });

        it('should handle score of 0', () => {
            render(<RiskBadge score={0} />);
            expect(screen.getByText('Low Risk')).toBeInTheDocument();
            expect(screen.getByText('0')).toBeInTheDocument();
        });

        it('should handle score of 100', () => {
            render(<RiskBadge score={100} />);
            expect(screen.getByText('High Risk')).toBeInTheDocument();
            expect(screen.getByText('100')).toBeInTheDocument();
        });
    });
});
