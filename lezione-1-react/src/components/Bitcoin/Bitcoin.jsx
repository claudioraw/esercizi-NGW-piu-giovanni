import { useEffect, useState } from 'react'
import './Bitcoin.css'
export default function Bitcoin() {
    const [usd, setUsd] = useState("")
    const [eur, setEur] = useState("")
    const [gbp, setGbp] = useState("")

    const [IsLoading, serIsLoading] = useState(false)
        
    useEffect(() => {
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')

            .then((response) => response.json()) 

            .then((data) => {
                console.log(data)
                setUsd(data.bpi.USD.rate)
                setEur(data.bpi.EUR.rate)
                setGbp(data.bpi.GBP.rate)
            })

            .catch((error) => {
                console.error(error);
            })

            .finally(() => {

            })
    }, []);

    

    return (
        <div className="bitcoin">
            <p><h1><center>Bitcoin</center></h1></p>
            <div className="inner">
                <div className="value usd">
                    <h2>$ {usd}</h2>
                    <span>USD</span>
                </div>

                <div className="value eur">
                    <h2>€ {eur}</h2>
                    <span>EUR</span>
                </div>

                <div className="value gbp">
                    <h2>£ {gbp}</h2>
                    <span>GBP</span>
                </div>

            </div>
        </div>
    )
}