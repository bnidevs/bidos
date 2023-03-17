import './Contact.css';
import { PageHeader } from '../components/Parts';

function ContactPage() {
  return (
    <div className="page-container">
      <PageHeader />
      <div className="form-container">
        <form>
          <textarea name="text" className="feedback-input" placeholder="Response"></textarea>
          <input type="submit" value="SUBMIT" />
        </form>
      </div>
    </div>
  );
}

export { ContactPage };
