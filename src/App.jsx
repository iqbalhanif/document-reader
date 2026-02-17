import { useState } from 'react';
import { FileText } from 'lucide-react';
import FileUploader from './components/FileUploader';
import DocumentViewer from './components/DocumentViewer';
import TTSControls from './components/TTSControls';
import { useTextToSpeech } from './hooks/useTextToSpeech';

function App() {
    const [extractedText, setExtractedText] = useState('');
    const [fileName, setFileName] = useState('');

    const {
        isPlaying,
        isPaused,
        currentIndex,
        speed,
        play,
        pause,
        resume,
        stop,
        setSpeed: changeSpeed
    } = useTextToSpeech(extractedText);

    const handleFileProcessed = (text, name) => {
        setExtractedText(text);
        setFileName(name);
        stop(); // Stop any ongoing speech
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-accessible-blue text-white p-6 shadow-lg">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <FileText size={40} />
                        Document Reader untuk Tunanetra
                    </h1>
                    <p className="mt-2 text-lg">Pembaca dokumen dengan suara</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto p-6">
                {!extractedText ? (
                    <FileUploader onFileProcessed={handleFileProcessed} />
                ) : (
                    <div className="space-y-6">
                        {/* File Info */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-600">File: <strong>{fileName}</strong></p>
                            <p className="text-sm text-gray-600">Total karakter: <strong>{extractedText.length}</strong></p>
                        </div>

                        {/* TTS Controls */}
                        <TTSControls
                            isPlaying={isPlaying}
                            isPaused={isPaused}
                            speed={speed}
                            onPlay={play}
                            onPause={pause}
                            onResume={resume}
                            onStop={stop}
                            onSpeedChange={changeSpeed}
                            onReset={() => {
                                setExtractedText('');
                                setFileName('');
                            }}
                        />

                        {/* Document Viewer */}
                        <DocumentViewer
                            text={extractedText}
                            currentIndex={currentIndex}
                        />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-12 py-6 bg-gray-800 text-white text-center">
                <p>Dibuat dengan ❤️ untuk aksesibilitas</p>
            </footer>
        </div>
    );
}

export default App;
