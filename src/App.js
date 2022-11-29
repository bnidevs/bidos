import React, { useEffect, useState } from "react";
import { Container } from './login/Login';
import { LandingPage } from './landing/Landing';
import { ContactPage } from './contact/Contact';
import { AboutPage } from './about/About';

import './login/Login.css';
import './landing/Landing.css';
import './contact/Contact.css';
import './about/About.css';


function App() {
    //Paths for all pages
    const paths = {
        '/login': <Container />,
        '/contact': <ContactPage />,
        '/about': <AboutPage />,
        '': <LandingPage />
    };
    
    for(let path in paths) {
        paths[`${path}/`] = paths[path]
    }

    let [component, setComponent] = useState(null);

    useEffect(() => {
        const path = window.location.pathname;
        
        if(path in paths){
            setComponent(paths[path]);
        }else{
            setComponent(<LandingPage />);
        }
    });

    return (<>{component}</>);
}

export default App;
