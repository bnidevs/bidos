import './Landing.css';
import {PageHeader} from '../components/Parts';

function LandingPage(){
    return(
        <section className='landing_main'>
            <PageHeader />
            <div className="content">
                <div className="textBox">
                    <h2>Welcome to <span>bidOS</span></h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>                 
        </section>
    );
}

export {LandingPage};