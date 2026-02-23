'use client';
import React, { useState } from 'react';

const LegalPolicies = () => {
    const lastUpdated = "February 23, 2026";
    const appName = "Muvees";
    const contactEmail = "support@moviewalls.app";
    const [activeTab, setActiveTab] = useState<'privacy' | 'tos' | 'eula'>('privacy');

    const tabs = [
        { id: 'privacy', label: 'Privacy Policy' },
        { id: 'tos', label: 'Terms of Service' },
        { id: 'eula', label: 'EULA' }
    ] as const;

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-red-600/30 pb-20">
            {/* Dynamic Background Gradient */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 pt-20 lg:pt-32">
                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 rounded-full border border-red-500/20">
                        Legal Documents
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        {tabs.find(t => t.id === activeTab)?.label}
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Last updated: <span className="text-white font-medium">{lastUpdated}</span>
                    </p>
                </header>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex p-1 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-[14px] text-sm font-bold transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <main className="space-y-16 text-gray-300 leading-relaxed transition-all duration-500">

                    {activeTab === 'privacy' && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section className="backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-red-500/30 transition-colors duration-500 shadow-2xl">
                                <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                                    <span className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center mr-4 text-sm font-bold">01</span>
                                    Introduction
                                </h2>
                                <p>
                                    Welcome to <strong>{appName}</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our application and tell you about your privacy rights and how the law protects you.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
                                    Information We Collect
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { title: "Personal Information", desc: "This may include your email address, name, or profile information if you choose to sign up for an account." },
                                        { title: "Usage Data", desc: "Information about how you use our app, such as search history, favorites, and interaction with various features." },
                                        { title: "Device Information", desc: "Technical data including IP address, device type, operating system version, and unique device identifiers." },
                                        { title: "Cookies & Tracking", desc: "We use cookies and similar tracking technologies to track activity on our service and hold certain information." }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                            <h3 className="text-lg font-semibold mb-3 text-red-400">{item.title}</h3>
                                            <p className="text-sm">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-gradient-to-br from-red-600/10 to-transparent p-10 rounded-[40px] border border-red-500/10">
                                <h2 className="text-2xl font-bold mb-6 text-white">How We Use Your Information</h2>
                                <ul className="grid gap-4 list-none">
                                    {[
                                        "To provide and maintain our Service",
                                        "To notify you about changes to our Service",
                                        "To gather analysis or valuable information so that we can improve our Service",
                                        "To monitor the usage of our Service",
                                        "To detect, prevent and address technical issues"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-red-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
                                    Third-Party Services
                                </h2>
                                <p className="mb-6">
                                    We may employ third-party companies and individuals to facilitate our Service. These third parties have access to your Personal Data only to perform these tasks on our behalf.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {["Firebase", "Google AdMob", "TMDB API", "In-App Purchases"].map((service) => (
                                        <span key={service} className="px-6 py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-full border border-white/10 text-sm font-medium">
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'tos' && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section className="backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-red-500/30 transition-colors duration-500 shadow-2xl">
                                <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                                    <span className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center mr-4 text-sm font-bold">01</span>
                                    Agreement to Terms
                                </h2>
                                <p>
                                    By accessing or using <strong>{appName}</strong>, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
                                    Use of the Service
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        { title: "Eligibility", desc: "You must be at least 13 years of age to use this Service. By using the Service, you represent and warrant that you meet all eligibility requirements." },
                                        { title: "User Accounts", desc: "When you create an account, you must provide accurate information. You are responsible for safeguarding your password and for any activities under your account." },
                                        { title: "Acceptable Use", desc: "You agree not to use the Service for any unlawful purposes or to conduct any activity that would constitute a civil or criminal offense or violate any law." }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                            <h3 className="text-lg font-semibold mb-3 text-red-400">{item.title}</h3>
                                            <p className="text-sm">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-gradient-to-br from-red-600/10 to-transparent p-10 rounded-[40px] border border-red-500/10">
                                <h2 className="text-2xl font-bold mb-6 text-white">Intellectual Property</h2>
                                <p>
                                    The Service and its original content, features, and functionality are and will remain the exclusive property of {appName} and its licensors.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
                                    Termination
                                </h2>
                                <p>
                                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                                </p>
                            </section>
                        </div>
                    )}

                    {activeTab === 'eula' && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section className="backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-red-500/30 transition-colors duration-500 shadow-2xl">
                                <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                                    <span className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center mr-4 text-sm font-bold">01</span>
                                    License Grant
                                </h2>
                                <p>
                                    <strong>{appName}</strong> grants you a revocable, non-exclusive, non-transferable, limited license to download, install and use the Application strictly in accordance with the terms of this Agreement.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
                                    Restrictions
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { title: "No Modification", desc: "You agree not to license, sell, rent, lease, assign, distribute, host, outsource, disclose or otherwise commercially exploit the Application." },
                                        { title: "Reverse Engineering", desc: "You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the Application." }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                            <h3 className="text-lg font-semibold mb-3 text-red-400">{item.title}</h3>
                                            <p className="text-sm">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-gradient-to-br from-red-600/10 to-transparent p-10 rounded-[40px] border border-red-500/10">
                                <h2 className="text-2xl font-bold mb-6 text-white">Disclaimer of Warranties</h2>
                                <p className="text-sm italic">
                                    THE APPLICATION IS PROVIDED TO YOU "AS IS" AND "AS AVAILABLE" AND WITH ALL FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY KIND.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
                                    Limitation of Liability
                                </h2>
                                <p>
                                    To the maximum extent permitted by applicable law, in no event shall {appName} or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever.
                                </p>
                            </section>
                        </div>
                    )}

                    <section className="border-t border-white/10 pt-16 mt-16 text-center">
                        <h2 className="text-3xl font-bold mb-6 text-white">Contact Us</h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            If you have any questions about our legal policies, please reach out to our legal team.
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

export default LegalPolicies;
