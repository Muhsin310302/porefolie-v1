import { useState } from 'react';

type FormProps = {
  addProject: (project: DisForm) => void;
};

type DisForm = {
  title: string;
  description: string;
  link: string;
};

const forms: React.FC<FormProps> = ({ addProject }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [link, setLink] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject: DisForm = { title, description, link };
    addProject(newProject); 
    setTitle('');
    setDescription('');
    setLink('');
  };

  return (
    <section id="new-project">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="link">Link:</label>
        <input
          type="url"
          id="link"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />

        <button type="submit">Add Project</button>
      </form>
    </section>
  );
};

export default forms;
