import './App.css';

function FooterLink(props){
  return(
    <a href={props.linkPath} className="text">{props.displayString}</a> 
  );
}

function Container(){
  return(
    <div class="container">
      <LoginButton
        iconName = "fa fa-github fa-lg"  
        buttonText = "Login with GitHub"
      />
    </div>
  );
}



function LoginButton(props){

  return(
    <div class = "input-field button">
          <button class = "test"><i className ={props.iconName} ></i> {props.buttonText}</button>
    </div>
  )
}



export {FooterLink, Container};



