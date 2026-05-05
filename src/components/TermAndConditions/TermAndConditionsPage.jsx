import "./TermAndConditionsPage.css";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using any services provided by Ironix, including our gym facilities, website, mobile app, or personal training sessions, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
  },
  {
    title: "2. Membership",
    content:
      "All Ironix memberships are personal and non-transferable. Members must be at least 16 years of age. You are responsible for maintaining the confidentiality of your account credentials. Ironix reserves the right to suspend or terminate any membership that violates these terms.",
  },
  {
    title: "3. Payments & Billing",
    content:
      "Membership fees are billed on a monthly or annual basis depending on your selected plan. All payments are non-refundable unless otherwise stated. Ironix reserves the right to modify pricing with a minimum of 30 days written notice to existing members.",
  },
  {
    title: "4. Cancellation Policy",
    content:
      "Members may cancel their membership at any time by providing written notice at least 15 days before the next billing date. Cancellations made after this window will take effect in the following billing cycle. No partial refunds will be issued for unused days.",
  },
  {
    title: "5. Facility Rules & Conduct",
    content:
      "All members are expected to behave respectfully towards staff and fellow members. Ironix maintains a zero-tolerance policy for harassment, discrimination, or aggressive behavior. Violation of facility rules may result in immediate membership termination without refund.",
  },
  {
    title: "6. Health & Medical Disclaimer",
    content:
      "You acknowledge that physical exercise involves inherent risks. It is your responsibility to consult a qualified physician before beginning any fitness program at Ironix. By using our facilities, you confirm that you are medically fit to participate in physical activity.",
  },
  {
    title: "7. Personal Training Sessions",
    content:
      "Personal training sessions must be booked in advance and are subject to trainer availability. Sessions cancelled with less than 24 hours notice will be forfeited. Ironix is not liable for any injury sustained during personal training if the member disregards trainer instructions.",
  },
  {
    title: "8. Liability Waiver",
    content:
      "Ironix, its staff, and its affiliates shall not be held liable for any injury, loss, or damage to personal property occurring within our facilities, unless caused by proven negligence on our part. Members use all gym equipment at their own risk.",
  },
  {
    title: "9. Use of Media",
    content:
      "Ironix may capture photos or videos within its facilities for promotional purposes. By becoming a member, you consent to being photographed or recorded in common areas. If you do not wish to appear in promotional content, please notify our staff in writing.",
  },
  {
    title: "10. Amendments to Terms",
    content:
      "Ironix reserves the right to update or modify these Terms and Conditions at any time. Members will be notified of significant changes via email or through a notice on our website. Continued use of our services after any update constitutes acceptance of the revised terms.",
  },
];

function TermsAndConditionsPage() {
  return (
    <div className="terms-page-wrapper">
      <div className="terms-content-card">
        <div className="terms-header">
          <p className="terms-brand">Ironix</p>
          <h1>Terms & Conditions</h1>
          <p className="terms-date">Last updated: January 1, 2025</p>
        </div>

        <p className="terms-intro">
          Welcome to Ironix. These Terms and Conditions govern your use of our
          gym facilities, website, and all related services. By becoming a
          member or using any of our services, you agree to comply with and be
          bound by the following terms. Please read them carefully.
        </p>

        <div className="terms-sections-container">
          {sections.map((s, i) => (
            <div className="terms-section" key={i}>
              <h2>{s.title}</h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>

        <div className="terms-footer">
          <p>
            Have questions about these terms? Contact us at{" "}
            <a href="mailto:legal@ironix.com">legal@ironix.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditionsPage;