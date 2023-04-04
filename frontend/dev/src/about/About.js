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
        <h1 className = "title">⎯ Our goal ⎯</h1>
        <p className = "blurb">
            Open source is unpaid. Always has been. What if we could change that? What if we could give everyone what they want? Designers, investors, developers, power users, prosumers, the
            average joe. bidOS is paving the way for people with ideas to get the resources they need to bring them to life. 
        </p>
        <br></br>
        <br></br>
        <h1 className = "title" >⎯ Who we are ⎯</h1>
        <p  className = "blurb">
            bidOS is an open source project which started in fall of 2022. The idea began when we realized that it is
            extremely difficult for people who participate in the open source community to make an income. We believe that the developers working on these projects deserve
            a way to gain monetary rewards for their valuable contributions and by doing so hopefully attract more attention to the very large field of open source software development.
        </p>
      </div>

    );
}

export {AboutPage};