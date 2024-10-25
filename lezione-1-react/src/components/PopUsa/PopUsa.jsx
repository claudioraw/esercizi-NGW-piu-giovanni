import './PopUsa.css';
import { useEffect, useState } from 'react';

export default function PopUsa() {
    const [usaData, setUsaData] = useState([]);

    useEffect(() => {
        fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setUsaData(data.data); 
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="usa">
            <p><h1><center>Popolazione Usa</center></h1></p>
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Population</th>
                    </tr>
                </thead>
                <tbody>
                    {usaData.map((el) => (
                        <tr key={el.Year}>
                            <td>{el.Year}</td>
                            <td>{el.Population}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
