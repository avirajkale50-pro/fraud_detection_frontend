import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { MOCK_TRANSACTIONS } from '../../constants/app';

const HomePage: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h1 className="text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] mb-8 text-black">
                            Validate Transactions in Seconds with Confidence
                        </h1>

                        <div className="flex items-center gap-6 mb-16">
                            <div className="flex items-center gap-3">
                                <Link to={ROUTES.LOGIN} className="px-8 py-4 text-sm font-medium border border-gray-300 hover:border-black transition-colors rounded-lg">
                                    Try it!
                                </Link>
                            </div>
                            <p className="text-gray-500 text-sm max-w-xs leading-relaxed border-l border-gray-300 pl-4">
                                This application verifies whether a transaction is valid by performing quick checks and providing instant results.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-3xl font-bold mb-1"> Level 1</h3>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Evaluates transaction risk level</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-1">Level 2</h3>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Analyzes time-based transaction patterns</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-1">Level 3</h3>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Makes final intelligent validation</p>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Log - animation*/}
                    <div className="relative hidden lg:block h-full min-h-[500px]">
                        <div className="absolute top-0 right-0 p-6 border border-gray-300 rounded-lg shadow-sm bg-white w-full max-w-md ml-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Transactions Overview</h3>
                            </div>

                            {/* Scrolling Transaction Log */}
                            <div className="h-[420px] overflow-hidden relative">
                                <div className="absolute inset-0 animate-scroll">
                                    {MOCK_TRANSACTIONS.map((txn) => (
                                        <div
                                            key={txn.id}
                                            className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-mono text-gray-500">{txn.id}</span>
                                                <span className="text-xs text-gray-400">{txn.time}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-gray-900">{txn.amount}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${txn.status === 'approved'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {txn.status === 'approved' ? '✓ Approved' : '⚠ Flagged'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
