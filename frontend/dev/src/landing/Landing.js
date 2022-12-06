import './Landing.css';
import {PageHeader} from '../components/Parts';

function LandingPage(){
    return(
        <section className='landing_main'>
            <PageHeader />
            <div className="content">
                <div className="textBox">
                    <h2>Welcome to <span>bidOS</span></h2>
                    <p className = "blurb">
                    Open source is free. Always has been. What if we could change that? What if we could give everyone what they want? designers, investors, developers, power users, prosumers, the average joe. bidOS is paving the way for people with ideas to get the resources they need to bring them to life.
                    </p>
                </div>
            </div>                 
        </section>
    );
}

export {LandingPage};