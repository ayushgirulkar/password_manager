import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='foot'>
      <div className='head'>
        <h2>PassQube</h2>
      </div>
      <p>
        Created by © Ayush Girulkar | 2025 |{' '}
        <a href="mailto:girulkarayush@gmail.com" className="email-link">Send Feedback</a>
      </p>
    </footer>
  );
};

export default Footer;
