import React, { useState } from 'react';
import TimeForm from '../components/TimeForm';
import Partida from '../components/Partida';
import TabelaFinal from '../components/TabelaFinal';
import Grusht from './Grusht';


const CampeonatoPage = () => {
    const [times, setTimes] = useState([]);
    const [fases, setFases] = useState([]);
    const [faseAtual, setFaseAtual] = useState(0);
    const [partidaAtual, setPartidaAtual] = useState(0);
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
        setPartidaAtual(0);
    };

    const selecionarPartida = (index) => {
        setPartidaAtual(index);
    };

    const encerrarPartida = (vencedor, resultado) => {
        const fase = fases[faseAtual];
        const novaFase = fase.map((partida, index) => (index === partidaAtual ? { ...partida, resultado } : partida));
        const novasFases = [...fases];
        novasFases[faseAtual] = novaFase;
        setFases(novasFases);

        // Verifica se é empate para iniciar Grusht
        if (resultado.timeA.pontosTotais === resultado.timeB.pontosTotais) {
            setEmGrusht(true);
            return;
        }

        // Atualiza os times com o resultado
        const timesAtualizados = times.map(time => {
            if (time.nome === resultado.timeA.nome) {
                return { ...time, ...resultado.timeA };
            } else if (time.nome === resultado.timeB.nome) {
                return { ...time, ...resultado.timeB };
            } else {
                return time;
            }
        });

        setTimes(timesAtualizados);

        const proximaPartida = novaFase.find(partida => !partida.resultado);
        if (proximaPartida) {
            setPartidaAtual(novaFase.indexOf(proximaPartida));
        } else if (faseAtual + 1 < fases.length) {
            setFaseAtual(faseAtual + 1);
            setPartidaAtual(0);
        } else {
            setVencedorFinal(timesAtualizados.reduce((prev, current) => (prev.pontosTotais > current.pontosTotais ? prev : current)));
        }
    };

    const iniciarGrusht = () => {
        setEmGrusht(true);
    };

    const encerrarGrusht = () => {
        setEmGrusht(false);
        const fase = fases[faseAtual];
        const novaFase = fase.map((partida, index) => {
            if (index === partidaAtual) {
                const resultado = {
                    timeA: { ...partida.timeA, pontosTotais: partida.timeA.pontosTotais + 3 },
                    timeB: { ...partida.timeB, pontosTotais: partida.timeB.pontosTotais + 3 },
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
            if (time.nome === fase[partidaAtual].timeA.nome || time.nome === fase[partidaAtual].timeB.nome) {
                return { ...time, pontosTotais: time.pontosTotais + 3 };
            } else {
                return time;
            }
        });

        setTimes(timesAtualizados);

        const proximaPartida = novaFase.find(partida => !partida.resultado);
        if (proximaPartida) {
            setPartidaAtual(novaFase.indexOf(proximaPartida));
        } else if (faseAtual + 1 < fases.length) {
            setFaseAtual(faseAtual + 1);
            setPartidaAtual(0);
        } else {
            setVencedorFinal(timesAtualizados.reduce((prev, current) => (prev.pontosTotais > current.pontosTotais ? prev : current)));
        }
    };

    const partidaAnterior = () => {
        if (partidaAtual > 0) {
            setPartidaAtual(partidaAtual - 1);
        }
    };

    const proximaPartida = () => {
        if (partidaAtual < fases[faseAtual].length - 1) {
            setPartidaAtual(partidaAtual + 1);
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
                        {fases[faseAtual] && (
                            <ul>
                                {fases[faseAtual].map((partida, index) => (
                                    <li key={index}>
                                        <button onClick={() => selecionarPartida(index)}>
                                            {partida.timeA.nome} vs {partida.timeB.nome}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {fases[faseAtual] && fases[faseAtual][partidaAtual] && (
                        <div>
                            <h2>Pontuação dos Times na Partida Atual</h2>
                            <p>{fases[faseAtual][partidaAtual].timeA.nome}: {fases[faseAtual][partidaAtual].timeA.pontosTotais} pontos</p>
                            <p>{fases[faseAtual][partidaAtual].timeB.nome}: {fases[faseAtual][partidaAtual].timeB.pontosTotais} pontos</p>
                            <button onClick={partidaAnterior} disabled={partidaAtual === 0}>Anterior</button>
                            <button onClick={proximaPartida} disabled={partidaAtual === fases[faseAtual].length - 1}>Próximo</button>
                        </div>
                    )}
                </>
            )}

            {fases[faseAtual] && fases[faseAtual][partidaAtual] && !emGrusht && (
                <Partida 
                    timeA={fases[faseAtual][partidaAtual].timeA} 
                    timeB={fases[faseAtual][partidaAtual].timeB} 
                    encerrarPartida={encerrarPartida} 
                    iniciarGrusht={iniciarGrusht} 
                />
            )}

            {emGrusht && (
                <Grusht
                    timeA={fases[faseAtual][partidaAtual].timeA}
                    timeB={fases[faseAtual][partidaAtual].timeB}
                    encerrarGrusht={encerrarGrusht} // Certifique-se de que esta função está sendo corretamente passada
                />
            )}

            {vencedorFinal && (
                <div>
                    <h2>Campeão: {vencedorFinal.nome}</h2>
                    <p>Grito de Guerra: {vencedorFinal.grito}</p>
                </div>
            )}

            {vencedorFinal && <TabelaFinal times={times} />}
        </div>
    );
};

export default CampeonatoPage;
