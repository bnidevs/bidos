import './ProjectPage.css';
import { PageHeader } from '../../components/Parts';
import { useEffect, useState } from 'react';

function ProjectPage(props){
    const [projectData, setProjectData] = useState({});

    useEffect(() => {
        fetch('https://cxef3s02t6.execute-api.us-east-1.amazonaws.com/projects?name=' + props.projectName)
            .then(resp => resp.json())
            .then(data => {setProjectData(data)});
    });

    const currency_format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return(
      <section className='projects_main'>
          <PageHeader />
          <div className="content">
            <h1>{projectData.project_name}</h1>
            <h2>{projectData.tagline}</h2>
            <h2>Pool: {currency_format.format(projectData.project_pool)}</h2>
            <p>
                {projectData.description}
            </p>
          </div>                 
      </section>
    );
}

export {ProjectPage}