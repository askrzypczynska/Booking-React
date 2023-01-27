import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Hotels from './components/Hotels/Hotels';
import { useCallback, useEffect, useReducer, useState } from 'react';
import LoadingIcon from './components/UI/LoadingIcon/LoadingIcon';
import Searchbar from './components/UI/Searchbar/Searchbar';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import AuthContext from './context/authContext';
import BestHotel from './components/Hotels/BestHotel/BestHotel';
import InspiringQuote from './components/InspiringQuote/InspiringQuote';
import LastHotel from './components/Hotels/LastHotel/LastHotel';
import useStateStorage from './hooks/useStateStorage';

const backendHotels = [
  {
    id: 1,
    name: 'Zabytkowa Świątynia z możliwością noclegu',
    city: 'Uji - Japonia',
    rating: 8.8,
    price: "600 jenów",
    description: 'Niezależna świątynia buddyjska w Uji. Na terenie obiektu znajdują się dwie małe świątynie: Saishō-in należąca do sekty Tendai-shū i Jōdo-in do Jōdo-shū. Miejsce przechowywania wielu dzieł sztuki i jedna z największych atrakcji turystycznych rejonu Kioto.',
    image:''
  },
  {
    id: 2,
    name: '"Fallingwater" Dom',
    city: 'Mill Run - Stany Zjednoczone',
    rating: 9.8,
    price: "1,500 dolarów",
    description: 'Dom zaprojektowany przez amerykańskiego architekta Franka Lloyda Wrighta w 1935 roku w południowo-zachodniej Pensylwanii, ok. 110 km od Pittsburgha. Dom zbudowany został częściowo nad wodospadem na potoku Bear Run rzeki Youghiogheny. W roku 1963 został przekazany na cele publiczne i przekształcony w muzeum z możliwością wynajmu. Odwiedza go 120 000 gości rocznie.',
    image:''
  },
  {
    id: 3,
    name: 'Tradycyjna Chata',
    city: 'Tengenenge - Zimbabwe',
    rating: 2.1,
    price: "25 dolarów",
    description: 'Tradycyjna chata zbudowana w stylu ludu Tonga, znajdująca się niedaleko Zapory Kariba. Zapora i elektrownia wodna na rzece Zambezi tworzy jezioro Kariba w pasie granicznym pomiędzy Zambią i Zimbabwe. Jest jedną z największych zapór wodnych na świecie.',
    image:''
  },
]

const reducer = (state, action) => {
  switch (action.type) {
    case 'change-theme':
      const theme = state.theme === 'primary' ? 'dark' : 'primary'
      return {...state, theme};
    case 'set-hotels':
      return {...state, hotels: action.hotels};
    case 'set-loading':
      return {...state, loading: action.loading};
    case 'login':
      return {...state, isAuthenticated: true};
    case 'logout':
      return {...state, isAuthenticated: false};
    default:
      throw new Error('nie ma takiej akcji:' + action.type);
  }
}

const initialState = {
  hotels: [],
  loading: true,
  isAuthenticated: true,
  theme: 'primary'
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastHotel, setLastHotel] = useStateStorage('last-hotel', null);


  const searchHandler = term => {
    const newHotels = [...backendHotels]
      .filter(x => x.name
        .toLowerCase()
        .includes(term.toLowerCase()));

    dispatch({ type: 'set-hotels', hotels: newHotels});
  }

  const getBestHotel = () => {
    if (state.hotels.length < 2) {
      return null;
    } else {
      return state.hotels
        .sort((a, b) => a.rating > b.rating ? -1 : 1)[0];
    }
  };

  const openHotel = (hotel) => setLastHotel(hotel);
  const removeLastHotel = () => setLastHotel(null);
  

  useEffect(() => {
    setTimeout(() => {
        dispatch({ type: 'set-hotels', hotels: backendHotels})
        dispatch({ type: 'set-loading', loading: false})
    }, 1000);
  }, []);

  const header = (
    <Header>
      <InspiringQuote/>
      <Searchbar 
      onSearch={term => searchHandler(term)} />
      <ThemeButton />
    </Header>
  );
  
  const content = (
    state.loading ? (
      <LoadingIcon />
    ) : (
      <>
        {lastHotel ?<LastHotel {...lastHotel} onRemove={removeLastHotel} /> : null}
        {getBestHotel() ? <BestHotel getHotel={getBestHotel} /> : null}
        <Hotels onOpen={openHotel} hotels={state.hotels}/>
      </>
    )
  );

  const menu = <Menu />;
  
  const footer = <Footer />;

  return(
    <AuthContext.Provider value={{ 
      isAuthenticated: state.isAuthenticated,
      login: () => dispatch({ type: 'login' }),
      logout: () => dispatch({ type: 'logout' }),
    }}>
      <ThemeContext.Provider value={{
        color: state.theme,
        changeTheme: () => dispatch({ type: 'change-theme'})
      }}>
        <Layout 
          header={header}
          menu={menu}
          content={content}
          footer={footer}
        />
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
