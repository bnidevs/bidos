import './Account.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {PageHeader} from '../components/Parts';
import { Typography, Tabs, Tab, Box } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function AccountDetails( editing ){
    const [canEdit, setEdit] = useState(0);


    return(
        <section className='account_details_list'>
            <ul className='account_details'>
                <li className='list_title'>Jonny Appleseed</li>
                <li>
                    Phone: <input type='text' placeholder='(123) 456-7890' />
                </li>
                <li>
                    Email: <input type='text' placeholder='example@email.com' />
                </li>
                <li>
                    Address: <input type='text' placeholder='1 Main Street' />
                </li>
            </ul>
        </section>
    );
}

function ProjectCardButton(props){
    let projNameCleaned = '#';
    if(props.link){
        projNameCleaned = `/project/${props.link.replace(/ /g, '_')}`;
    }

    return(
        <a href={projNameCleaned}>
            <button className="project_card_btn">
                <h4 className="fonted">{props.text}</h4>
            </button>
        </a>
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
                    <ProjectCardButton text="Details" link={props.name}/>
                    <ProjectCardButton text="Fund" />
                </div>
            </div>
        </div>
    );
}

function Contributions(props){
    const [filtered, setFiltered] = useState(props.projList);
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
            .then(cleaned => {
                setFiltered(cleaned);
            });
    }, []);

    return(
        <>
            <div className="project_list">
                {filtered.map((project) => (
                    <ProjectCard name={project.project_name} tagline={project.tagline} pool={currency_format.format(project.project_pool)}/>
                ))}
            </div>
        </>
    );
}

function PaymentMethods(){
    return(
        <section className='payment_methods_list'>
            <ul className='payment_methods'>
                <li className='list_title'>Card Information</li>
                <li>
                    Card Number: <input type='text' placeholder='1234 5678 9012 3456' />
                </li>
                <li>
                    Card Name: <input type='text' placeholder='Johnny Appleseed' />
                </li>
                <li>
                    Expiration Date: <input type='date' />
                </li>
            </ul>
        </section>
    );
}

function AccountPage(){
    const [value, setValue] = React.useState(0);
    const [projects, setProjects] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

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
            .then(cleaned => {
                setProjects(cleaned);
            });
    }, []);


    return(
        <section className='account_main'>
            <PageHeader /> 
            <section className='account_body'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: '16vmax' }}>
                    <Tabs
                    TabIndicatorProps={{ style: { background: 'white' } }}
                    onChange={handleChange}
                    value={value}
                    textColor='white'
                    orientation='vertical'
                    aria
                    >
                        <Tab label="Account Details" {...a11yProps(0)} />
                        <Tab label="Contributions" {...a11yProps(1)} />
                        <Tab label="Payment Methods" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <AccountDetails />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Contributions projList={projects}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <PaymentMethods />
                </TabPanel>
            </section>
        </section>
    );
}

export {AccountPage};