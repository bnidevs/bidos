import './ProjectPage.css';
import logo from '../../static/logo.png';
import { PageHeader } from '../../components/Parts';
import { useEffect, useState } from 'react';

function RepoBtn(props){
    return (
        <a href={props.link}>
            <button
                className='project_footer_button'>
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

function IssueStub(props){
    return (
        <div className='issue_wrapper'>
            <a href={props.html_url} className='flex contributor_link clean'>
                <h5>{props.title}</h5>
            </a>
        </div>
    );
}

function ProjectPage(props){
    const [projectData, setProjectData] = useState({});
    const [contributorData, setContributorData] = useState([]);
    const [issueData, setIssueData] = useState([]);

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
                        .then(contributors => contributors.sort(
                            (a, b) => b.contributions - a.contributions
                            ).filter(
                                (x) => !x.login.includes('[bot]')
                            ))
                        .then(lst => lst.slice(0,5))
                        .then(top5 => setContributorData(top5));
                    return repo_link;
                })
                .then(repo_link => {
                    fetch(`https://api.github.com/repos/${repo_link.split('.com/')[1]}/issues?state=open`)
                        .then(resp => resp.json())
                        .then(lst => lst.slice(0,10))
                        .then(top10 => setIssueData(top10));
                });
        };
        t();
    }, []);

    const currency_format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return(
      <section className='project_page_main'>
          <PageHeader />
          <div className="left_sidebar">
            <div className="image_wrapper">
                
                {'logo_link' in projectData ? <img src={projectData.logo_link} className='proj_img'/> : <img src={logo} className='proj_img'/>}
                
                <div className='flex'>
                    <RepoBtn link={projectData.repo_link} />
                </div>
            </div>

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
          </div>
          <div className='project-timeline'>
                <h3>
                    Recent Issues
                </h3>
                {issueData.map(e => <IssueStub {...e}/>)}
        </div>               
      </section>
    );
}

export {ProjectPage}