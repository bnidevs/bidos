import './ProjectPage.css';
import { PageHeader } from '../../components/Parts';
import { useEffect, useState } from 'react';

function RepoBtn(props){
    return (
        <a href={props.link}>
            <button
                className='project_footer_button'
            >
                <i className="fa fa-github fa-lg" ></i>
            </button>
        </a>
    );
}

function ContributorStub(props){
    return (
        <div className='contributor_wrapper'>
            <a href={props.html_url} className='flex contributor_link clean'>
                <img src={props.avatar_url} alt={`github avatar: ${props.login}`} className='contributor_avatar'/>
                <h5>{props.login}</h5>
            </a>
        </div>
    );
}

function ProjectPage(props){
    const [projectData, setProjectData] = useState({});
    const [contributorData, setContributorData] = useState([]);

    useEffect(() => {
        const t = async () => {
            fetch('https://cxef3s02t6.execute-api.us-east-1.amazonaws.com/projects/search?name=' + props.projectName.replaceAll('_', ' '))
                .then(resp => resp.json())
                .then(obj => obj['projects']['Items'][0])
                .then(proj => {
                    for(let k in proj){
                        proj[k] = Object.values(proj[k])[0];
                        if(k === 'project_pool'){
                            proj[k] = parseFloat(proj[k]);
                        }
                    }
                    setProjectData(proj);
                    return proj.repo_link
                })
                .then(repo_link => {
                    fetch(`https://api.github.com/repos/${repo_link.split('.com/')[1]}/contributors`)
                        .then(resp => resp.json())
                        .then(contributors => contributors.sort((a, b) => b.contributions - a.contributions))
                        .then(lst => lst.slice(0,10))
                        .then(top10 => setContributorData(top10));
                });
        };
        t();
    }, []);

    const currency_format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return(
      <section className='projects_main'>
          <PageHeader />
          <div className="content">
            <h1>{projectData.project_name}</h1>
            <h3>{projectData.tagline}</h3>
            <h3>Pool: {currency_format.format(projectData.project_pool)}</h3>
            <p>
                {projectData.description}
            </p>
            <br />
            <br />
            <div className='flex col left inherit-width'>
                <h3>Top contributors:</h3>
                <div>
                    {contributorData.map(e => <ContributorStub {...e} />)}
                </div>
            </div>
            <br />
            <div className='flex'>
                <RepoBtn link={projectData.repo_link} />
            </div>
          </div>                 
      </section>
    );
}

export {ProjectPage}