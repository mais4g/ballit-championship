import { useState } from "react";

const Final = ({ vencedor }) => {
    return (
        <div>
            <h2>Final do Campeonato</h2>
            <p>Parabéns ao time vencedor: {vencedor}!</p>
            <button onClick={() => window.location.reload()}>Reiniciar Campeonato</button>
        </div>
    );
};

export default Final;
