"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Terms & Conditions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>

        <CardContent className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing or using this application, you agree to be bound by
              these Terms and Conditions. If you do not agree, please do not use
              the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">2. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>You are responsible for maintaining account security</li>
              <li>You must provide accurate and complete information</li>
              <li>You may not share your account credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">3. Acceptable Use</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Do not misuse or attempt to disrupt the service</li>
              <li>Do not access data without authorization</li>
              <li>Do not use the service for illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">4. Intellectual Property</h2>
            <p>
              All content, trademarks, and intellectual property belong to the
              application owner. You may not copy or redistribute content
              without permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">5. Service Availability</h2>
            <p>
              We strive to provide reliable service but do not guarantee
              uninterrupted access. Features may change or be discontinued.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">6. Limitation of Liability</h2>
            <p>
              We are not liable for any indirect or consequential damages arising
              from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">8. Changes to Terms</h2>
            <p>
              These Terms may be updated from time to time. Continued use of the
              service indicates acceptance of the updated terms.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
