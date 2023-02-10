import './Account.css';
import * as React from 'react';
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

function AccountDetails(){
    return(
        <section className='account_details_list'>
            <ul className='account_details'>
                <li className='list_title'>Jonny Appleseed</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: user@example.com</li>
                <li>Address: 1 Main Street</li>
            </ul>
        </section>
    )
}

function PaymentMethods(){
    return(
        <section className='payment_methods_list'>
            <ul className='payment_methods'>
                <li className='list_title'>Card Information</li>
                <li>Card Brand: Visa</li>
                <li>Card Name: Jonny Appleseed</li>
                <li>Card Number: 0000 1111 2222 3333</li>
                <li>Expiration Date: 1/99</li>
            </ul>
        </section>
    )
}

function Contributions(){
    return(
        <section className='project_contributions_list'>
            <ul className='project_contributions'>
                <li className='list_title'>Project Contributions</li>
                <li>Project 1 (will be a project card)</li>
                <li>Project 2 (will be a project card)</li>
                <li>Project 3 (will be a project card)</li>
            </ul>
        </section>
    )
}

function AccountPage(){
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

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
                        <Tab label="Payment Methods" {...a11yProps(1)} />
                        <Tab label="Contributions" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <AccountDetails />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PaymentMethods />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Contributions />
                </TabPanel>
            </section>
        </section>
    );
}

export {AccountPage};