import { useState, useEffect, useCallback, useRef } from 'react';

export const useTextToSpeech = (text) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [speed, setSpeed] = useState(1.0);

    const utteranceRef = useRef(null);
    const sentencesRef = useRef([]);

    useEffect(() => {
        // Split text into sentences
        sentencesRef.current = text.match(/[^.!?]+[.!?]+/g) || [text];
    }, [text]);

    const speak = useCallback((index) => {
        if (index >= sentencesRef.current.length) {
            stop();
            return;
        }

        const sentence = sentencesRef.current[index];
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.lang = 'id-ID';
        utterance.rate = speed;

        utterance.onstart = () => {
            setCurrentIndex(index);
            setIsPlaying(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            speak(index + 1);
        };

        utterance.onerror = (error) => {
            console.error('Speech error:', error);
            stop();
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, [speed]);

    const play = useCallback(() => {
        if (sentencesRef.current.length === 0) return;
        window.speechSynthesis.cancel();
        speak(0);
    }, [speak]);

    const pause = useCallback(() => {
        window.speechSynthesis.pause();
        setIsPaused(true);
        setIsPlaying(false);
    }, []);

    const resume = useCallback(() => {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsPlaying(true);
    }, []);

    const stop = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentIndex(-1);
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                if (isPlaying) {
                    pause();
                } else if (isPaused) {
                    resume();
                } else {
                    play();
                }
            } else if (e.code === 'Escape') {
                stop();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isPlaying, isPaused, play, pause, resume, stop]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    return {
        isPlaying,
        isPaused,
        currentIndex,
        speed,
        play,
        pause,
        resume,
        stop,
        setSpeed
    };
};
