import './Login.css';

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



