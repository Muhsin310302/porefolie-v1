// src/App.tsx
import React from 'react';
import Layout from './components/Layout';
import ProjectPage from './pages/ProjectPage';

const App: React.FC = () => {
  return (
    <Layout>
      <ProjectPage />
    </Layout>
  );
};

export default App;
