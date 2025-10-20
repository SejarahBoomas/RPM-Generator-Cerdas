import { GoogleGenAI } from "@google/genai";

// This function is duplicated from the original frontend service to keep the function self-contained.
const buildPrompt = (data) => {
  return `
Buatkan Rencana Pembelajaran Mendalam (RPM) otomatis berdasarkan data berikut.
Gunakan format teks yang sangat rapi, profesional, dan mudah dicetak. Gunakan spasi dan indentasi untuk struktur, hindari penggunaan markdown seperti '#'.

**DATA INPUT:**
- Identitas Mata Pelajaran: ${data.identitas}
- Jumlah Jam Pelajaran: ${data.jumlah_jam} JP
- Tujuan Pembelajaran: ${data.tujuan}
- Dimensi Profil Lulusan: ${data.dimensi.join(', ')}
- Topik Pembelajaran: ${data.topik}
- Metode Pembelajaran: ${data.metode}
- Pemanfaatan Digital: ${data.digital}

**FORMAT OUTPUT YANG DIINGINKAN:**

==================================================
RENCANA PEMBELAJARAN MENDALAM (RPM)
==================================================

1.  **IDENTITAS PEMBELAJARAN**
    --------------------------------------------------
    Identitas Mata Pelajaran : ${data.identitas}
    Jumlah Jam Pelajaran     : ${data.jumlah_jam} JP (${data.jumlah_jam * 45} menit)
    Topik Pembelajaran       : ${data.topik}
    Tujuan Pembelajaran      : ${data.tujuan}
    Dimensi Profil Lulusan   : ${data.dimensi.join(', ')}
    Metode Pembelajaran      : ${data.metode}
    Pemanfaatan Digital      : ${data.digital}

2.  **RENCANA PEMBELAJARAN**
    --------------------------------------------------
    A. **KEGIATAN AWAL** (Estimasi: ${Math.round(data.jumlah_jam * 45 * 0.15)} menit)
        - **Pembukaan:** (Isi dengan salam, doa, dan presensi yang membangun suasana positif)
        - **Apersepsi & Motivasi:** (Isi dengan pertanyaan pemantik atau ice breaking singkat yang menghubungkan materi sebelumnya dengan topik saat ini dan relevan dengan kehidupan siswa)
        - **Prinsip Belajar:** Menerapkan prinsip belajar berkesadaran, bermakna, dan menggembirakan.

    B. **KEGIATAN INTI** (Estimasi: ${Math.round(data.jumlah_jam * 45 * 0.70)} menit)
        (Rincikan langkah-langkah pembelajaran sesuai sintaks metode ${data.metode}. Pastikan setiap langkah mencakup pengalaman belajar untuk PEMAHAMAN, PENERAPAN, dan REFLEKSI.)
        - **Langkah 1 (Contoh: Orientasi Masalah):** ...
        - **Langkah 2 (Contoh: Pengorganisasian):** ...
        - **Langkah 3 (dst.):** ...
        - **Prinsip Belajar:** Menerapkan prinsip belajar berkesadaran, bermakna, dan menggembirakan di seluruh kegiatan.

    C. **KEGIATAN PENUTUP** (Estimasi: ${Math.round(data.jumlah_jam * 45 * 0.15)} menit)
        - **Kesimpulan:** (Ajak siswa menyimpulkan poin-poin penting pembelajaran)
        - **Refleksi Pembelajaran:** (Gunakan pertanyaan reflektif seperti "Apa hal baru yang kamu pelajari?" atau "Bagaimana perasaanmu selama belajar?")
        - **Penutup:** (Berikan umpan balik, sampaikan materi berikutnya, dan tutup dengan doa)
        - **Prinsip Belajar:** Menerapkan prinsip belajar berkesadaran, bermakna, dan menggembirakan.

3.  **ASESMEN PEMBELAJARAN**
    --------------------------------------------------
    (Jelaskan asesmen yang relevan dan selaras dengan metode ${data.metode} dan tujuan pembelajaran.)
    - **Jenis Asesmen:** (Contoh: Observasi, Penugasan Proyek Kelompok, Refleksi Diri)
    - **Bentuk Instrumen:** (Contoh: Rubrik Penilaian Proyek, Lembar Observasi Keterampilan Kolaborasi)
    - **Tujuan Pengukuran:** Mengukur pemahaman konsep (${data.topik}) dan ketercapaian Dimensi Profil Lulusan (${data.dimensi.join(', ')}).

Gunakan bahasa Indonesia yang formal, jelas, dan komunikatif untuk guru.
  `;
};

// The handler function for the Netlify Function
exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
      console.error('API_KEY environment variable is not set in Netlify.');
      return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error: API key is missing.' })};
    }
    
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const data = JSON.parse(event.body);
    const prompt = buildPrompt(data);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: response.text }),
    };

  } catch (error) {
    console.error("Error in Netlify function:", error);
    const errorMessage = error.message || 'An internal server error occurred.';
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};
