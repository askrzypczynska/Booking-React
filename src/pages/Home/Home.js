import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import useStateStorage from '../../hooks/useStateStorage';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import Hotels from '../../components/Hotels/Hotels';
import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';
import { Last } from 'react-bootstrap/esm/PageItem';
import axios from '../../axios';
import { ObjectToArrayWithId } from '../../helpers/objects';

// const backendHotels = [
//     {
//       id: 1,
//       name: 'Zabytkowa Świątynia z możliwością noclegu',
//       city: 'Uji - Japonia',
//       rating: 8.8,
//       price: "600 jenów",
//       description: 'Niezależna świątynia buddyjska w Uji. Na terenie obiektu znajdują się dwie małe świątynie: Saishō-in należąca do sekty Tendai-shū i Jōdo-in do Jōdo-shū. Miejsce przechowywania wielu dzieł sztuki i jedna z największych atrakcji turystycznych rejonu Kioto.',
//       image:''
//     },
//     {
//       id: 2,
//       name: '"Fallingwater" Dom',
//       city: 'Mill Run - Stany Zjednoczone',
//       rating: 9.8,
//       price: "1,500 dolarów",
//       description: 'Dom zaprojektowany przez amerykańskiego architekta Franka Lloyda Wrighta w 1935 roku w południowo-zachodniej Pensylwanii, ok. 110 km od Pittsburgha. Dom zbudowany został częściowo nad wodospadem na potoku Bear Run rzeki Youghiogheny. W roku 1963 został przekazany na cele publiczne i przekształcony w muzeum z możliwością wynajmu. Odwiedza go 120 000 gości rocznie.',
//       image:''
//     },
//     {
//       id: 3,
//       name: 'Tradycyjna Chata',
//       city: 'Tengenenge - Zimbabwe',
//       rating: 2.1,
//       price: "25 dolarów",
//       description: 'Tradycyjna chata zbudowana w stylu ludu Tonga, znajdująca się niedaleko Zapory Kariba. Zapora i elektrownia wodna na rzece Zambezi tworzy jezioro Kariba w pasie granicznym pomiędzy Zambią i Zimbabwe. Jest jedną z największych zapór wodnych na świecie.',
//       image:''
//     },
//   ]

export default function Home(props) {
    useWebsiteTitle("Strona główna");

    const [lastHotel, setLastHotel] = useStateStorage('last-hotel', null);
    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);

    const getBestHotel = () => {
        if (hotels.length < 2) {
            return null;
        } else {
            return hotels
                .sort((a, b) => a.rating > b.rating ? -1 : 1)[0];
        }
    };
    
    const openHotel = (hotel) => setLastHotel(hotel);
    const removeLastHotel = () => setLastHotel(null);
    const fetchHotels = async () => {
        try {
            const res = await axios.get('/hotels.json');
            const newHotel = ObjectToArrayWithId(res.data)
            console.log(res);
            setHotels(newHotel);
        } catch (ex) {
            console.log(ex.response);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchHotels()
    }, []);

    return loading ? <LoadingIcon /> : (
        <>
            {lastHotel ? <LastHotel {...lastHotel} onRemove={removeLastHotel} /> : null}
            {getBestHotel() 
                ? <BestHotel getHotel={getBestHotel} /> 
                : null
            }
            <Hotels hotels={hotels} />
        </>
    );

}