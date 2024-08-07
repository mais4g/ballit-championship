// pages/campeonato.js
import React, { useState } from 'react';
import TimeForm from '../components/TimeForm';
import Partida from '../components/Partida';
import TabelaFinal from '../components/TabelaFinal';
import Grusht from '../components/Grusht';

const CampeonatoPage = () => {
    const [times, setTimes] = useState([]);
    const [fases, setFases] = useState([]);
    const [faseAtual, setFaseAtual] = useState(0);
    const [partidaAtual, setPartidaAtual] = useState(null);
    const [campeonatoIniciado, setCampeonatoIniciado] = useState(false);
    const [vencedorFinal, setVencedorFinal] = useState(null);
    const [emGrusht, setEmGrusht] = useState(false);

    const addTime = (time) => {
        if (times.length >= 16) {
            alert('O campeonato já atingiu o número máximo de 16 times.');
            return;
        }
        setTimes(prevTimes => [...prevTimes, time]);
    };

    const iniciarFase = () => {
        if (times.length < 8 || times.length > 16 || times.length % 2 !== 0) {
            alert('O campeonato deve ter entre 8 e 16 times e o número de times deve ser par.');
            return;
        }

        const novasPartidas = [];
        const timesSorteados = [...times].sort(() => Math.random() - 0.5);

        for (let i = 0; i < timesSorteados.length; i += 2) {
            novasPartidas.push({ timeA: timesSorteados[i], timeB: timesSorteados[i + 1] });
        }

        setFases(prevFases => [...prevFases, novasPartidas]);
        setCampeonatoIniciado(true);
        setPartidaAtual(novasPartidas[0]);
    };

    const encerrarPartida = (vencedor, resultado) => {
        const fase = fases[faseAtual];
        const novaFase = fase.map(partida => (partida === partidaAtual ? { ...partida, resultado } : partida));
        const novasFases = [...fases];
        novasFases[faseAtual] = novaFase;
        setFases(novasFases);

        if (resultado.timeA.pontosTotais === resultado.timeB.pontosTotais) {
            setEmGrusht(true);
            setPartidaAtual({ timeA: resultado.timeA, timeB: resultado.timeB });
            return;
        }

        const timesAtualizados = times.map(time => {
            if (time.nome === resultado.timeA.nome) {
                return {
                    ...time,
                    blots: resultado.timeA.blots,
                    plifs: resultado.timeA.plifs,
                    advrunghs: resultado.timeA.advrunghs,
                    pontosTotais: resultado.timeA.pontosTotais,
                };
            } else if (time.nome === resultado.timeB.nome) {
                return {
                    ...time,
                    blots: resultado.timeB.blots,
                    plifs: resultado.timeB.plifs,
                    advrunghs: resultado.timeB.advrunghs,
                    pontosTotais: resultado.timeB.pontosTotais,
                };
            } else {
                return time;
            }
        });

        setTimes(timesAtualizados);

        const proximaPartida = novaFase.find(partida => !partida.resultado);
        if (proximaPartida) {
            setPartidaAtual(proximaPartida);
        } else if (faseAtual + 1 < fases.length) {
            setFaseAtual(faseAtual + 1);
            setPartidaAtual(fases[faseAtual + 1][0]);
        } else {
            setVencedorFinal(timesAtualizados.reduce((prev, current) => (prev.pontosTotais > current.pontosTotais ? prev : current)));
        }
    };

    const encerrarGrusht = (decibelLevels) => {
        setEmGrusht(false);
        const fase = fases[faseAtual];
        const novaFase = fase.map(partida => {
            if (partida === partidaAtual) {
                const [vencedor] = Object.entries(decibelLevels).reduce((max, [nome, dB]) => 
                    dB > (max.dB || 0) ? { nome, dB } : max, {});
                
                const resultado = {
                    timeA: { ...partida.timeA, pontosTotais: partida.timeA.pontosTotais + (partida.timeA.nome === vencedor ? 3 : 0) },
                    timeB: { ...partida.timeB, pontosTotais: partida.timeB.pontosTotais + (partida.timeB.nome === vencedor ? 3 : 0) },
                };
                return { ...partida, resultado };
            } else {
                return partida;
            }
        });
        const novasFases = [...fases];
        novasFases[faseAtual] = novaFase;
        setFases(novasFases);

        const timesAtualizados = times.map(time => {
            if (time.nome === partidaAtual.timeA.nome || time.nome === partidaAtual.timeB.nome) {
                return { ...time, pontosTotais: time.pontosTotais + 3 };
            } else {
                return time;
            }
        });

        setTimes(timesAtualizados);

        const proximaPartida = novaFase.find(partida => !partida.resultado);
        if (proximaPartida) {
            setPartidaAtual(proximaPartida);
        } else if (faseAtual + 1 < fases.length) {
            setFaseAtual(faseAtual + 1);
            setPartidaAtual(fases[faseAtual + 1][0]);
        } else {
            setVencedorFinal(timesAtualizados.reduce((prev, current) => (prev.pontosTotais > current.pontosTotais ? prev : current)));
        }
    };

    return (
        <div>
            <h1>Ballit Championship</h1>
            {!campeonatoIniciado && (
                <>
                    <TimeForm addTime={addTime} existingTimes={times} />
                    <h2>Times Cadastrados</h2>
                    <ul>
                        {times.map((time, index) => (
                            <li key={index}>
                                {time.nome} - {time.grito} ({time.ano})
                            </li>
                        ))}
                    </ul>
                    {times.length > 1 && <button onClick={iniciarFase}>Iniciar Campeonato</button>}
                </>
            )}
            {campeonatoIniciado && !emGrusht && (
                <>
                    <div>
                        <h2>Partidas</h2>
                        <ul>
                            {fases[faseAtual].map((partida, index) => (
                                <li key={index}>
                                    <button onClick={() => setPartidaAtual(partida)}>
                                        {partida.timeA.nome} vs {partida.timeB.nome}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2>Pontuação dos Times na Partida Atual</h2>
                        {partidaAtual && (
                            <>
                                <p>{partidaAtual.timeA.nome}: {partidaAtual.timeA.pontosTotais} pontos</p>
                                <p>{partidaAtual.timeB.nome}: {partidaAtual.timeB.pontosTotais} pontos</p>
                            </>
                        )}
                    </div>
                </>
            )}
            {partidaAtual && !emGrusht && (
                <Partida
                    timeA={partidaAtual.timeA}
                    timeB={partidaAtual.timeB}
                    encerrarPartida={encerrarPartida}
                    iniciarGrusht={() => setEmGrusht(true)}
                />
            )}
            {emGrusht && partidaAtual && (
                <Grusht
                    timeA={partidaAtual.timeA}
                    timeB={partidaAtual.timeB}
                    encerrarGrusht={encerrarGrusht}
                />
            )}
            {vencedorFinal && (
                <div>
                    <h2>Campeão: {vencedorFinal.nome}</h2>
                    <p>Grito de Guerra: {vencedorFinal.grito}</p>
                </div>
            )}
            {campeonatoIniciado && !vencedorFinal && (
                <div>
                    <h2>Advrungh</h2>
                    {times.map(time => (
                        <div key={time.nome}>
                            <h3>{time.nome}</h3>
                            <button onClick={() => console.log(`Adicionar Advrungh para ${time.nome}`)}>Adicionar Advrungh</button>
                        </div>
                    ))}
                </div>
            )}
            {vencedorFinal && <TabelaFinal times={times} />}
        </div>
    );
};

export default CampeonatoPage;
