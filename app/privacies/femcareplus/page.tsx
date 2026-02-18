
'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import {
    Shield,
    Smartphone,
    Heart,
    Lock,
    Mail,
    Phone,
    Globe,
    Calendar,
    Baby,
    Sparkles,
    Users,
    MessageCircle,
    ShoppingBag,
    Utensils,
    Dumbbell,
    Film,
    Gift,
    Menu,
    X
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';

export default function FemCareLanding() {
    const currentYear = new Date().getFullYear();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // App Theme Colors
    const colors = {
        primary: '#E91E63', // Primary Pink
        lightPink: '#F8BBD0',
        background: '#FFF6F8', // Splash Light
        text: '#424242',
        white: '#FFFFFF',
        dark: '#1E1E1E'
    };

    // Contact Info
    const contact = {
        phone: '+233 24 084 1448',
        email: 'admin@codeinktechnologies.com',
        website: 'codeinktechnologies.com',
        address: 'Accra, Ghana'
    };

    // Social Links
    const socials = {
        instagram: 'https://instagram.com/femcareplus',
        tiktok: 'https://tiktok.com/@femcareplus',
        facebook: 'https://facebook.com/femcareplus',
    };

    // Store URLs
    const storeUrls = {
        playStore: 'https://play.google.com/store/apps/details?id=com.codeink.technologes.sanitarypad',
        appStore: '#', // Pending iOS release
        webApp: 'https://serviceworker-two.vercel.app/femcareplus'
    };

    const featureList = [
        {
            icon: Calendar,
            title: 'Smart Cycle Tracking',
            description: 'Accurate predictions for periods, ovulation, and fertility windows tailored to your unique body rhythm.'
        },
        {
            icon: Baby,
            title: 'Pregnancy & Partner Mode',
            description: 'Week-by-week insights, baby growth tracking, and a dedicated dashboard for partners to stay connected.'
        },
        {
            icon: Sparkles,
            title: 'Skincare & Wellness',
            description: 'Track your skin health, get routine recommendations, and log hydration, sleep, and nutrition.'
        },
        {
            icon: Users,
            title: 'Community Groups',
            description: 'Join safe, supportive spaces to discuss health, relationships, and wellness with other women.'
        },
        {
            icon: MessageCircle,
            title: 'AI Health Assistant',
            description: 'Get instant answers to your health questions from our intelligent, privacy-focused AI companion.'
        },
        {
            icon: Utensils,
            title: 'Nutrition Plans',
            description: 'Personalized meal plans and nutrition guides to support your hormonal health and well-being.'
        },
        {
            icon: Dumbbell,
            title: 'Workouts',
            description: 'Curated fitness routines and yoga sessions designed for every phase of your cycle.'
        },
        {
            icon: Film,
            title: 'Movie & Entertainment',
            description: 'Relax and unwind with a curated selection of movies and entertainment content.'
        },
        {
            icon: Gift,
            title: 'Free Daily Credits',
            description: 'Earn daily credits to unlock premium features and exclusive content for free.'
        }
    ];

    return (
        <div className="min-h-screen font-sans selection:bg-pink-200" style={{ backgroundColor: colors.background, color: colors.text }}>
            <Head>
                <title>FemCare+ - Evolving feminine health and wellness</title>
                <meta name="description" content="A smart FemCare, Menstrual, Skincare, Pregnancy and Wellness assistant for women." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-pink-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Heart className="w-8 h-8 fill-pink-500" style={{ color: colors.primary }} />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
                                FemCare+
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-pink-600 font-medium transition">Features</a>
                            <a href="#legal" className="text-gray-600 hover:text-pink-600 font-medium transition">Legal</a>
                            <a href="#contact" className="text-gray-600 hover:text-pink-600 font-medium transition">Contact</a>
                            <a
                                href={storeUrls.playStore}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-2.5 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
                                style={{ backgroundColor: colors.primary }}
                            >
                                Download App
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
                                {isMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden pt-4 pb-2 space-y-3">
                            <a href="#features" className="block px-4 py-2 hover:bg-pink-50 rounded-lg">Features</a>
                            <a href="#legal" className="block px-4 py-2 hover:bg-pink-50 rounded-lg">Legal</a>
                            <a href="#contact" className="block px-4 py-2 hover:bg-pink-50 rounded-lg">Contact</a>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 -left-64 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-64 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-pink-600 uppercase bg-pink-100 rounded-full">
                        #1 Wellness Companion
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
                        Evolving feminine <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                            health and wellness
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Your all-in-one assistant for Pregnancy, Menstrual tracking, insights, Skincare routines, Nutrition, Workouts, Entertainment, and Community support.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                        {/* Google Play Badge */}
                        <a
                            href={storeUrls.playStore}
                            target="_blank"
                            rel="noreferrer"
                            className="transform hover:scale-105 transition duration-300"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Get it on Google Play"
                                className="h-16 w-auto"
                            />
                        </a>
                        {/* App Store Badge */}
                        <a
                            href={storeUrls.appStore}
                            className="transform hover:scale-105 transition duration-300 opacity-80 cursor-not-allowed"
                            title="Coming Soon to iOS"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                alt="Download on the App Store"
                                className="h-16 w-auto"
                            />
                        </a>
                    </div>

                    {/* App Screens Showcase */}
                    <div className="relative max-w-5xl mx-auto mt-10">
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20 h-full bottom-0"></div>
                        <div className="flex justify-center items-end gap-4 md:gap-8 overflow-hidden px-4">
                            {/* Left Screen */}
                            <div className="w-1/3 max-w-[280px] transform translate-y-12 rotate-[-6deg] hover:rotate-0 transition duration-500 z-0 text-center">
                                <div className="bg-white shadow-2xl overflow-hidden ">
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <img src="/images/img2.png" alt="App Screen 2" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                                <p className="mt-4 text-sm font-medium text-pink-500 opacity-0 group-hover:opacity-100 transition">Period Tracking</p>
                            </div>

                            {/* Center Screen (Main) */}
                            <div className="w-1/3 max-w-[320px] transform z-10 hover:-translate-y-4 transition duration-500 text-center">
                                <div className="bg-white shadow-2xl overflow-hidden ">
                                    <div className="w-full h-full bg-pink-50 flex items-center justify-center relative">
                                        <img src="/images/img1.png" alt="App Screen 1" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                            </div>

                            {/* Right Screen */}
                            <div className="w-1/3 max-w-[280px] transform translate-y-12 rotate-[6deg] hover:rotate-0 transition duration-500 z-0 text-center">
                                <div className="bg-white shadow-2xl overflow-hidden ">
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <img src="/images/img3.png" alt="App Screen 3" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                                <p className="mt-4 text-sm font-medium text-pink-500 opacity-0 group-hover:opacity-100 transition">Community Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Complete Wellness in <span style={{ color: colors.primary }}>One App</span></h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to manage your health, from cycle tracking to pregnancy and beyond.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {featureList.map((feature, index) => (
                            <div key={index} className="group p-8 rounded-3xl bg-pink-50 hover:bg-white border border-transparent hover:border-pink-200 hover:shadow-xl transition duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-pink-500 transition duration-300">
                                    <feature.icon className="w-7 h-7 text-pink-500 group-hover:text-white transition duration-300" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Legal & Compliance Section */}
            <section id="legal" className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Transparent & Secure</h2>
                        <p className="text-gray-600">Your privacy and trust are our top priorities.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                        {/* Privacy Policy */}
                        {/* Privacy Policy */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition">
                            <div className="flex items-center mb-6">
                                <Shield className="w-8 h-8 mr-4" style={{ color: colors.primary }} />
                                <h3 className="text-2xl font-bold">Privacy Policy</h3>
                            </div>
                            <div className="prose prose-sm text-gray-600 h-96 overflow-y-auto mb-6 custom-scrollbar pr-2">
                                <p className="text-xs text-gray-400 mb-4">Last Updated: February 2, 2026</p>

                                <h4 className="font-bold text-gray-900 mt-4">1. Introduction</h4>
                                <p>Welcome to FemCare+. We are committed to protecting your privacy and ensuring the security of your personal and health data.</p>

                                <h4 className="font-bold text-gray-900 mt-4">2. Information We Collect</h4>
                                <p className="font-semibold mt-2">2.1. Personal Information</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Name, Email address, Date of birth, Profile picture</li>
                                </ul>

                                <p className="font-semibold mt-2">2.2. Health and Sensitive Data</p>
                                <p>To provide core functionality, we collect:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Menstrual cycle dates and duration</li>
                                    <li>Symptoms (cramps, flow, mood)</li>
                                    <li>Sexual activity, BBT</li>
                                    <li>Skincare logs and images</li>
                                </ul>
                                <p className="text-xs mt-1 italic">We treat this data with the highest level of confidentiality.</p>

                                <p className="font-semibold mt-2">2.3. Device and Usage Data</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Device model, IP address, App usage statistics</li>
                                </ul>

                                <h4 className="font-bold text-gray-900 mt-4">3. How We Use Your Information</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><strong>Core Functionality:</strong> Cycle predictions, fertility windows, health insights.</li>
                                    <li><strong>Personalization:</strong> Tailored content and reminders.</li>
                                    <li><strong>Communication:</strong> Important updates and support.</li>
                                </ul>

                                <h4 className="font-bold text-gray-900 mt-4">4. Data Storage & Security</h4>
                                <p>Data is stored securely on your device and synchronized with encrypted cloud servers (TLS/SSL). We use encryption at rest and in transit.</p>

                                <h4 className="font-bold text-gray-900 mt-4">5. Sharing of Information</h4>
                                <p className="font-bold text-red-500">We DO NOT sell your personal or health data.</p>
                                <p>We share data only with:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Service Providers (hosting, analytics) under strict confidentiality.</li>
                                    <li>Legal Compliance (if required by law).</li>
                                </ul>

                                <h4 className="font-bold text-gray-900 mt-4">6. Your Rights</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Access, Correct, or Delete your data via App Settings.</li>
                                </ul>

                                <h4 className="font-bold text-gray-900 mt-4">7. Contact Us</h4>
                                <p>For privacy questions: <strong>privacy@femcare.app</strong></p>
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition">
                            <div className="flex items-center mb-6">
                                <Lock className="w-8 h-8 mr-4" style={{ color: colors.primary }} />
                                <h3 className="text-2xl font-bold">Terms of Service</h3>
                            </div>
                            <div className="prose prose-sm text-gray-600 h-96 overflow-y-auto mb-6 custom-scrollbar pr-2">
                                <p className="text-xs text-gray-400 mb-4">Last Updated: February 2, 2026</p>

                                <h4 className="font-bold text-gray-900 mt-4">1. Acceptance</h4>
                                <p>By using FemCare+, you agree to these Terms. You must be at least 12 years old.</p>

                                <h4 className="font-bold text-gray-900 mt-4">2. Medical Disclaimer</h4>
                                <div className="bg-red-50 text-red-800 p-3 rounded-lg border border-red-100 font-medium text-xs">
                                    <strong>NOT MEDICAL ADVICE:</strong> FemCare+ is for informational purposes only. Always consult a doctor for medical conditions. Do not rely on predictions for contraception.
                                </div>

                                <h4 className="font-bold text-gray-900 mt-4">3. User Accounts</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Maintain confidentiality of your credentials.</li>
                                    <li>Notify us of unauthorized use.</li>
                                </ul>

                                <h4 className="font-bold text-gray-900 mt-4">4. Prohibited Conduct</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>No illegal use, harassment, or reverse engineering.</li>
                                </ul>

                                <h4 className="font-bold text-gray-900 mt-4">5. Intellectual Property</h4>
                                <p>All content and software are owned by FemCare+.</p>

                                <h4 className="font-bold text-gray-900 mt-4">6. Subscriptions</h4>
                                <p>Subscriptions auto-renew unless canceled 24h before the period ends.</p>

                                <h4 className="font-bold text-gray-900 mt-4">7. Limitation of Liability</h4>
                                <p>FemCare+ is not liable for indirect damages or data loss to the extent permitted by law.</p>

                                <h4 className="font-bold text-gray-900 mt-4">8. Contact</h4>
                                <p>Questions: <strong>legal@femcare.app</strong></p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24" style={{ backgroundColor: colors.background }}>
                <div className="container mx-auto px-6">
                    <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
                        {/* Decorative circle */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-bl-full opacity-50"></div>

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold mb-6">We'd love to hear from you</h2>
                                <p className="text-xl text-gray-600 mb-10">Have questions about the app or need support? Our team is here to help you on your wellness journey.</p>

                                <div className="space-y-6">
                                    <a href={`mailto:${contact.email} `} className="flex items-center group">
                                        <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center mr-4 group-hover:bg-pink-100 transition">
                                            <Mail className="w-5 h-5 text-pink-600" />
                                        </div>
                                        <span className="text-lg text-gray-700 font-medium group-hover:text-pink-600 transition">{contact.email}</span>
                                    </a>
                                    <a href={`tel:${contact.phone.replace(/\s/g, '')} `} className="flex items-center group">
                                        <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center mr-4 group-hover:bg-pink-100 transition">
                                            <Phone className="w-5 h-5 text-pink-600" />
                                        </div>
                                        <span className="text-lg text-gray-700 font-medium group-hover:text-pink-600 transition">{contact.phone}</span>
                                    </a>
                                    <a href={`https://${contact.website}`} target="_blank" rel="noreferrer" className="flex items-center group">
                                        <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center mr-4 group-hover:bg-pink-100 transition">
                                            <Globe className="w-5 h-5 text-pink-600" />
                                        </div>
                                        <span className="text-lg text-gray-700 font-medium group-hover:text-pink-600 transition">{contact.website}</span>
                                    </a >
                                </div >
                            </div >

                            <div className="bg-gray-50 rounded-3xl p-10 text-center">
                                <h3 className="font-bold text-2xl mb-2">Connect with us</h3>
                                <p className="text-gray-500 mb-8">Follow for tips, updates, and community.</p>

                                <div className="flex flex-wrap gap-4 justify-center">
                                    {/* Instagram */}
                                    <a href={socials.instagram} target="_blank" rel="noreferrer" className="flex items-center px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition hover:text-pink-600">
                                        <FaInstagram className="w-5 h-5 text-pink-600" />&nbsp;
                                        <span className="font-medium"> Instagram</span>
                                    </a>

                                    {/* TikTok */}
                                    <a href={socials.tiktok} target="_blank" rel="noreferrer" className="flex items-center px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition hover:text-black">
                                        <FaTiktok className="w-5 h-5 text-pink-600" />&nbsp;
                                        <span className="font-medium"> TikTok</span>
                                    </a>

                                    {/* Facebook */}
                                    <a href={socials.facebook} target="_blank" rel="noreferrer" className="flex items-center px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition hover:text-blue-600">
                                        <FaFacebook className="w-5 h-5 text-pink-600" />&nbsp;
                                        <span className="font-medium"> Facebook</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1E1E1E] text-white py-12 border-t border-gray-800">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0 text-center md:text-left">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">FemCare+</span>
                            <p className="text-gray-400 mt-2 text-sm">Empowering women worldwide.</p>
                        </div>
                        <div className="text-center md:text-right text-gray-500 text-sm">
                            <p>&copy; {currentYear} Codeink Technology. All rights reserved.</p>
                            <div className="mt-2 space-x-4">
                                <a href="#legal" className="hover:text-white transition">Privacy</a>
                                <a href="#legal" className="hover:text-white transition">Terms</a>
                                <a href={`mailto:${contact.email}`} className="hover:text-white transition">Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
