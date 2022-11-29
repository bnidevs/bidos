import React, { useEffect, useState, useMemo } from "react";
import { LoginPage } from './login/Login';
import { LandingPage } from './landing/Landing';
import { ProjectsPage } from './projects/Projects';
import { ContactPage } from './contact/Contact';
import { AboutPage } from './about/About';

import './login/Login.css';
import './landing/Landing.css';
import './projects/Projects.css';
import './contact/Contact.css';
import './about/About.css';


function App() {
    //Paths for all pages
    const paths = useMemo(() => ({
        '/login': <LoginPage />,
        '/contact': <ContactPage />,
        '/about': <AboutPage />,
        '/projects': <ProjectsPage />,
        '': <LandingPage />
    }), []);
    
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
            window.location.href = window.location.protocol + "//" + window.location.host;
        }
    }, [paths]);

    return (<>{component}</>);
}

export default App;
