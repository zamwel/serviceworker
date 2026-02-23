import React from 'react';

const TermsOfService = () => {
    const appName = "PDF Annotator Pro";
    const contactEmail = "support@codeink.stsl.com";

    return (
        <div className="max-w-3xl mx-auto p-10 font-sans leading-relaxed text-gray-800">
            <h1 className="text-[#0175C2] border-b-2 border-[#0175C2] pb-2.5">
                Terms of Service
            </h1>

            <p className="text-sm text-gray-600 mb-8 mt-2">
                <strong>Last Updated:</strong> February 23, 2026
            </p>

            <section className="mb-8">
                <h2 className="text-[#0175C2] mt-8 text-2xl font-bold">1. Acceptance of Terms</h2>
                <p>
                    By accessing and using {appName}, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#0175C2] mt-8 text-2xl font-bold">2. Provision of Service</h2>
                <p>
                    You agree and acknowledge that {appName} is entitled to modify, improve or discontinue any of its services at its sole discretion and without notice to you even if it may result in you being prevented from accessing any information contained in it.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#0175C2] mt-8 text-2xl font-bold">3. Proprietary Rights</h2>
                <p>
                    You acknowledge and agree that {appName} may contain proprietary and confidential information including trademarks, service marks and patents protected by intellectual property laws and international intellectual property treaties.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#0175C2] mt-8 text-2xl font-bold">4. Termination of Agreement</h2>
                <p>
                    The terms of this agreement will continue to apply in perpetuity until terminated by either party without notice at any time for any reason.
                </p>
            </section>

            <section className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-[#0175C2] font-bold">5. Disclaimer of Warranties</h2>
                <p className="text-sm italic">
                    You understand and agree that your use of {appName} is entirely at your own risk and that our services are provided "As Is" and "As Available".
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#0175C2] mt-8 text-2xl font-bold">6. Contact Information</h2>
                <p>
                    If you have any questions about these Terms, please contact us at:
                </p>
                <div className="bg-gray-100 p-4 rounded-md mt-2.5">
                    <p className="my-1.5"><strong>Email:</strong> {contactEmail}</p>
                </div>
            </section>

            <footer className="mt-10 pt-5 border-t border-gray-300 text-center text-gray-600 text-xs">
                <p>© {new Date().getFullYear()} CodeInk STSL. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default TermsOfService;
