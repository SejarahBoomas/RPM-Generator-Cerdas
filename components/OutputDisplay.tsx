import React from 'react';
import Card from './Card';
import Loader from './Loader';

interface OutputDisplayProps {
  generatedPlan: string;
  isLoading: boolean;
  error: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ generatedPlan, isLoading, error }) => {
  
  const handlePrint = () => {
    window.print();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Loader />
          <p className="mt-4 text-lg text-slate-600 font-medium">AI sedang meracik rencana pembelajaran terbaik untuk Anda...</p>
          <p className="mt-2 text-sm text-slate-500">Proses ini mungkin memakan waktu beberapa saat.</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <p className="font-bold">Gagal Membuat Rencana</p>
          <p className="text-sm">{error}</p>
        </div>
      );
    }
    if (generatedPlan) {
      return (
        <div id="printable-area">
          <div className="flex justify-between items-center border-b pb-2 mb-4 print:hidden">
            <h2 className="text-2xl font-bold text-slate-800">
              Hasil Rencana Pembelajaran
            </h2>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 font-semibold transition-colors duration-200 text-sm"
              aria-label="Cetak Rencana Pembelajaran"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
              </svg>
              <span>Cetak</span>
            </button>
          </div>
          <pre className="whitespace-pre-wrap break-words font-mono text-sm text-slate-800 leading-relaxed bg-white p-4 md:p-6 rounded-lg border border-slate-200">
            {generatedPlan}
          </pre>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-slate-400 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
        <h3 className="text-xl font-semibold text-slate-700">Menunggu Input Anda</h3>
        <p className="mt-2 text-slate-500">Lengkapi formulir di samping dan klik "Buat Rencana" untuk melihat keajaiban AI.</p>
      </div>
    );
  };

  return (
    <Card className="min-h-[600px] flex flex-col">
      {renderContent()}
    </Card>
  );
};

export default OutputDisplay;