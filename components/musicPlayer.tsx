"use client";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const startMusic = () => {
      if (!started && audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play();
        setStarted(true);
      }
    };

    // Plays on the very first interaction anywhere on the page
    window.addEventListener("click", startMusic, { once: true });
    window.addEventListener("scroll", startMusic, { once: true });
    window.addEventListener("touchstart", startMusic, { once: true });

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("scroll", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, [started]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setMuted(audioRef.current.muted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop />
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-lg transition-colors"
        aria-label={muted ? "Unmute music" : "Mute music"}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </>
  );
}