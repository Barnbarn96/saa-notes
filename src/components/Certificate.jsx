import React from 'react';
import pdfFile from '../assets/saa-cert.pdf';


const PdfLink = () => {
  return (
    <header>
    <div>
      <a href={pdfFile} target="_blank" rel="noopener noreferrer" style={{color: 'red'}}>
        Passed Hehe
      </a>
    </div>
    </header>
  );
};

export default PdfLink;