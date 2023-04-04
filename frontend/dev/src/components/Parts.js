import logo from '../static/logo.png';
import {useState} from 'react';

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

function PageHeader(props){
    const [showMenu,setShowMenu] =useState(false);
    const toggleMenu =()=>{
        setShowMenu(!showMenu);
    };
    return(
        <header className ="header">
        <div className="logo-container">
            <a href="/" >
                <img src={logo} className="logo" alt="logo"/>
            </a>
        </div>
        <nav className={`nav ${showMenu ? 'show-menu' : ''}`}>
            <ul className="nav-list">
                <NavBar displayString="Home" linkPath="/"/>
                <NavBar displayString="Projects" linkPath="/projects"/>
                <NavBar displayString="About" linkPath="/about"/>
                <NavBar displayString="Contact" linkPath="/contact"/>
                <NavBar displayString="Account" linkPath="/account"/>
                <NavButton displayString="Login" linkPath="/login"/>
            </ul>
        </nav>
        <div className="menu-toggle" onClick={toggleMenu}>
            <i className={`fas fa-${showMenu ? 'times' : 'bars'}`}></i>
      </div>
        </header>
    );
}

export {PageHeader};