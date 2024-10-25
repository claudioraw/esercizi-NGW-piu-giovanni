import './University.css'
import { useEffect, useState } from 'react'

export default function University() {

    const [uniData, setUniData] = useState([])

    useEffect(() => {
        fetch('http://universities.hipolabs.com/search?country=United+States') // Fetch dell'api

            .then((response) => response.json()) // Gestisco la risposta

            .then((data) => { // Ritorno i dati
                console.log(data)
                setUniData(data);
            })

            .catch((error) => { // Gestisco eventuali errori
                console.error(error);
            })

            .finally(() => { // Eseguo azioni alla fine di tutto

            })
    }, []);

    return(
        <div className="uni">
            <p><h1><center>Universita'</center></h1></p>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Alpha Two Code</th>
                        <th>Web Pages</th>
                    </tr>
                </thead>
                <tbody>
                    {uniData.map((el, index) => (
                        <tr key={index}>
                            <td>{el.name}</td> 
                            <td>{el.country}</td>
                            <td>{el.alpha_two_code}</td>
                            <td>
                                {el.web_pages.map((url, i) => (
                                    <div key={i}>
                                        <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )

}