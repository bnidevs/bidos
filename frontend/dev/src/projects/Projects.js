import './Projects.css';
import { PageHeader } from '../components/Parts';
import { useEffect, useState } from 'react';

function Switcher(){
    const logged_in = false;

    let check_logged_in = (event) => {
        if(!logged_in){
            alert("Only verified users can view private projects.");
            event.preventDefault();
            return;
        }
    };

    return(
        <span className="flex">
            <input id="public_switcher" className="switcher left_switcher no_margin" type="radio" name="vis" checked></input>
            <p className="text">Public</p>
            <input id="private_switcher" className="switcher right_switcher no_margin" type="radio" name="vis" onClick={check_logged_in}></input>
            <p className="text">Private &#128274;</p>
        </span>
    );
}

function ProjectsList(){
    const [projects, setProjects] = useState([]);
    const currency_format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    useEffect(() => {
        fetch('https://cxef3s02t6.execute-api.us-east-1.amazonaws.com/projects')
            .then(resp => resp.json())
            .then(obj => obj['projects']['Items'])
            .then(data => {
                return data.map(el => {
                    for(let k in el){
                        el[k] = Object.values(el[k])[0];
                        if(k === 'project_pool'){
                            el[k] = parseFloat(el[k]);
                        }
                    }
                    return el;
                });
            })
            .then(cleaned => {setProjects(cleaned)});
    });

    return(
        <div className="project_list">
            {projects.map((project) => (
                <ProjectCard name={project.project_name} tagline={project.tagline} pool={currency_format.format(project.project_pool)}/>
            ))}
        </div>
    );
}

function ProjectCardButton(props){
    return(
        <button className="project_card_btn">
            <h4 className="fonted">{props.text}</h4>
        </button>
    );
}

function ProjectCard(props){
    return(
        <div className="project_card_wrapper">
            <div className="project_card">
                <div className="flex spread_out">
                    <h2>{props.name}</h2>
                    <h4 className="project_pool">Pool: {props.pool}</h4>
                </div>
                <div>
                    <p>{props.tagline}</p>
                </div>
                <div className="spacer"></div>
                <div className="card_footer flex spread_out">
                    <ProjectCardButton text="Details" />
                    <ProjectCardButton text="Fund" />
                </div>
            </div>
        </div>
    );
}

function ProjectsPage(props){
  return(
    <section className='projects_main'>
        <PageHeader />
        <div className="content">
            <Switcher />
            <ProjectsList />
        </div>                 
    </section>
  );
}

export {ProjectsPage}
