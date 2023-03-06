import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom"
import axios from "../../../axios";
import { ObjectToArrayWithId } from "../../../helpers/objects";
import useAuth from "../../../hooks/useAuth";

export default function MyHotels(props) {
    const [auth] = useAuth();
    const { url } = useRouteMatch();
    const [hotels, setHotels] = useState([]);

    const fetchHotels = async () => {
        try {
            const res = await axios.get('/hotels.json');
            const newHotel = ObjectToArrayWithId(res.data)
                            .filter(hotel => hotel.user_id === auth.userID);
            setHotels(newHotel);
        } catch (ex) {
            console.log(ex.response);
        }
    }

    const deleteHandler = async id => {
        try {
            await axios.delete(`/hotels/${id}.json`)
            setHotels(hotels.filter(x => x.id !== id))
            console.log(id);
        } catch (ex) {
            console.log(ex.response);
        }
    }

    useEffect(() => {
        fetchHotels();
    }, []);

    return (
        <div>
            {hotels ? (
                <table className="table">
                    <thead>
                        <th>Nazwa</th>
                        <th>Status</th>
                        <th>Opcje</th>
                    </thead>
                    <tbody>
                        {hotels.map(hotel => (
                            <tr>
                                <td>{hotel.name}</td>
                                <td>
                                    {hotel.status == 1
                                        ? <span className="badge bg-success text-light">Aktywny</span>
                                        : <span className="badge bg-secondary text-light">Ukryty</span>
                                    }
                                </td>
                                <td>
                                    <Link to={`/profil/hotele/edytuj/:
                                    ${hotel.id}`} className="btn btn-outline-primary">Edytuj</Link>
                                    <button onClick={() => deleteHandler(hotel.id)} className="ml-2 btn btn-outline-danger">Usuń</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (<p>Nie masz jeszcze żadnego hotelu.</p>)}
            <Link to={`${url}/dodaj`} className="btn btn-primary">Dodaj hotel</Link>
        </div>
    )
}