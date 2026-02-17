import { Play, Pause, Square, RotateCcw, Gauge } from 'lucide-react';

const TTSControls = ({
    isPlaying,
    isPaused,
    speed,
    onPlay,
    onPause,
    onResume,
    onStop,
    onSpeedChange,
    onReset
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Kontrol Pembacaan</h2>

            {/* Main Controls */}
            <div className="flex gap-4 mb-6">
                {!isPlaying ? (
                    <button
                        onClick={onPlay}
                        className="flex-1 bg-accessible-green text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        aria-label="Mulai membaca"
                    >
                        <Play size={24} />
                        Mulai Baca
                    </button>
                ) : isPaused ? (
                    <button
                        onClick={onResume}
                        className="flex-1 bg-accessible-blue text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        aria-label="Lanjutkan membaca"
                    >
                        <Play size={24} />
                        Lanjutkan
                    </button>
                ) : (
                    <button
                        onClick={onPause}
                        className="flex-1 bg-yellow-500 text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                        aria-label="Jeda"
                    >
                        <Pause size={24} />
                        Jeda
                    </button>
                )}

                <button
                    onClick={onStop}
                    disabled={!isPlaying && !isPaused}
                    className="bg-red-500 text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    aria-label="Berhenti"
                >
                    <Square size={24} />
                    Stop
                </button>

                <button
                    onClick={onReset}
                    className="bg-gray-500 text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                    aria-label="Upload file baru"
                >
                    <RotateCcw size={24} />
                    File Baru
                </button>
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Gauge size={20} />
                    Kecepatan: {speed}x
                </label>
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accessible-blue"
                    aria-label="Kontrol kecepatan pembacaan"
                />
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Lambat (0.5x)</span>
                    <span>Normal (1x)</span>
                    <span>Cepat (2x)</span>
                </div>
            </div>

            {/* Keyboard Shortcuts Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                <p className="font-semibold mb-2">Shortcut Keyboard:</p>
                <ul className="space-y-1">
                    <li><kbd className="px-2 py-1 bg-white border rounded">Space</kbd> - Play/Pause</li>
                    <li><kbd className="px-2 py-1 bg-white border rounded">Esc</kbd> - Stop</li>
                </ul>
            </div>
        </div>
    );
};

export default TTSControls;
