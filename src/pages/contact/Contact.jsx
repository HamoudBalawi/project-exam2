import Heading from "../../components/layout/Heading";
import ContactForm from "../../components/forms/contactForm/ContactForm";
export default function Contact() {
  return (
    <div className="background-cover">
      <Heading content="Contact" />
      <div className="contents-style contact-contents">
        <h3>Contact us</h3>
        <ContactForm />
      </div>
    </div>
  );
}
