import React, { useState, useRef } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import Modal from '../common/Modal';
import { useBulkUpload } from '../../hooks/useBulkUpload';

import type { BulkUploadResponse } from '../../types';

interface BulkUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadSuccess: (result: BulkUploadResponse) => void;
}

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({ isOpen, onClose, onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadMutation = useBulkUpload();

    const validateFile = (file: File): boolean => {
        setError('');

        // Check file extension - accept CSV and Excel files
        const validExtensions = ['.csv', '.xls', '.xlsx'];
        const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

        if (!hasValidExtension) {
            setError('Please upload a CSV or Excel file (.csv, .xls, .xlsx)');
            return false;
        }

        // Check file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            setError('File size must be less than 10MB');
            return false;
        }

        return true;
    };

    const handleFileSelect = (file: File) => {
        if (validateFile(file)) {
            setSelectedFile(file);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file');
            return;
        }

        try {
            const response = await uploadMutation.mutateAsync(selectedFile);
            onUploadSuccess(response);
            handleClose();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to upload file');
        }
    };

    const handleClose = () => {
        setSelectedFile(null);
        setError('');
        setIsDragging(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Upload Bulk Transactions">
            <div className="space-y-4">
                {/* File Format Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">File Format Requirements</h4>
                    <p className="text-xs text-blue-800 mb-2">Accepted formats: <strong>CSV</strong>, <strong>Excel (.xls, .xlsx)</strong></p>
                    <p className="text-xs text-blue-800 mb-2">Your file must have the following columns:</p>
                    <code className="block bg-white px-3 py-2 rounded text-xs font-mono text-gray-800 border border-blue-100">
                        amount,mode,created_at
                    </code>
                    <p className="text-xs text-blue-700 mt-2">
                        <strong>Example:</strong>
                    </p>
                    <code className="block bg-white px-3 py-2 rounded text-xs font-mono text-gray-800 border border-blue-100 mt-1">
                        1000,UPI,2026-02-03T10:30:00Z<br />
                        500,CARD,2026-02-03T11:00:00Z
                    </code>
                    <p className="text-xs text-blue-700 mt-2">
                        Valid modes: <strong>UPI</strong>, <strong>CARD</strong>, <strong>NETBANKING</strong>
                    </p>
                </div>

                {/* File Upload Area */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv,.xls,.xlsx"
                        onChange={handleFileInputChange}
                        className="hidden"
                    />

                    {selectedFile ? (
                        <div className="flex items-center justify-center gap-3">
                            <FileText className="w-8 h-8 text-green-600" />
                            <div className="text-left">
                                <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                                <p className="text-xs text-gray-500">
                                    {(selectedFile.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedFile(null);
                                }}
                                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-sm font-medium text-gray-900 mb-1">
                                Drop your CSV or Excel file here, or click to browse
                            </p>
                            <p className="text-xs text-gray-500">Supported: .csv, .xls, .xlsx (Max: 10MB)</p>
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        onClick={handleClose}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile || uploadMutation.isPending}
                        className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default BulkUploadModal;
