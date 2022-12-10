import './About.css';
import {PageHeader} from '../components/Parts';

function AboutPage(){
    return(
        <section className='about_main'>
            <PageHeader /> 
            <div className="content">
                <div className="textBox_wrapper">
                    <div>
                        About bidOS                        
                    </div>
                    <img></img>
                    <p className = "blurb">
                        At bidOS, we believe that open source is the future of innovation. It allows for collaboration and creativity on a global scale, and it gives everyone the opportunity to contribute and learn from each other. With our platform, we want to make it easier for people with great ideas to get the support and resources they need to bring them to life.
                    </p>
                    <p>
                        <br></br>Get started as a developer or a donator, supporting existing code or write your own to contribute to the projects you see a future in, and maybe make some money while you're
                    </p>
                    <p>
                        <br></br>We believe that bidOS has the potential to revolutionize the way we support open source development. By providing a platform for people to connect and collaborate, we can help more ideas become reality and drive innovation forward. Join us and see what you can create with bidOS.
                    </p>
                </div>
            </div>  
        </section>

    );
}

export {AboutPage};