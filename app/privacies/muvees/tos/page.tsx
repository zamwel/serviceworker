import React from 'react';

const TermsOfService = () => {
    const lastUpdated = "February 23, 2026";
    const appName = "Muvees";
    const contactEmail = "support@moviewalls.app";

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-red-600/30">
            {/* Dynamic Background Gradient */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-32">
                {/* Header */}
                <header className="mb-20 text-center">
                    <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 rounded-full border border-red-500/20">
                        Legal Document
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        Terms of Service
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Last updated: <span className="text-white font-medium">{lastUpdated}</span>
                    </p>
                </header>

                {/* Content Section */}
                <main className="space-y-16 text-gray-300 leading-relaxed">

                    <section className="backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-red-500/30 transition-colors duration-500 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center mr-4 text-sm">01</span>
                            Agreement to Terms
                        </h2>
                        <p className="mb-4">
                            By accessing or using <strong>{appName}</strong>, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
                            Use of the Service
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-semibold mb-3 text-red-400">Eligibility</h3>
                                <p className="text-sm">You must be at least 13 years of age to use this Service. By using the Service, you represent and warrant that you meet all eligibility requirements.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-semibold mb-3 text-red-400">User Accounts</h3>
                                <p className="text-sm">When you create an account, you must provide accurate information. You are responsible for safeguarding your password and for any activities under your account.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-semibold mb-3 text-red-400">Acceptable Use</h3>
                                <p className="text-sm">You agree not to use the Service for any unlawful purposes or to conduct any activity that would constitute a civil or criminal offense or violate any law.</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gradient-to-br from-red-600/10 to-transparent p-10 rounded-[40px] border border-red-500/10">
                        <h2 className="text-2xl font-bold mb-6 text-white">Intellectual Property</h2>
                        <p className="mb-4">
                            The Service and its original content, features, and functionality are and will remain the exclusive property of {appName} and its licensors.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
                            Termination
                        </h2>
                        <p className="mb-6">
                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </section>

                    <section className="border-t border-white/10 pt-16 mt-16 text-center">
                        <h2 className="text-3xl font-bold mb-6 text-white">Contact Us</h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            If you have any questions about these Terms, please contact us.
                        </p>
                        <a
                            href={`mailto:${contactEmail}`}
                            className="inline-flex items-center justify-center px-10 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.3)]"
                        >
                            Contact Support
                        </a>
                    </section>

                </main>

                <footer className="mt-32 pt-10 border-t border-white/5 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} {appName}. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default TermsOfService;
