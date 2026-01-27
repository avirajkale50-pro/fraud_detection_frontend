import React from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
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
                                <h3 className="text-3xl font-bold mb-1">72</h3>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Templates for your finances</p>
                            </div>
                            <div>
                                <div className="w-8 h-8 flex items-center justify-center border border-black mb-3 text-black">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <h3 className="text-3xl font-bold mb-1">6,1K</h3>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Use assistant<br /> every hour</p>
                            </div>
                            <div>
                                <div className="w-8 h-8 border border-gray-300 mb-3 block"></div>
                                <h3 className="text-3xl font-bold mb-1">35K+</h3>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Users in the<br /> last month</p>
                            </div>
                        </div>
                    </div>

                    {/* Abstract Graphic / Right Side */}
                    <div className="relative hidden lg:block h-full min-h-[500px]">
                        <div className="absolute top-0 right-0 p-8 border border-gray-100 rounded-lg shadow-sm bg-white w-full max-w-md ml-auto">
                            {/* Mock Graph */}
                            <div className="flex items-end justify-between h-40 gap-2 mb-8">
                                {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                                    <div key={i} className={`w-full rounded-t-sm ${i === 3 ? 'bg-black' : 'bg-gray-100'}`} style={{ height: `${h}%` }}></div>
                                ))}
                            </div>

                            <div className="p-6 bg-accent rounded-sm relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                                        <ShieldCheck className="w-5 h-5 text-black" />
                                    </div>
                                    <h4 className="text-2xl font-bold mb-2">Secure Base</h4>
                                    <p className="text-sm text-gray-800">Bank-grade encryption for every transaction.</p>
                                </div>
                                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
