import './Login.css';
import logo from '../static/logo.png';
import { useEffect, useState } from 'react';
import { response } from 'express';

function FooterLink(props){
  return(
    
    <a href={props.linkPath} className="text">{props.displayString}</a> 
           
  );
}

function LoginSuccessPage(){
    const [rerender, setRender] = useState(false);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);

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
        <div className='login_main'>
            <header>
                <a href="/" ><img src={logo} className="logo" alt="logo"/></a>
            </header>
            <div className="container">
                <div className="forms">
                    <div className="form login">
                        <div className = "success-text">
                            <div className = "test">
                                LOGIN SUCCESS
                            </div>
                        </div>
                        <FooterLink displayString="Terms of Service" />
                        <FooterLink displayString="Privacy Policy" />
                        {/* {localStorage.getItem("accessToken") ?
                            <>
                            </>
                            :
                            <>
                            </>
                        } */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export {FooterLink, LoginSuccessPage};