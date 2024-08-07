const TabelaFinal = ({ times }) => {
    return (
        <div>
            <h2>Tabela Final</h2>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Grito de Guerra</th>
                        <th>Ano de Fundação</th>
                        <th>Blots</th>
                        <th>Plifs</th>
                        <th>Advrunghs</th>
                        <th>Pontos Totais</th>
                    </tr>
                </thead>
                <tbody>
                    {times.map((time, index) => (
                        <tr key={index}>
                            <td>{time.nome}</td>
                            <td>{time.grito}</td>
                            <td>{time.ano}</td>
                            <td>{time.blots}</td>
                            <td>{time.plifs}</td>
                            <td>{time.advrunghs}</td>
                            <td>{time.pontosTotais}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TabelaFinal;
