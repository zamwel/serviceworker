import React from 'react';

const EULA = () => {
    const appName = "PDF Annotator Pro";
    const contactEmail = "support@codeink.stsl.com";

    return (
        <div className="max-w-3xl mx-auto p-10 font-sans leading-relaxed text-gray-800">
            <h1 className="text-[#0175C2] border-b-2 border-[#0175C2] pb-2.5">
                End User License Agreement
            </h1>

            <p className="text-sm text-gray-600 mb-8 mt-2">
                <strong>Last Updated:</strong> February 23, 2026
            </p>

            <section className="mb-8">
                <h2 className="text-[#0175C2] mt-8 text-2xl font-bold">1. License Grant</h2>
                <p>
                    CodeInk STSL grants you a revocable, non-exclusive, non-transferable, limited license to download, install and use {appName} strictly in accordance with the terms of this Agreement.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#0175C2] mt-8 text-2xl font-bold">2. Restrictions</h2>
                <p>You agree not to, and you will not permit others to:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                    <li>License, sell, rent, lease, assign, distribute, host, outsource, disclose or otherwise commercially exploit the Application.</li>
                    <li>Modify, make derivative works of, disassemble, decrypt, reverse compile or reverse engineer any part of the Application.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-[#0175C2] mt-8 text-2xl font-bold">3. Modifications to Application</h2>
                <p>
                    CodeInk STSL reserves the right to modify, suspend or discontinue, temporarily or permanently, the Application or any service to which it connects, with or without notice and without liability to you.
                </p>
            </section>

            <section className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-[#0175C2] font-bold">4. Limitation of Liability</h2>
                <p className="text-sm italic">
                    In no event shall CodeInk STSL be liable for any special, incidental, indirect, or consequential damages whatsoever.
                </p>
            </section>

            <section className="mb-8 border-t pt-8">
                <h2 className="text-[#0175C2] text-xl font-bold">5. Contact</h2>
                <p className="mt-2 text-sm">
                    Questions regarding this EULA should be sent to {contactEmail}.
                </p>
            </section>

            <footer className="mt-10 pt-5 border-t border-gray-300 text-center text-gray-600 text-xs">
                <p>© {new Date().getFullYear()} CodeInk STSL. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default EULA;
