/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function SubsWatcherLegal() {
    const lastUpdated = "February 23, 2026";
    const appName = "SubsWatcher";
    const contactEmail = "legal@subscriptions.app";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Terms of Service & EULA
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last Updated: {lastUpdated}
                    </p>
                </header>

                <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sm:p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                        Terms of Service
                    </h2>
                    <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                        <h3 className="text-2xl font-semibold">1. Agreement</h3>
                        <p>By using {appName}, you agree to these Terms. If you don't agree, do not use the app.</p>

                        <h3 className="text-2xl font-semibold">2. Service Description</h3>
                        <p>{appName} is a subscription tracking assistant. We help you manage your recurring payments and provide insights into your spending habits.</p>

                        <h3 className="text-2xl font-semibold">3. User Responsibilities</h3>
                        <ul className="list-disc pl-5">
                            <li>You are responsible for the accuracy of data you enter.</li>
                            <li>You must keep your account credentials secure.</li>
                            <li>You agree not to use the app for any illegal purposes.</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sm:p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                        End User License Agreement
                    </h2>
                    <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                        <h3 className="text-2xl font-semibold">1. License Grant</h3>
                        <p>We grant you a limited, non-exclusive, non-transferable license to use {appName} on your personal devices.</p>

                        <h3 className="text-2xl font-semibold">2. Restrictions</h3>
                        <p>You may not hack, reverse engineer, or redistribute our software without express written permission.</p>

                        <h3 className="text-2xl font-semibold">3. Disclaimers</h3>
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 text-yellow-800 dark:text-yellow-200">
                            {appName} provides spending tracking for informational purposes only. We are not responsible for actual bank charges or subscription renewals.
                        </div>
                    </div>
                </section>

                <footer className="text-center text-sm text-gray-500 py-8">
                    <p>Contact: {contactEmail}</p>
                    <p>© {new Date().getFullYear()} {appName}. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
