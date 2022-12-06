import './Landing.css';
import logo from '../static/logo.png';

//links on nav bar
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


 //<h2 className = "featured">Featured Projects</h2>         

function LandingPage(){
    return(
        <section className='landing_main'>
            <header>
            <a href="/" ><img src={logo} className="logo" alt="logo"/></a>
                <ul>
                
                    <NavBar displayString="Home" linkPath="/"/>
                    <NavBar displayString="Projects" linkPath="/projects"/>
                    <NavBar displayString="About" linkPath="/about"/>
                    <NavBar displayString="Contact" linkPath="/contact"/>
                    <NavButton displayString="Login" linkPath="/login"/>
                
                </ul>
            </header>   
            <div className="content">
                <div className="textBox">
                    <h2>Welcome to <span>bidOS</span></h2>
                    
                    <p className = "blurb">
                    Open source is free. Always has been. What if we could change that? What if we could give everyone what they want? designers, investors, developers, power users, prosumers, the average joe. bidOS is paving the way for people with ideas to get the resources they need to bring them to life.
                    </p>
                </div>
            </div>        
           
        </section>
    );
}

export {NavBar, LandingPage};