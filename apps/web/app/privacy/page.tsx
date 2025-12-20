"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>

        <CardContent className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold">1. Introduction</h2>
            <p>
              Your privacy is important to us. This Privacy Policy explains how
              we collect, use, and protect your information when you use our
              application.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email address and authentication details</li>
              <li>Account-related information</li>
              <li>Usage data such as pages visited and actions taken</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide and maintain our service</li>
              <li>To authenticate users securely</li>
              <li>To improve performance and user experience</li>
              <li>To communicate important updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">4. Data Security</h2>
            <p>
              We use industry-standard security practices to protect your data.
              Passwords are encrypted and authentication is handled securely by
              trusted providers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">5. Third-Party Services</h2>
            <p>
              We may use third-party services (such as authentication or hosting
              providers) that process data on our behalf. These services comply
              with industry security standards.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">6. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal
              information. You may also request account deletion at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
