import React, { useEffect, useState, useMemo } from "react";
import { LoginPage } from './login/Login';
import { LandingPage } from './landing/Landing';
import { ProjectsPage } from './projects/Projects';
import './login/Login.css';
import './landing/Landing.css';
import './projects/Projects.css';

//Paths for all pages
function App() {
    const paths = useMemo(() => ({
        '/login': <LoginPage />,
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
