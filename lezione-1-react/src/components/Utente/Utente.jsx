import './Utente.css';
import { useEffect, useState } from 'react';

export default function Utente() {
    const [userData, setUserData] = useState([]);

    const fetchUserData = () => {
        fetch('https://randomuser.me/api/')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserData(data.results);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="utente">
            <button onClick={fetchUserData}>Reset</button>
            <table>
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Cell</th>
                        <th>Location</th>
                        <th>Registered</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <img src={user.picture.medium} alt={`${user.name.first} ${user.name.last}`} />
                            </td>
                            <td>{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
                            <td>{user.gender}</td>
                            <td>{user.email}</td>
                            <td>{user.cell}</td>
                            <td>{`${user.location.city}, ${user.location.country}`}</td>
                            <td>{new Date(user.registered.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
