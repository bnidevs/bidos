import './Contact.css';
import logo from '../static/logo.png';

function NavBar(props){
    return(
      
      <li><a href={props.linkPath} className="text">{props.displayString}</a></li>
             
    );
  }

  //Button on nav bar 
  function NavButton(props){
    return(
      
      <li><a href={props.linkPath} className="login">{props.displayString}</a></li>
             
      );
  }

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
            <header>
            <a href = "#" ><img src = {logo} class = "logo" /></a>
                <ul>
                
                    <NavBar displayString="Home" linkPath="/"/>
                    <NavBar displayString="Projects" linkPath="/projects"/>
                    <NavBar displayString="About" linkPath="/about"/>
                    <NavBar displayString="Contact" linkPath="/contact"/>
                    <NavButton displayString="Login" linkPath="/login"/>
                
                </ul>
            </header>  
        
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