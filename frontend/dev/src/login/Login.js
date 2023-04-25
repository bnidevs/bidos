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
  const [codeParam, setCodeParam] = useState("");
  // this is just to re-render the page when we get the access token from the server
  const [reRender, setReRender] = useState(false);

  // getting the github code param from the url
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParamTemp = urlParams.get("code");
    console.log("codeParam: " + codeParamTemp);
    setCodeParam(codeParamTemp);

    // getting the access token from the local storage
    // if we have the code param and no access token
    if (codeParamTemp && (localStorage.getItem("accessToken") === null)) {
      async function getAccessToken() {
        console.log("getting access token");
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParamTemp, {
          method: "GET",
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);
          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            setReRender(!reRender);
          }
        }).catch((error) => {
          console.log(error);
        });
      }
      getAccessToken();
    }
  }, []);

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }
  
  return(
    <div>
      {localStorage.getItem("accessToken") ? (
        <div className='login_main'>
          <header>
              <a href="/" ><img src={logo} className="logo" alt="logo"/></a>
          </header>
          <div className="container">
              <div className="forms">
                  <div className="form login">
                      <div className = "input-field button">
                          <button className = "test" onClick={() => {localStorage.removeItem("accessToken"); setReRender(!reRender)}}>
                              LOGIN SUCCESS
                          </button>
                      </div>
                      <div>
                        <button onClick={getUserData}>Get User Data</button>
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