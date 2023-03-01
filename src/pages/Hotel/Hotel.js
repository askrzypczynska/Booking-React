import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import axios from "../../axios";

function Hotel(props) {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    const setTitle = useWebsiteTitle();

    const fetchHotel = async () => {
        try {
            const res = await axios.get(`/hotels/${id}.json`);
            setHotel(res.data);
            setTitle(res.data.name);
        } catch (ex) {
            console.log(ex.response);
        }
        setLoading(false)

        // setHotel({
        //     id: 1,
        //     name: 'Zabytkowa Świątynia z możliwością noclegu',
        //     city: 'Uji - Japonia',
        //     rating: 8.8,
        //     price: "600 jenów",
        //     description: 'Niezależna świątynia buddyjska w Uji. Na terenie obiektu znajdują się dwie małe świątynie: Saishō-in należąca do sekty Tendai-shū i Jōdo-in do Jōdo-shū. Miejsce przechowywania wielu dzieł sztuki i jedna z największych atrakcji turystycznych rejonu Kioto.',
        //     image:''
        // })
    }

    useEffect(() => {
        // pobieranie danych
        fetchHotel();
    }, []);

    return loading ? <LoadingIcon /> : (
        <h1>Hotel: {hotel.name}</h1>
    )
}

export default Hotel;