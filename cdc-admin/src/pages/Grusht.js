import React from 'react';
import { Link } from 'react-router-dom';
import GrushtComponent from '../components/Grusht';

const Grusht = ({ timeA, timeB, encerrarGrusht }) => {
  return (
    <div>
      <h1>Grusht</h1>
      <GrushtComponent timeA={timeA} timeB={timeB} encerrarGrusht={encerrarGrusht} />
      <nav>
        <Link to="/final">Tela Final</Link>
      </nav>
    </div>
  );
};

export default Grusht;
