import { useEffect, useRef, useState } from "react";
import axios from '../../../../axios'
import { useHistory } from "react-router-dom";
import HotelForm from "../HotelForm";
import { useParams } from "react-router-dom";

const EditHotel = props => {
    const { id } = useParams();
    const history = useHistory();
    const imageRef = useRef();
    const [hotel, setHotel] = useState(null);

    const submit = async form => {
        await axios.patch(`/hotels/${id}.json`, form);
        history.push('/profil/hotele');
    }

    const fetchHotel = async () => {
        const res = await axios.get(`/hotels/${id}.json`)
        const hotelData = res.data;
        console.log(id);

        setHotel(hotelData)
    }

    useEffect(() => {
        fetchHotel();
    }, []);

    return (
        <div className="card">
            <div className="card-header">Edytuj hotel</div>
            <div className="card-body">

                <p className="text-muted">Uzupełnij dane hotelu</p>

                <HotelForm 
                    hotel={hotel}
                    buttonText="Zapisz!"
                    onSubmit={submit}/>

            </div>
        </div>
    );
}

export default EditHotel;