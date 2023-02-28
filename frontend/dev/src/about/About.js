import './About.css';
import {PageHeader} from '../components/Parts';

function ContactButton(props){
    return(
        <a href={props.linkPath} className="TestBut">{props.displayString}</a>
    );
}


function AboutPage(){
    return(
       
    <div className="about-section">
        <PageHeader />
       
        <h1>About us</h1>
        <p>
            Open source is free. Always has been. What if we could change that? What if we could give everyone what they want? designers, investors, developers, power users, prosumers, t
            he average joe. bidOS is paving the way for people with ideas to get the resources they need to bring them to life.
        </p>

       <br></br>
       <br></br>
        <ContactButton displayString="Contact Us" linkPath="/contact"/>




     
      </div>

    );
}

export {AboutPage};