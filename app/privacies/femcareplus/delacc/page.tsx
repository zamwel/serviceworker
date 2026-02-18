'use client';
import React, { useState } from 'react';
import {
    Heart,
    Lock,
    Mail,
    ArrowRight,
    Trash2,
    ShieldAlert,
    CheckCircle2
} from 'lucide-react';

export default function FemCareDeleteAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // App Theme Colors (Matching main landing page)
    const colors = {
        primary: '#E91E63',
        lightPink: '#F8BBD0',
        background: '#FFF6F8',
        text: '#424242',
        white: '#FFFFFF',
        dark: '#1E1E1E'
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, logic to handle login would go here
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen font-sans selection:bg-pink-200 flex flex-col" style={{ backgroundColor: colors.background, color: colors.text }}>
            {/* Simple Navigation */}
            <nav className="bg-white/90 backdrop-blur-md border-b border-pink-100 py-4 sticky top-0 z-50">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Heart className="w-6 h-6 fill-pink-500" style={{ color: colors.primary }} />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
                            FemCare+
                        </span>
                    </div>
                    <a href="./" className="text-sm font-medium text-gray-500 hover:text-pink-600 transition">Back to Home</a>
                </div>
            </nav>

            <main className="flex-grow container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
                {/* Left Side: Information & Instructions */}
                <div className="lg:w-1/2 max-w-xl text-center lg:text-left">
                    <div className="inline-flex items-center px-3 py-1 mb-6 text-xs font-bold tracking-wider text-pink-600 uppercase bg-pink-100 rounded-full">
                        <ShieldAlert className="w-4 h-4 mr-2" />
                        Account Management
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                        Looking to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">delete your account?</span>
                    </h1>

                    <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-8">
                        <p>
                            We're sorry to see you go. If you've decided to leave FemCare+, we've made the process simple and transparent.
                        </p>

                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 flex items-start gap-4">
                            <div className="bg-pink-50 p-3 rounded-2xl">
                                <Trash2 className="w-6 h-6 text-pink-500" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-gray-900 mb-1">Easy In-App Deletion</h3>
                                <p className="text-sm">On your <strong>Profile page</strong>, simply scroll down to the <strong>"Delete Account"</strong> section.</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 flex items-start gap-4">
                            <div className="bg-green-50 p-3 rounded-2xl">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-gray-900 mb-1">Data Privacy Guaranteed</h3>
                                <p className="text-sm">All your personal data and account details will be <strong>deleted on the go</strong> once you confirm.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
              {/*   <div className="lg:w-1/2 w-full max-w-md">
                    <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                        <!-- Decorative circle -->
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full opacity-50"></div>

                        {!isSubmitted ? (
                            <>
                                <h2 className="text-2xl font-bold mb-2">Identify Yourself</h2>
                                <p className="text-gray-500 mb-8 text-sm">Please log in to verify your identity before proceeding with account management.</p>

                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white focus:outline-none rounded-2xl transition"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white focus:outline-none rounded-2xl transition"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                        style={{ backgroundColor: colors.primary }}
                                    >
                                        Sign In <ArrowRight className="w-5 h-5" />
                                    </button>
                                </form>

                                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Secure Access Only</p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-bold mb-4">Identity Verified</h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Please open the **FemCare+ app** on your mobile device to complete the deletion process in your profile settings as described.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-pink-600 font-bold hover:underline"
                                >
                                    Login with another account
                                </button>
                            </div>
                        )}
                    </div>
                </div> */}
            </main>

            {/* Simple Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6 text-center">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">FemCare+</span>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-md mx-auto">
                        Empowering women with the best health insights and cycle tracking tools. We respect your privacy and your choice.
                    </p>
                    <div className="mt-8 text-xs text-gray-600">
                        &copy; {new Date().getFullYear()} Codeink Technology. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
