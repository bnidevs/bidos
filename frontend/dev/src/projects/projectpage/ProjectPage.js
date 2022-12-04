import './ProjectPage.css';
import { PageHeader } from '../../components/Parts';
import { useEffect, useState } from 'react';

function ProjectPage(props){
    return(
      <section className='projects_main'>
          <PageHeader />
          <div className="content">
            test {props.projectId}
          </div>                 
      </section>
    );
}

export {ProjectPage}