import Tesseract from 'tesseract.js';

export async function extractTextFromImage(file) {
    try {
        const { data: { text } } = await Tesseract.recognize(
            file,
            'ind', // Indonesian language
            {
                logger: (m) => {
                    if (m.status === 'recognizing text') {
                        console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
                    }
                }
            }
        );

        if (!text || text.trim().length === 0) {
            throw new Error('Tidak ada teks yang terdeteksi dalam gambar');
        }

        return text.trim();
    } catch (error) {
        console.error('OCR error:', error);
        throw new Error('Gagal mengekstrak teks dari gambar');
    }
}
