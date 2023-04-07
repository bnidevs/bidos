import './Login.css';
import logo from '../static/logo.png';
import { useEffect, useState } from 'react';

const CLIENT_ID =  "432bd0957cc93ae4fd86";

function FooterLink(props){
  return(
    
    <a href={props.linkPath} className="text">{props.displayString}</a> 
           
  );
}

function LoginButton(props){
  function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  }

  return(

    <div className = "input-field button">
          <button className = "test" onClick={loginWithGithub}><i className ={props.iconName}></i> {props.buttonText}</button>
    </div>
    
  )
}

function LoginPage(){
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [rerender, setRender] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);
    
    if (codeParam !== null) {
      setLoginSuccess(true);
    }

    // getting accessToken from local storage 
    // (can be a security concern might want to change in the future)
    if (codeParam && (localStorage.getItem("accessToken") === null)) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
          method: "GET"
        }).then((response) => {
          return response.json();  
        }).then((data) => {
          console.log(data);
          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            setRender(!rerender);
          }
        })
      }
    }
  }, []);

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("accessToken") // Bearer ACCESSTOKEN
      }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    })
  }
  
  return(
    <div>
      {/* {localStorage.getItem("accessToken") ? 
          <>
            
          </>
          :
          <>
          </>
      } */}
      {console.log(localStorage.getItem("accessToken"))}
      {loginSuccess === true ? (
        <div className='login_main'>
          <header>
              <a href="/" ><img src={logo} className="logo" alt="logo"/></a>
          </header>
          <div className="container">
              <div className="forms">
                  <div className="form login">
                      <div className = "input-field button">
                          <button className = "test" onClick={getUserData} >
                              LOGIN SUCCESS
                          </button>
                      </div>
                      <FooterLink displayString="Terms of Service" />
                      <FooterLink displayString="Privacy Policy" />
                  </div>
              </div>
          </div>
      </div>
      ) : (
        <div className='login_main'>
          <header>
          <a href="/" ><img src={logo} className="logo" alt="logo"/></a>
          </header>
          <div className="container">
            <div className="forms">
              <div className="form login">
                  <LoginButton iconName = "fa fa-github fa-lg" buttonText = "Login with GitHub" />
                  <FooterLink displayString="Terms of Service" linkPath="#" />
                  <FooterLink displayString="Privacy Policy" linkPath="#" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export {FooterLink, LoginPage, LoginButton};