import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm text-blue-600 font-medium mb-2">Legal</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-500 text-sm">Last updated: June 2025</p>
        <hr className="mt-6 border-gray-200" />
      </div>

      {/* Intro */}
      <div className="prose prose-gray max-w-none space-y-10 text-gray-700 text-sm leading-relaxed">

        <section>
          <p className="text-base text-gray-600">
            At <strong>Mithila Kriti</strong>, we are committed to protecting your personal information and your right to privacy.
            This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website
            or make a purchase from us.
          </p>
        </section>

        {[
          {
            title: '1. Information We Collect',
            content: [
              {
                subtitle: 'Personal Information',
                text: 'When you make a purchase or create an account, we collect your name, email address, phone number, shipping address, and payment information.'
              },
              {
                subtitle: 'Usage Data',
                text: 'We automatically collect certain information about how you interact with our website, including your IP address, browser type, pages visited, and time spent on pages.'
              },
              {
                subtitle: 'Cookies',
                text: 'We use cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, and analyze website traffic.'
              }
            ]
          },
          {
            title: '2. How We Use Your Information',
            content: [
              { subtitle: 'Order Processing', text: 'To process and fulfill your orders, send order confirmations, and provide customer support.' },
              { subtitle: 'Communication', text: 'To send you updates about your orders, respond to your inquiries, and send promotional offers (only if you opt in).' },
              { subtitle: 'Improvement', text: 'To analyze usage patterns and improve our website, products, and services.' },
              { subtitle: 'Legal Compliance', text: 'To comply with applicable laws, regulations, and legal processes.' }
            ]
          },
          {
            title: '3. Sharing Your Information',
            content: [
              { subtitle: 'Service Providers', text: 'We may share your information with trusted third-party service providers who assist us in operating our website, processing payments (Razorpay), and delivering orders.' },
              { subtitle: 'Legal Requirements', text: 'We may disclose your information if required by law or in response to valid legal processes.' },
              { subtitle: 'No Selling', text: 'We do not sell, trade, or rent your personal information to third parties for their marketing purposes.' }
            ]
          },
          {
            title: '4. Data Security',
            content: [
              { subtitle: null, text: 'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology and processed securely through Razorpay.' }
            ]
          },
          {
            title: '5. Your Rights',
            content: [
              { subtitle: 'Access', text: 'You have the right to access the personal information we hold about you.' },
              { subtitle: 'Correction', text: 'You can request correction of inaccurate or incomplete information.' },
              { subtitle: 'Deletion', text: 'You can request deletion of your personal data, subject to certain legal obligations.' },
              { subtitle: 'Opt-Out', text: 'You can opt out of marketing communications at any time by clicking "unsubscribe" in our emails.' }
            ]
          },
          {
            title: '6. Cookies Policy',
            content: [
              { subtitle: null, text: 'Our website uses cookies to provide a better user experience. You can control cookie settings through your browser. However, disabling cookies may affect some features of our website.' }
            ]
          },
          {
            title: '7. Children\'s Privacy',
            content: [
              { subtitle: null, text: 'Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.' }
            ]
          },
          {
            title: '8. Changes to This Policy',
            content: [
              { subtitle: null, text: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date.' }
            ]
          },
        ].map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h2>
            <div className="space-y-3">
              {section.content.map((item, i) => (
                <div key={i}>
                  {item.subtitle && (
                    <h3 className="font-medium text-gray-800 mb-1">{item.subtitle}</h3>
                  )}
                  <p className="text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Contact */}
        <section className="bg-blue-50 rounded-2xl p-6 mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:
          </p>
          <div className="space-y-1 text-sm text-gray-700">
            <p><strong>Mithila Kriti</strong></p>
            <p>📧 support@mithilakriti.com</p>
            <p>📞 +91 79031 74691</p>
            <p>📍 Darbhanga, Bihar, India</p>
          </div>
        </section>

        {/* Footer links */}
        <div className="flex gap-4 pt-6 border-t border-gray-100 text-sm">
          <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
          <Link href="/" className="text-gray-400 hover:text-gray-600">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
