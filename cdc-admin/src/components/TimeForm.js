import React, { useState, useRef } from 'react';

const TimeForm = ({ addTime, existingTimes = [] }) => {
    const [nome, setNome] = useState('');
    const [grito, setGrito] = useState('');
    const [ano, setAno] = useState('');
    const [error, setError] = useState('');

    const nomeRef = useRef(null);
    const gritoRef = useRef(null);
    const anoRef = useRef(null);

    const handleKeyDown = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextRef) {
                nextRef.current.focus();
            } else {
                handleSubmit(e);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!/^\d{4}$/.test(ano)) {
            setError('O ano de fundação deve ter exatamente quatro dígitos.');
            return;
        }
        if (existingTimes.some(time => time.nome === nome)) {
            setError('Já existe um time com esse nome.');
            return;
        }
        if (existingTimes.some(time => time.grito === grito)) {
            setError('Já existe um time com esse grito de guerra.');
            return;
        }
        addTime({ nome, grito, ano, pontosTotais: 50, blots: 0, plifs: 0, advrunghs: 0 });
        setNome('');
        setGrito('');
        setAno('');
        setError('');
        nomeRef.current.focus();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome do Time:</label>
                <input
                    type="text"
                    value={nome}
                    ref={nomeRef}
                    onChange={(e) => setNome(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, gritoRef)}
                    required
                />
            </div>
            <div>
                <label>Grito de Guerra:</label>
                <input
                    type="text"
                    value={grito}
                    ref={gritoRef}
                    onChange={(e) => setGrito(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, anoRef)}
                    required
                />
            </div>
            <div>
                <label>Ano de Fundação:</label>
                <input
                    type="text"
                    value={ano}
                    ref={anoRef}
                    onChange={(e) => setAno(e.target.value.replace(/\D/, ''))}
                    onKeyDown={(e) => handleKeyDown(e, null)}
                    required
                />
                <small>Somente números</small>
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button type="submit">Cadastrar Time</button>
        </form>
    );
};

export default TimeForm;
