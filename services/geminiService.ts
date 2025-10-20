import { FormData } from '../types';

export const generateLessonPlan = async (formData: FormData): Promise<string> => {
  try {
    // Call the Netlify serverless function which acts as a secure proxy
    const response = await fetch('/.netlify/functions/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // Gracefully handle non-json responses
      const errorMessage = errorData.error || `Terjadi kesalahan server: ${response.status}`;
      
      if (errorMessage.toLowerCase().includes('api key')) {
          throw new Error('Kunci API tidak valid atau hilang di server. Harap periksa konfigurasi environment variable di Netlify.');
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (!data.plan) {
      throw new Error('Respon dari server tidak valid.');
    }
    return data.plan;

  } catch (error) {
    console.error("Error calling Netlify function:", error);
    if (error instanceof Error) {
      // Improve user-facing error message
      throw new Error(`Gagal menghasilkan rencana pembelajaran: ${error.message}`);
    }
    throw new Error('Gagal menghasilkan rencana pembelajaran karena kesalahan tidak dikenal.');
  }
};
