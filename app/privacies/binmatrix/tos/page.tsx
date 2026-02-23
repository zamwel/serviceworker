import React from 'react';

export default function BinMatrixToS() {
    const appName = "BinMatrix";
    const developerEmail = "deverloper.codeink.playconsole@gmail.com";

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-foreground">
                <h1 className="text-4xl font-bold mt-8 mb-4">{appName} Terms of Service</h1>

                <p className="mb-6">
                    <strong>Last Updated:</strong> February 2026
                </p>

                <section className="mb-8">
                    <h2 className="text-3xl font-semibold mt-6 mb-3">1. Agreement to Terms</h2>
                    <p className="mb-4 leading-relaxed">
                        By downloading or using {appName}, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-3xl font-semibold mt-6 mb-3">2. Intellectual Property</h2>
                    <p className="mb-4 leading-relaxed">
                        The app itself, and all the trademarks, copyright, database rights and other intellectual property rights related to it, still belong to CodeInk Studios.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-3xl font-semibold mt-6 mb-3">3. Changes to the Service</h2>
                    <p className="mb-4 leading-relaxed">
                        We are committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-3xl font-semibold mt-6 mb-3">4. Data and Security</h2>
                    <p className="mb-4 leading-relaxed">
                        The {appName} app stores and processes personal data that you have provided to us, in order to provide our Service. It’s your responsibility to keep your phone and access to the app secure.
                    </p>
                </section>

                <section className="mb-8 border-t pt-8">
                    <h2 className="text-3xl font-semibold mt-6 mb-3">5. Disclaimer</h2>
                    <p className="mb-4 leading-relaxed italic text-muted-foreground">
                        The BIN information provided by this app is for informational purposes only. While we strive for accuracy, we do not warrant the completeness or reliability of the data.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-3xl font-semibold mt-6 mb-3">6. Contact Us</h2>
                    <p className="mb-4 leading-relaxed">
                        If you have any questions or suggestions about our Terms and Conditions, do not hesitate to contact us at {developerEmail}.
                    </p>
                </section>

                <footer className="mt-12 pt-8 border-t text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} CodeInk Studios. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
