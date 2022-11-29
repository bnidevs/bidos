import './Contact.css';
import logo from './logo.png';

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
            <p>Contact Page</p>
        </section>

    );
}

export {ContactPage};