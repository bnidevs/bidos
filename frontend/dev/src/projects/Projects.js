import './Projects.css';
import logo from '../static/logo.png';
import { useEffect } from 'react';

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

function Switcher(){
    const logged_in = false;

    let check_logged_in = (event) => {
        if(!logged_in){
            console.log("Only verified users can view private projects.");
            event.preventDefault();
            return;
        }
    };

    return(
        <span className="flex">
            <input id="public_switcher" className="switcher left_switcher no_margin" type="radio" name="vis" checked></input>
            <p className="text">Public</p>
            <input id="private_switcher" className="switcher right_switcher no_margin" type="radio" name="vis" onClick={check_logged_in}></input>
            <p className="text">Private &#128274;</p>
        </span>
    );
}

function ProjectsList(){
    return(
        <ProjectCard />
    );
}

function ProjectCardButton(props){
    return(
        <button className="project_card_btn">
            <h4 className="fonted">{props.text}</h4>
        </button>
    );
}

function ProjectCard(){
    return(
        <div className="project_card">
            <div className="flex spread_out">
                <h2>bidOS</h2>
                <h4 className="project_pool">Pool: $12345.67</h4>
            </div>
            <div>
                <p>Crowdfunding open source</p>
            </div>
            <div className="spacer"></div>
            <div className="card_footer flex spread_out">
                <ProjectCardButton text="Details" />
                <ProjectCardButton text="Fund" />
            </div>
        </div>
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
            <Switcher />
            <ProjectsList />
        </div>                 
    </section>
  );
}

export {ProjectsPage}