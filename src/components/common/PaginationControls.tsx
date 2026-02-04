import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
    currentPage: number;
    pageSize: number;
    totalItems?: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    hasMore?: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    pageSize,
    totalItems,
    onPageChange,
    onPageSizeChange,
    hasMore = false,
}) => {
    const pageSizeOptions = [10, 25, 50, 100];

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Show</span>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        onPageSizeChange(Number(e.target.value));
                        onPageChange(1); // Reset to first page when changing page size
                    }}
                    className="rounded-md border-gray-300 py-1 pl-3 pr-8 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                >
                    {pageSizeOptions.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
                <span className="text-sm text-gray-700">per page</span>
            </div>

            {/* Page Info and Navigation */}
            <div className="flex items-center gap-4">
                {totalItems !== undefined && (
                    <span className="text-sm text-gray-700">
                        Showing {(currentPage - 1) * pageSize + 1} to{' '}
                        {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
                    </span>
                )}

                <div className="flex gap-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={!hasMore}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginationControls;
