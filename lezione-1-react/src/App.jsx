import './App.css'
import Card from './components/card/card'
import Counter from './components/Counter/Counter'
import Bitcoin from './components/Bitcoin/Bitcoin'
import Gioco from './components/Gioco/Gioco'
import PopUsa from './components/PopUsa/PopUsa'
import University from './components/University/University'
import Utente from './components/Utente/Utente'

function App() {
  const API = [
    {
      "id": 0,
      "title": "Titolo 1",
      "description": "descrizione1",
    },

    {
      "id": 1,
      "title": "Titolo 2",
      "description": "descrizione2",
    },

    {
      "id": 2,
      "title": "Titolo 3",
      "description": "descrizione3",
    },

    {
      "id": 3,
      "title": "Titolo 4",
      "description": "descrizione4",
    },

  ]

  return (
    <>
      <div className="app-container">
        <div className="card-container">
          {API.map((el) => (
            <Card 
              key={el.id}
              title={el.title}
              description={el.description}
            />
          ))}
        </div>
        <div className="counter-container"> 
          
        </div>
      </div>

      <Counter />

      <Bitcoin />

      <Gioco />

      <Utente />

      <University />

      <PopUsa />

    </>
  )
}

export default App
