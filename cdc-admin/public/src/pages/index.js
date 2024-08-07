import { useState } from 'react';
import TimeForm from '../components/TimeForm';


const IndexPage = () => {
  const [times, setTimes] = useState([]);

  const addTime = (time) => {
    setTimes([...times, time]);
  };

  return (
    <div>
      <h1>Cadastro de Times</h1>
      <TimeForm addTime={addTime}/>
      <ul>
        {times.map((time, index) => (
          <li key={index}>{time.nome}</li>
        ))}
      </ul>
      <a href="/campeonato">Iniciar Campeonato</a>
    </div>
  );
};

export default IndexPage;