

import React, { useState, useEffect } from 'react';
import { Project } from '../schemas/schema';

type FormProps = {
  addProject: (project: Project) => void;
  currentProject?: Project | null;
  editProject?: (project: Project) => void;
};

const Form: React.FC<FormProps> = ({ addProject, currentProject, editProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (currentProject) {
      setTitle(currentProject.title);
      setDescription(currentProject.description);
      setLink(currentProject.link);
      setPublishedAt(currentProject.publishedAt || '');
      setIsPublic(currentProject.public ?? true);
      setStatus(currentProject.status || 'draft');
      setTags(currentProject.tags || []);
    }
  }, [currentProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      title,
      description,
      link,
      publishedAt: publishedAt || new Date().toISOString(),
      public: isPublic,
      status,
      tags,
    };

    if (currentProject && editProject) {
      editProject({ ...newProject, id: currentProject.id });
    } else {
      addProject(newProject);
    }

  
    setTitle('');
    setDescription('');
    setLink('');
    setPublishedAt('');
    setIsPublic(true);
    setStatus('draft');
    setTags([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Link</label>
      <input type="url" value={link} onChange={(e) => setLink(e.target.value)} required />

      <label>Published At</label>
      <input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />

      <label>Public</label>
      <input
        type="checkbox"
        checked={isPublic}
        onChange={(e) => setIsPublic(e.target.checked)}
      />

      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <label>Tags</label>
      <input
        type="text"
        value={tags.join(', ')}
        onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
        placeholder="Tags (separert med komma)"
      />

      <button type="submit">{currentProject ? 'Update Project' : 'Add Project'}</button>
    </form>
  );
};

export default Form;
