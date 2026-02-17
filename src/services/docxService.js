import mammoth from 'mammoth';

export async function extractTextFromDOCX(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });

        if (!result.value || result.value.trim().length === 0) {
            throw new Error('Tidak ada teks yang ditemukan dalam dokumen');
        }

        return result.value.trim();
    } catch (error) {
        console.error('DOCX extraction error:', error);
        throw new Error('Gagal mengekstrak teks dari DOCX');
    }
}
