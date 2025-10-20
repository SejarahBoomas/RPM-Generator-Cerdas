import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">
        RPM Generator Cerdas
      </h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
        Asisten Pendidikan AI untuk merancang Rencana Pembelajaran Mendalam (RPM) secara otomatis dan profesional.
      </p>
    </header>
  );
};

export default Header;
