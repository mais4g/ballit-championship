import React, { useState, useEffect, useRef } from 'react';

const Grusht = ({ times, onComplete }) => {
    const [isGrushtActive, setIsGrushtActive] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [decibelLevels, setDecibelLevels] = useState({});
    const timerRef = useRef(null);

    const startGrusht = () => {
        setIsGrushtActive(true);
        setTimeRemaining(60);
        setDecibelLevels({});
        timerRef.current = setInterval(() => {
            setTimeRemaining(prev => prev - 1);
        }, 1000);
    };

    const endGrusht = () => {
        clearInterval(timerRef.current);
        setIsGrushtActive(false);
        const newDecibelLevels = times.reduce((acc, time) => {
            acc[time.nome] = Math.floor(Math.random() * 100) + 50; 
            return acc;
        }, {});
        setDecibelLevels(newDecibelLevels);
        onComplete(newDecibelLevels);
    };

    useEffect(() => {
        if (timeRemaining === 0 && isGrushtActive) {
            endGrusht();
        }
    }, [timeRemaining, isGrushtActive]);

    return (
        <div>
            <h2>Grusht</h2>
            {isGrushtActive ? (
                <div>
                    <p>Tempo Restante: {timeRemaining} segundos</p>
                    <button onClick={endGrusht}>Encerrar Grusht</button>
                </div>
            ) : (
                <button onClick={startGrusht}>Iniciar Grusht</button>
            )}
            {Object.keys(decibelLevels).length > 0 && (
                <div>
                    <h3>Níveis de Decibéis</h3>
                    <ul>
                        {times.map(time => (
                            <li key={time.nome}>
                                {time.nome}: {decibelLevels[time.nome]} dB
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Grusht;
