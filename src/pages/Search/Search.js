import { useParams } from "react-router-dom"
import { ObjectToArrayWithId } from "../../helpers/objects";
import axios from "../../axios";
import { useEffect, useState } from "react";
import Hotels from "../../components/Hotels/Hotels";

export default function Search(props) {
    const { term } = useParams();
    const [hotels, setHotels] = useState([]);

    const search = async () => {
        try {
            const res = await axios.get('/hotels.json');
            const newHotels = ObjectToArrayWithId(res.data).filter(hotel => hotel.name.includes(term));

            setHotels(newHotels);
        } catch (ex) {
            console.log(ex.response);
        }
    }

    useEffect(() => {
        search();
    }, [term]);

    return (
        <div>
            Wyniki wyszukiwania dla frazy "{term}":
            <Hotels hotels={hotels} />
        </div>
    )
}