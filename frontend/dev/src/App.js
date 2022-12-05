import React, { useMemo } from "react";
import { LoginPage } from './login/Login';
import { LandingPage } from './landing/Landing';
import { ProjectsPage } from './projects/Projects';
import { ProjectPage } from './projects/projectpage/ProjectPage';
import { ContactPage } from './contact/Contact';
import { AboutPage } from './about/About';

import './login/Login.css';
import './landing/Landing.css';
import './projects/Projects.css';
import './contact/Contact.css';
import './about/About.css';

const getUrlParts = url => url.split("/").filter(Boolean);

function App() {
    //Paths for all pages
    const paths = useMemo(() => ({
        '/login': LoginPage,
        '/contact': ContactPage,
        '/about': AboutPage,
        '/project/:projectName': ProjectPage,
        '/projects': ProjectsPage,
        '': LandingPage    
    }), []);

    const pathnameParts = getUrlParts(window.location.pathname);

    const {Page, variables} = useMemo(() => {
        const variables = {};
        const pagePath =  Object.keys(paths).find(path => {
            const parts = getUrlParts(path);

            return parts.every((part, index) => {
                if(part.startsWith(":")){
                    const isMatch = Boolean(pathnameParts[index]);

                    if(isMatch){
                        const vName = part.replace(":", '');
                        variables[vName] = pathnameParts[index];
                    }
 
                    return isMatch;
                }
                return pathnameParts[index] === part;
            })
        });

        const Page =  paths[pagePath];

        return {Page, variables};
    }, []);

    return <Page  {...variables}/>
}

export default App;
