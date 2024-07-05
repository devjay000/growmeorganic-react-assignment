import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactForm from './ContactForm';
import HelloPage from './HelloPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/hello" element={<HelloPage />} />
      </Routes>
    </Router>
  );
};

export default App;
