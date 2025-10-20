
import React, { useState, useCallback } from 'react';
import { FormData, ProfileDimensionKey } from './types';
import { generateLessonPlan } from './services/geminiService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import { PROFILE_DIMENSIONS } from './constants';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    identitas: 'Biologi, Kelas XI, Semester 1',
    jumlah_jam: 4,
    tujuan: 'Siswa mampu memahami konsep daur air dan pentingnya menjaga keseimbangan ekosistem.',
    dimensi: ['penalaran kritis', 'kolaborasi'],
    topik: 'Daur Air',
    metode: 'Project-Based Learning',
    digital: 'Powerpoint, Video Daur Air, Mentimeter',
  });
  const [generatedPlan, setGeneratedPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'jumlah_jam' ? parseInt(value) || 0 : value }));
  };

  const handleCheckboxChange = (dimension: ProfileDimensionKey) => {
    setFormData(prev => {
      const newDimensi = prev.dimensi.includes(dimension)
        ? prev.dimensi.filter(d => d !== dimension)
        : [...prev.dimensi, dimension];
      return { ...prev, dimensi: newDimensi };
    });
  };

  const handleGeneratePlan = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setGeneratedPlan('');
    try {
      if (formData.dimensi.length === 0) {
        setError('Silakan pilih minimal satu Dimensi Profil Lulusan.');
        setIsLoading(false);
        return;
      }
      const plan = await generateLessonPlan(formData);
      setGeneratedPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? `Terjadi kesalahan: ${err.message}` : 'Terjadi kesalahan tidak dikenal.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
          <InputForm
            formData={formData}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            onSubmit={handleGeneratePlan}
            isLoading={isLoading}
            profileDimensions={PROFILE_DIMENSIONS}
          />
          <OutputDisplay
            generatedPlan={generatedPlan}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-slate-500">
        <p>Ditenagai oleh Gemini API. Dibuat untuk para pendidik hebat.</p>
      </footer>
    </div>
  );
};

export default App;
