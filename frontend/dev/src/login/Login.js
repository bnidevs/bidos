import './Login.css';
import logo from '../static/logo.png';

function FooterLink(props){
  return(
    
    <a href={props.linkPath} className="text">{props.displayString}</a> 
           
  );
}

function LoginButton(props){

  return(

    <div className = "input-field button">
          <button className = "test"><i className ={props.iconName} ></i> {props.buttonText}</button>
    </div>
    
  )
}

function LoginPage(){
  return(
      <div className='login_main'>
        <header>
        <a href="/" ><img src={logo} className="logo" alt="logo"/></a>
        </header>
        <div className="container">
          <div className="forms">
            <div className="form login">
              <form action = "#">
                <LoginButton
                  iconName = "fa fa-github fa-lg"  
                  buttonText = "Login with GitHub"
                />
                <FooterLink displayString="Terms of Service" linkPath="#" />
                <FooterLink displayString="Privacy Policy" linkPath="#" />
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export {FooterLink, LoginPage, LoginButton};



