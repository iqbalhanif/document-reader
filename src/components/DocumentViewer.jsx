import { useEffect, useRef } from 'react';

const DocumentViewer = ({ text, currentIndex }) => {
    const containerRef = useRef(null);
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

    useEffect(() => {
        if (containerRef.current && currentIndex >= 0) {
            const activeElement = containerRef.current.querySelector(`[data-index="${currentIndex}"]`);
            if (activeElement) {
                activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [currentIndex]);

    return (
        <div
            ref={containerRef}
            className="bg-white p-8 rounded-lg shadow-lg max-h-96 overflow-y-auto"
            role="article"
            aria-label="Konten dokumen"
        >
            <div className="prose prose-lg max-w-none">
                {sentences.map((sentence, index) => (
                    <span
                        key={index}
                        data-index={index}
                        className={`inline ${index === currentIndex
                                ? 'bg-yellow-200 font-bold text-gray-900'
                                : 'text-gray-700'
                            }`}
                    >
                        {sentence}{' '}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default DocumentViewer;
