import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm text-blue-600 font-medium mb-2">Legal</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-500 text-sm">Last updated: June 2025</p>
        <hr className="mt-6 border-gray-200" />
      </div>

      {/* Intro */}
      <div className="prose prose-gray max-w-none space-y-10 text-gray-700 text-sm leading-relaxed">

        <section>
          <p className="text-base text-gray-600">
            Welcome to <strong>Mithila Kriti</strong>. By accessing or using our website and services, you agree to be
            bound by these Terms of Service. Please read them carefully before making a purchase or using our platform.
          </p>
        </section>

        {[
          {
            title: '1. Acceptance of Terms',
            content: [
              { subtitle: null, text: 'By accessing our website or placing an order, you confirm that you are at least 18 years of age and agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.' }
            ]
          },
          {
            title: '2. Products & Orders',
            content: [
              { subtitle: 'Product Descriptions', text: 'We strive to display our handcrafted products as accurately as possible. However, slight variations in color, texture, or size may occur due to the handmade nature of our items.' },
              { subtitle: 'Order Confirmation', text: 'An order is confirmed only after you receive a confirmation email from us. We reserve the right to cancel orders due to stock unavailability or pricing errors.' },
              { subtitle: 'Pricing', text: 'All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.' }
            ]
          },
          {
            title: '3. Payment',
            content: [
              { subtitle: null, text: 'Payments are processed securely through Razorpay. We accept UPI, credit/debit cards, net banking, and wallets. By providing payment information, you authorize us to charge the total amount for your order.' }
            ]
          },
          {
            title: '4. Shipping & Delivery',
            content: [
              { subtitle: 'Delivery Times', text: 'We aim to dispatch orders within 3–5 business days. Delivery timelines vary by location and are estimates, not guarantees.' },
              { subtitle: 'Shipping Charges', text: 'Shipping fees, if applicable, are displayed at checkout before you complete your purchase.' },
              { subtitle: 'Risk of Loss', text: 'Risk of loss and title for items pass to you upon delivery to the carrier.' }
            ]
          },
          {
            title: '5. Returns & Refunds',
            content: [
              { subtitle: 'Eligibility', text: 'Returns are accepted within 7 days of delivery for damaged or defective items. Custom or personalized products are non-returnable.' },
              { subtitle: 'Process', text: 'To initiate a return, contact us at support@mithilakriti.com with your order number and photos of the issue.' },
              { subtitle: 'Refunds', text: 'Approved refunds will be processed to your original payment method within 7–10 business days.' }
            ]
          },
          {
            title: '6. Intellectual Property',
            content: [
              { subtitle: null, text: 'All content on this website — including images, designs, text, and logos — is the property of Mithila Kriti and protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content without prior written permission.' }
            ]
          },
          {
            title: '7. Limitation of Liability',
            content: [
              { subtitle: null, text: 'To the maximum extent permitted by law, Mithila Kriti shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount paid for the specific order in question.' }
            ]
          },
          {
            title: '8. Governing Law',
            content: [
              { subtitle: null, text: 'These Terms of Service are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of courts in Patna, Bihar, India.' }
            ]
          },
          {
            title: '9. Changes to Terms',
            content: [
              { subtitle: null, text: 'We may update these Terms of Service from time to time. Continued use of our website after changes are posted constitutes your acceptance of the revised terms.' }
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
          <h2 className="text-lg font-semibold text-gray-900 mb-2">10. Contact Us</h2>
          <p className="text-gray-600 mb-4">
            For any questions about these Terms of Service, please reach out to us:
          </p>
          <div className="space-y-1 text-sm text-gray-700">
            <p><strong>Mithila Kriti</strong></p>
            <p>📧 support@mithilakriti.com</p>
            <p>📞 +91 79031 746910</p>
            <p>📍 Darbhanga, Bihar, India</p>
          </div>
        </section>

        {/* Footer links */}
        <div className="flex gap-4 pt-6 border-t border-gray-100 text-sm">
          <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          <Link href="/" className="text-gray-400 hover:text-gray-600">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
