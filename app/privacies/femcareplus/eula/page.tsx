'use client';
import React from 'react';
import { Heart, ShieldCheck, FileText, Ban, AlertTriangle } from 'lucide-react';

export default function FemCareEULA() {
    const currentYear = new Date().getFullYear();
    const colors = {
        primary: '#E91E63',
        background: '#FFF6F8',
        text: '#424242',
    };

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: colors.background, color: colors.text }}>
            <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-pink-100 bg-white/90">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <Heart className="w-6 h-6 fill-pink-500" style={{ color: colors.primary }} />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
                            FemCare+
                        </span>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-16 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-pink-600 uppercase bg-pink-100 rounded-full">
                        Legal Agreement
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        End User License <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                            Agreement
                        </span>
                    </h1>
                    <p className="text-gray-500">Last Updated: February 23, 2026</p>
                </div>

                <div className="space-y-10">
                    <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-pink-50">
                        <div className="flex items-center mb-6">
                            <ShieldCheck className="w-8 h-8 mr-4 text-pink-500" />
                            <h2 className="text-2xl font-bold">1. License Grant</h2>
                        </div>
                        <p className="leading-relaxed text-gray-600">
                            FemCare+ ("Licensor") grants you a personal, non-exclusive, non-transferable, limited license to use the FemCare+ application solely for your personal, non-commercial purposes on any compatible mobile device that you own or control.
                        </p>
                    </section>

                    <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-pink-50">
                        <div className="flex items-center mb-6">
                            <Ban className="w-8 h-8 mr-4 text-pink-500" />
                            <h2 className="text-2xl font-bold">2. Restrictive Covenants</h2>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-600 font-bold text-xs">1</div>
                                <p className="text-gray-600">You shall not decompile, reverse engineer, or attempt to derive the source code of the app.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-600 font-bold text-xs">2</div>
                                <p className="text-gray-600">You shall not modify, adapt, improve, or create any derivative work from the Application.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-600 font-bold text-xs">3</div>
                                <p className="text-gray-600">You shall not use the Application for any revenue-generating endeavor or commercial enterprise.</p>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-gradient-to-r from-pink-500 to-purple-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center mb-6">
                                <AlertTriangle className="w-8 h-8 mr-4 text-white" />
                                <h2 className="text-2xl font-bold">3. No Warranty</h2>
                            </div>
                            <p className="opacity-90 leading-relaxed font-medium">
                                THE APPLICATION IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. LICENSOR DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                            </p>
                        </div>
                        {/* Decorative circle */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    </section>

                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-pink-50 text-center">
                        <h2 className="text-2xl font-bold mb-4">4. Compliance with Laws</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            You must comply with all applicable third-party terms of agreement when using this Application (e.g., Apple App Store or Google Play Store Terms).
                        </p>
                    </section>
                </div>
            </main>

            <footer className="bg-[#1E1E1E] text-white py-12">
                <div className="container mx-auto px-6 text-center">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">FemCare+</span>
                    <p className="text-gray-500 mt-4 text-sm">&copy; {currentYear} Codeink Technology. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
