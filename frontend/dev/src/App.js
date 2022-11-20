import React, { useEffect, useState } from "react";
import { Container } from './login/Login';
import { Page } from './landing/Landing';
import './login/Login.css';
import './landing/Landing.css';

//Paths for all pages
function App() {
    const paths = {
        '/login': <Container />,
        '/': <Page />
    };

    let [component, setComponent] = useState(null);

    useEffect(() => {
        const path = window.location.pathname;
        
        if(path in paths){
            setComponent(paths[path]);
        }else{
            setComponent(<Page />);
        }
    });

    return (<>{component}</>);
}

export default App;