import React from 'react';

type AddList = {
  title: string;
  description: string;
  link: string;
};

type ProjectListProps = {
  projects: AddList[];
};

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <section id="project-list">
      <h2>All Projects</h2>
      <div id="Pro">
        {projects.map((project, index) => (
          <article key={index} className="cards">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Les mer
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectList;
