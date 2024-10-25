import { useEffect, useState } from 'react'
import './Counter.css'
 
export default function Counter() {
    const [count, setCount] = useState(0)
    const [showPopup, setShowPopup] = useState(false)

    const add = () => {
        setCount(count + 1)
    }

    const min = () => {
        setCount(count - 1)
    }

    const reset = () => {
        setCount(0)
    }

    useEffect(() => {
        if (count < 0) {
            setCount(0)
            setShowPopup(true)
        }
        if (count > 0) {setShowPopup(false)}
    }, [count])

    return (
        <div className="counter">
            <p><h2><center>Counter</center></h2></p>
            <h1>{count}</h1>
           
            <div className="btns">
                <button onClick={() => add()}>+</button>
                <button onClick={() => min()}>-</button>
                <button onClick={() => reset()}>Reset</button>
            </div>

            {showPopup && (
            <div className="popup">
                <h3>Errore!</h3>
                <p>Il counter non puo' andare sotto zero</p>
            </div>
           )}
        </div>
    )
 
}