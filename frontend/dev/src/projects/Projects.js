import './Projects.css';
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

function ProjectsPage(props){
  return(
    <section className='projects_main'>
        <header>
        <a href="/" ><img src={logo} className="logo" alt="logo"/></a>
            <ul>
                <NavBar displayString="Home" linkPath="/"/>
                <NavBar displayString="Projects" linkPath="/projects"/>
                <NavBar displayString="About" linkPath="About"/>
                <NavBar displayString="Contact" linkPath="Contact"/>
                <NavButton displayString="Login" linkPath="/login"/>
            </ul>
        </header>   
        <div className="content">
            
        </div>                 
    </section>
  );
}

export {ProjectsPage}