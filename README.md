# Document Reader untuk Tunanetra

Aplikasi web untuk membantu tunanetra membaca dokumen melalui text-to-speech.

## Fitur
- 📄 Support PDF, DOCX, TXT
- 🖼️ OCR untuk gambar (JPG, PNG)
- 🔊 Text-to-Speech bahasa Indonesia
- ⚡ Kontrol kecepatan pembacaan
- ⌨️ Keyboard shortcuts
- 🎯 Highlight teks yang sedang dibaca

## Cara Menjalankan

### Development
```bash
cd document-reader
npm install
npm run dev
```

### Build untuk Production
```bash
npm run build
```

## Keyboard Shortcuts
- **Space**: Play/Pause
- **Esc**: Stop

## Tech Stack
- React + Vite
- TailwindCSS
- PDF.js (PDF extraction)
- Mammoth.js (DOCX extraction)
- Tesseract.js (OCR)
- Web Speech API (TTS)
