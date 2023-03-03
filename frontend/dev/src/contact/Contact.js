import './Contact.css';
import {PageHeader} from '../components/Parts';

function ContactPage(){
    return(
        <div className = "container">
          <PageHeader /> 
          <form> 
         

          <input name="name" type="text" className="feedback-input" placeholder="Name" />   
          <input name="email" type="text" className="feedback-input" placeholder="Email" />
          <input name="text" className="feedback-input" placeholder="Response"/>
          <input type="submit" value="SUBMIT"/>
   
          </form>
        </div>

     
    );
}

export {ContactPage};