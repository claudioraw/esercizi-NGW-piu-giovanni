import React, { useState } from 'react';
import './gioco.css';

const options = ['sasso', 'carta', 'forbice'];

const Gioco = () => {
  const [sceltaUtente, setSceltaUtente] = useState('');
  const [sceltaComputer, setSceltaComputer] = useState('');
  const [risultato, setRisultato] = useState('');

  const gestisciScelta = (opzione) => {
    const sceltaComputer = options[Math.floor(Math.random() * options.length)];
    setSceltaUtente(opzione);
    setSceltaComputer(sceltaComputer);
    calcolaRisultato(opzione, sceltaComputer);
  };

  const calcolaRisultato = (utente, computer) => {
    if (utente === computer) {
      setRisultato('Pareggio!');
    } else if (
      (utente === 'sasso' && computer === 'forbice') ||
      (utente === 'carta' && computer === 'sasso') ||
      (utente === 'forbice' && computer === 'carta')
    ) {
      setRisultato('Hai vinto!');
    } else {
      setRisultato('Hai perso!');
    }
  };

  return (
    <div className="container">
      <h1>Sasso, Carta, Forbice</h1>
      <div className="layout">
        <div className="scelte">
          {options.map((opzione) => (
            <div key={opzione} className="card" onClick={() => gestisciScelta(opzione)}>
              {opzione}
            </div>
          ))}
        </div>
        <div className="risultati">
          <div className="scelta">
            <h2>Player</h2>
            <h2>Avversario</h2>
          </div>
          <div className="scelta-valori">
            <div className="card">{sceltaUtente || '...'}</div>
            <div className="vs">VS</div>
            <div className="card">{sceltaComputer || '...'}</div>
          </div>
          <h2 className="risultato">{risultato}</h2>
        </div>
      </div>
    </div>
  );
};

export default Gioco;
