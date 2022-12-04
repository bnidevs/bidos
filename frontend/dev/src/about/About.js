import './About.css';
import {PageHeader} from '../components/Parts';

function AboutPage(){
    return(
        <section className='about_main'>
            <PageHeader /> 
            <p>About Page</p>
        </section>

    );
}

export {AboutPage};