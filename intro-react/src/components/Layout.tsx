// src/components/Layout.tsx
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="App">
      <header>
        <h1>Portfolio</h1>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2024 Portfolio by Muhs</p>
      </footer>
    </div>
  );
};

export default Layout;
