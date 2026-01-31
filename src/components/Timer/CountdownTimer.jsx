// src/components/Timer/CountdownTimer.jsx
import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = () => {
  const INITIAL_TIME = 60 * 1000; // 60 seconds

  // --- FIXED: LAZY INITIALIZATION ---
  // We read LocalStorage inside useState so it sets the correct time BEFORE the first render.
  
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('timer_state'));
    if (saved) {
      if (saved.status === 'Running') {
        const timePassed = Date.now() - saved.lastUpdated;
        return Math.max(0, saved.remaining - timePassed);
      }
      if (saved.status === 'Paused') {
        return saved.remaining;
      }
    }
    return INITIAL_TIME;
  });

  const [isActive, setIsActive] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('timer_state'));
    // If status is Running or Paused, it is Active. If Idle, it is false.
    return saved ? saved.status !== 'Idle' : false;
  });

  const [isPaused, setIsPaused] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('timer_state'));
    return saved ? saved.status === 'Paused' : false;
  });
  
  const timerRef = useRef(null);

  // 2. SAVE STATE CONSTANTLY
  useEffect(() => {
    let status = 'Idle';
    if (isActive && !isPaused) status = 'Running';
    if (isActive && isPaused) status = 'Paused';

    localStorage.setItem('timer_state', JSON.stringify({
      remaining: timeLeft,
      status: status,
      lastUpdated: Date.now()
    }));
  }, [timeLeft, isActive, isPaused]);

  // 3. THE TICKER
  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 10) {
            clearInterval(timerRef.current);
            setIsActive(false);
            return 0;
          }
          return prev - 10;
        });
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, isPaused, timeLeft]);

  // Helper to format MM:SS:MS
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(INITIAL_TIME);
    localStorage.removeItem('timer_state');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Persistent Timer</h2>

      <div className="text-5xl font-mono font-bold text-gray-700 mb-8 bg-gray-100 py-6 rounded-lg tracking-widest">
        {formatTime(timeLeft)}
      </div>

      <div className="flex justify-center gap-4">
        {!isActive ? (
          <button 
            onClick={() => setIsActive(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition"
          >
            Start
          </button>
        ) : (
          <>
            {isPaused ? (
              <button 
                onClick={() => setIsPaused(false)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition"
              >
                Resume
              </button>
            ) : (
              <button 
                onClick={() => setIsPaused(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full transition"
              >
                Pause
              </button>
            )}
            
            <button 
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;