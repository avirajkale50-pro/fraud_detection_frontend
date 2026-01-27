import React from 'react';
import { Link } from 'react-router-dom';

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
                                <Link to="/login" className="px-8 py-4 text-sm font-medium border border-gray-300 hover:border-black transition-colors rounded-lg">
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

                    {/* Transaction Log / Right Side */}
                    <div className="relative hidden lg:block h-full min-h-[500px]">
                        <div className="absolute top-0 right-0 p-6 border border-gray-300 rounded-lg shadow-sm bg-white w-full max-w-md ml-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Transactions Overview</h3>
                            </div>

                            {/* Scrolling Transaction Log */}
                            <div className="h-[420px] overflow-hidden relative">
                                <div className="absolute inset-0 animate-scroll">
                                    {[
                                        { id: 'TXN-4521', amount: '₹245.00', status: 'approved', time: '2m ago' },
                                        { id: 'TXN-4522', amount: '₹1,890.50', status: 'flagged', time: '3m ago' },
                                        { id: 'TXN-4523', amount: '₹67.25', status: 'approved', time: '5m ago' },
                                        { id: 'TXN-4524', amount: '₹3,200.00', status: 'flagged', time: '7m ago' },
                                        { id: 'TXN-4525', amount: '₹156.80', status: 'approved', time: '9m ago' },
                                        { id: 'TXN-4526', amount: '₹892.00', status: 'approved', time: '11m ago' },
                                        { id: 'TXN-4527', amount: '₹45.99', status: 'approved', time: '13m ago' },
                                        { id: 'TXN-4528', amount: '₹5,600.00', status: 'flagged', time: '15m ago' },
                                        { id: 'TXN-4529', amount: '₹234.50', status: 'approved', time: '17m ago' },
                                        { id: 'TXN-4530', amount: '₹789.00', status: 'approved', time: '19m ago' },
                                    ].map((txn, i) => (
                                        <div
                                            key={i}
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
