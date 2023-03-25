import './Contact.css';
import { PageHeader } from '../components/Parts';

function ContactPage() {
  return (
    <div className="page-container">
      <PageHeader />
     
        <form>
          <textarea name="text" className="feedback-input resizable" placeholder="Response"></textarea>
          <input type="submit" value="SUBMIT" />
        </form>
      
      <p className="cBlurb">
        Thank you for considering to contact us. If you have an issue with our product or service, the best way to address it is by opening an issue on our GitHub repository. This way, our team can quickly 
        and efficiently address your concerns and provide you with the support you need. We appreciate your feedback and look forward to hearing from you!
      </p>
    </div>
  );
}

export { ContactPage };
