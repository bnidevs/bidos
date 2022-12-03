import './Contact.css';
import {PageHeader} from '../components/Parts';

function TextField(props){
      return(
        <form>
            <input type="text" placeholder = {props.displayString} />
        </form>
      );
  }

  function TextButton(props){
    return(
      <form>
          <ul>
            <li><a href={props.linkPath} className="submission">{props.displayString}</a></li>
          </ul>
      </form>
    );
}

function ContactPage(){
    return(
        <section className='contact_main'>
          <PageHeader />
          
          <div className="contact_box">

            <form className = "field">
                    <TextField displayString = "Name"/>
                    <TextField displayString = "Email"/>
                    <TextField displayString = "Message"/>
                    <TextButton displayString = "Submit"/>
                </form>
            </div>

        </section>

    );
}

export {ContactPage};