import './About.css';
import {PageHeader} from '../components/Parts';

function AboutPage(){
    return(
       
    <div className="about-section">
        <PageHeader />
       
        <h1>About Us Page</h1>
        <p>
            Open source is free. Always has been. What if we could change that? What if we could give everyone what they want? designers, investors, developers, power users, prosumers, t
            he average joe. bidOS is paving the way for people with ideas to get the resources they need to bring them to life.
        </p>
     
      </div>

    );
}

export {AboutPage};