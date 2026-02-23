import React from 'react';

export default function BinMatrixEULA() {
    const appName = "BinMatrix";
    const developerEmail = "deverloper.codeink.playconsole@gmail.com";

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-foreground">
                <h1 className="text-4xl font-bold mt-8 mb-4">End User License Agreement (EULA)</h1>

                <p className="mb-6">
                    <strong>App Name:</strong> {appName}<br />
                    <strong>Last Updated:</strong> February 2026
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">1. License</h2>
                    <p className="mb-4 leading-relaxed">
                        CodeInk Studios grants you a personal, non-transferable, non-exclusive license to use the {appName} software on your devices in accordance with the terms of this EULA agreement.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">2. Restrictions</h2>
                    <p className="mb-4 leading-relaxed">You are not permitted to:</p>
                    <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                        <li>Edit, alter, modify, adapt, translate or otherwise change the whole or any part of the Software.</li>
                        <li>Decompile, disassemble or reverse engineer the Software.</li>
                        <li>Reproduce, copy, distribute, resell or otherwise use the Software for any commercial purpose.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">3. Termination</h2>
                    <p className="mb-4 leading-relaxed">
                        This EULA agreement is effective from the date you first use the Software and shall continue until terminated. It will also terminate immediately if you fail to comply with any term of this EULA agreement.
                    </p>
                </section>

                <section className="mb-8 border-t pt-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">4. Limitation of Liability</h2>
                    <p className="mb-4 leading-relaxed text-sm italic">
                        IN NO EVENT SHALL CODEINK STUDIOS BE LIABLE FOR ANY CONSEQUENTIAL, INCIDENTAL, INDIRECT, OR SPECIAL DAMAGES WHATSOEVER ARISING OUT OF THE USE OF OR INABILITY TO USE THE SOFTWARE.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">5. Contact</h2>
                    <p className="mb-4 leading-relaxed">
                        Questions regarding this EULA should be directed to {developerEmail}.
                    </p>
                </section>

                <footer className="mt-12 pt-8 border-t text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} CodeInk Studios. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
