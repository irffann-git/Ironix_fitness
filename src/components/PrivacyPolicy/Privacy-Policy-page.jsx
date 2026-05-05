import { useState, useEffect } from "react";
import "./Privacy-Policy-page.css";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect personal information you provide when you register for a membership, book a class, or contact us. This includes your full name, email address, phone number, date of birth, emergency contact details, and payment information. We may also collect health-related information you voluntarily share to help our trainers provide safe and effective guidance.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use your information to manage your Ironix membership, process payments, schedule classes and personal training sessions, and send you important updates about your account. We may also send you workout tips, nutrition advice, and promotional offers from Ironix. You can opt out of marketing emails at any time.",
  },
  {
    title: "Membership & Payment Data",
    content:
      "All payment transactions at Ironix are processed through secure, PCI-compliant third-party payment providers. We do not store your full card details on our servers. Membership billing records are retained for accounting and legal compliance purposes only.",
  },
  {
    title: "Sharing Your Information",
    content:
      "Ironix does not sell or rent your personal data to any third party. We may share limited information with trusted service providers such as payment processors, class scheduling platforms, and email service providers — solely to operate our gym and deliver services to you.",
  },
  {
    title: "Health & Fitness Data",
    content:
      "Any health, fitness, or body measurement data you share with Ironix trainers or through our platforms is treated with the highest level of confidentiality. This data is used exclusively to personalize your training program and is never disclosed to outside parties without your explicit consent.",
  },
  {
    title: "Cookies & Tracking",
    content:
      "Our website uses cookies to improve your browsing experience, remember your preferences, and analyze site traffic. You can manage or disable cookies through your browser settings. Disabling cookies may affect certain features such as class booking and account login.",
  },
  {
    title: "Data Security",
    content:
      "We take the security of your data seriously. Ironix uses SSL encryption, secure servers, and access controls to protect your personal information. Only authorized staff with a legitimate need can access your data. Despite these measures, no online system is completely immune to risk.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, update, or request deletion of your personal data at any time. You may also request a copy of the data we hold about you. To exercise any of these rights, please reach out to us directly at privacy@ironix.com and we will respond within 7 business days.",
  },
  {
    title: "Children's Policy",
    content:
      "Ironix memberships and services are intended for individuals aged 16 and above. We do not knowingly collect personal information from anyone under this age. If you believe a minor has provided us with personal data, please contact us immediately and we will take steps to remove it.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy as our services evolve or as required by law. Any significant changes will be communicated via email or posted prominently on our website. Your continued use of Ironix services after any update constitutes your acceptance of the revised policy.",
  },
];

function PrivacyPolicyPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="privacy-page-wrapper">
        <div className="privacy-content-card">
          <div className="privacy-header">
            <p className="privacy-brand">Ironix Fitness</p>
            <h1>Privacy Policy</h1>
            <p className="privacy-date">
              <i className="far fa-calendar-alt" style={{ marginRight: "6px" }}></i>
              Last updated: January 1, 2025
            </p>
          </div>

          <p className="privacy-intro">
            <i className="fas fa-shield-alt" style={{ marginRight: "10px", color: "var(--privacy-secondary)" }}></i>
            At Ironix, we are committed to protecting your privacy. This policy
            outlines how we collect, use, and safeguard your personal information
            when you use our gym facilities, website, or any of our services.
            Please take a moment to read it carefully.
          </p>

          <div className="privacy-sections-container">
            {sections.map((s, i) => (
              <div className="privacy-section" key={i}>
                <h2>{s.title}</h2>
                <p>{s.content}</p>
              </div>
            ))}
          </div>

          <div className="privacy-footer">
            <p>
              <i className="fas fa-envelope" style={{ marginRight: "8px" }}></i>
              Have questions about this policy? Contact us at{" "}
              <a href="mailto:privacy@ironix.com">privacy@ironix.com</a>
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className={`privacy-back-to-top ${showBackToTop ? "privacy-show" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}

export default PrivacyPolicyPage;