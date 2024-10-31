
import React from 'react';
import { format } from 'date-fns';
import { Project } from '../schemas/schema';

type ListProps = {
  projects: Project[];
  deleteProject: (id: string) => void;
  editProject: (project: Project) => void;
};

const List: React.FC<ListProps> = ({ projects = [], deleteProject, editProject }) => { // Fallback to an empty array
  return (
    <section id="project-list">
      <h2>All Projects</h2>
      <div id="Pro">
        {projects.map((project) => (
          <article key={project.id || Math.random()} className="cards">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Les mer
            </a>
            {project.publishedAt && (
              <p>Published At: {format(new Date(project.publishedAt), 'dd MMM yyyy')}</p>
            )}
            <p>Public: {project.public ? 'Yes' : 'No'}</p>
            <p>Status: {project.status}</p>
            {project.tags ? (
              Array.isArray(project.tags) && project.tags.length > 0 ? (
                <p>Tags: {project.tags.join(', ')}</p>
              ) : (
                <p>Tags: Ingen tags</p>
              )
            ) : (
              <p>Tags: Ingen tags</p>
            )}

            <button onClick={() => editProject(project)}>Edit</button>
            <button onClick={() => deleteProject(project.id!)}>Delete</button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default List;
