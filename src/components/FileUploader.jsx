import { useState, useCallback } from 'react';
import { Upload, FileText, Image as ImageIcon } from 'lucide-react';
import { extractTextFromPDF } from '../services/pdfService';
import { extractTextFromDOCX } from '../services/docxService';
import { extractTextFromImage } from '../services/ocrService';

const FileUploader = ({ onFileProcessed }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const processFile = useCallback(async (file) => {
        setIsProcessing(true);
        setError('');

        try {
            let text = '';
            const fileType = file.type;
            const fileName = file.name.toLowerCase();

            if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
                text = await extractTextFromPDF(file);
            } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
                text = await extractTextFromDOCX(file);
            } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
                text = await file.text();
            } else if (fileType.startsWith('image/')) {
                text = await extractTextFromImage(file);
            } else {
                throw new Error('Format file tidak didukung');
            }

            if (!text || text.trim().length === 0) {
                throw new Error('Tidak ada teks yang dapat diekstrak dari file ini');
            }

            onFileProcessed(text, file.name);
        } catch (err) {
            console.error('File processing error:', err);
            setError(err.message || 'Gagal memproses file');
        } finally {
            setIsProcessing(false);
        }
    }, [onFileProcessed]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    }, [processFile]);

    const handleFileInput = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    }, [processFile]);

    return (
        <div className="max-w-2xl mx-auto">
            <div
                className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all ${isDragging
                        ? 'border-accessible-blue bg-blue-50'
                        : 'border-gray-300 bg-white'
                    }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                {isProcessing ? (
                    <div className="space-y-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accessible-blue mx-auto"></div>
                        <p className="text-xl font-semibold text-gray-700">Memproses file...</p>
                    </div>
                ) : (
                    <>
                        <Upload size={64} className="mx-auto text-accessible-blue mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Upload Dokumen Anda
                        </h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            Seret & lepas file di sini, atau klik tombol di bawah
                        </p>

                        <label
                            htmlFor="file-upload"
                            className="inline-block bg-accessible-blue text-white px-8 py-4 rounded-lg text-xl font-bold cursor-pointer hover:bg-blue-700 transition-colors"
                            aria-label="Pilih file untuk diupload"
                        >
                            Pilih File
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
                            onChange={handleFileInput}
                        />

                        <div className="mt-8 grid grid-cols-2 gap-4 text-left">
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                <FileText className="text-accessible-blue flex-shrink-0" size={24} />
                                <div>
                                    <p className="font-semibold text-gray-800">Dokumen</p>
                                    <p className="text-sm text-gray-600">PDF, DOCX, TXT</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                <ImageIcon className="text-accessible-blue flex-shrink-0" size={24} />
                                <div>
                                    <p className="font-semibold text-gray-800">Gambar</p>
                                    <p className="text-sm text-gray-600">JPG, PNG (OCR)</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {error && (
                    <div className="mt-6 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                        <p className="text-red-800 font-semibold">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploader;
