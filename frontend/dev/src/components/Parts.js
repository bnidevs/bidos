import logo from "../static/logo.png";

function NavBar(props) {
  return (
    <li>
      <a href={props.linkPath} className="text">
        {props.displayString}
      </a>
    </li>
  );
}

//Button on nav bar
function NavButton(props) {
  return (
    <li>
      <a href={props.linkPath} className="login">
        {props.displayString}
      </a>
    </li>
  );
}

function PageHeader(props) {
  return (
    <header>
      <a href="/">
        <img src={logo} className="logo" alt="logo" />
      </a>
      <ul>
        <NavBar displayString="Home" linkPath="/home" />
        <NavBar displayString="Projects" linkPath="/projects" />
        <NavBar displayString="About" linkPath="/about" />
        <NavBar displayString="Contact" linkPath="/contact" />
        <NavButton displayString="Login" linkPath="/login" />
      </ul>
    </header>
  );
}

export { PageHeader };
