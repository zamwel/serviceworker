'use client';
import React from 'react';
import { Shield, Lock, Heart, Mail, Phone, Globe } from 'lucide-react';

export default function FemCareToS() {
    const currentYear = new Date().getFullYear();
    const colors = {
        primary: '#E91E63',
        background: '#FFF6F8',
        text: '#424242',
        white: '#FFFFFF',
    };

    const contact = {
        phone: '+233 24 084 1448',
        email: 'admin@codeinktechnologies.com',
        website: 'codeinktechnologies.com',
    };

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: colors.background, color: colors.text }}>
            <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-pink-100 bg-white/90">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
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
                        Terms of Service
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Our Agreement <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                            with You
                        </span>
                    </h1>
                    <p className="text-gray-500">Last Updated: February 23, 2026</p>
                </div>

                <div className="space-y-12 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-pink-50">
                    <section>
                        <div className="flex items-center mb-6">
                            <Shield className="w-8 h-8 mr-4 text-pink-500" />
                            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                        </div>
                        <p className="leading-relaxed text-gray-600">
                            By downloading, installing, or using FemCare+, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application. You must be at least 12 years old to use this service.
                        </p>
                    </section>

                    <section className="bg-red-50 p-6 rounded-2xl border border-red-100">
                        <div className="flex items-center mb-4">
                            <h2 className="text-xl font-bold text-red-800">2. Medical Disclaimer</h2>
                        </div>
                        <p className="text-red-700 font-medium">
                            FemCare+ is NOT a medical device. The information, including but not limited to, text, graphics, images and other material contained in this app are for informational purposes only. No material on this app is intended to be a substitute for professional medical advice, diagnosis or treatment.
                        </p>
                        <p className="mt-4 text-red-700">
                            Never rely on cycle predictions as a form of contraception. Always seek the advice of your physician.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center mb-6">
                            <Lock className="w-8 h-8 mr-4 text-pink-500" />
                            <h2 className="text-2xl font-bold">3. User Accounts</h2>
                        </div>
                        <p className="leading-relaxed text-gray-600 mb-4">
                            To access certain features, you may be required to register for an account. You are responsible for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Maintaining the confidentiality of your account and password.</li>
                            <li>Restricting access to your device.</li>
                            <li>Accepting responsibility for all activities that occur under your account.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">4. Prohibited Uses</h2>
                        <p className="leading-relaxed text-gray-600 mb-4">
                            You may use the Application only for lawful purposes. You agree not to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Use the Application in any way that violates any applicable local, national or international law.</li>
                            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Application.</li>
                            <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Application.</li>
                        </ul>
                    </section>

                    <section className="pt-8 border-t border-gray-100">
                        <h2 className="text-2xl font-bold mb-6">5. Contact Information</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-xl">
                                <Mail className="text-pink-600" />
                                <span className="font-medium">{contact.email}</span>
                            </div>
                            <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-xl">
                                <Phone className="text-pink-600" />
                                <span className="font-medium">{contact.phone}</span>
                            </div>
                        </div>
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
