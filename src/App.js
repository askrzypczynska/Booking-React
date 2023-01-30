import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import { useReducer } from 'react';
import Searchbar from './components/UI/Searchbar/Searchbar';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import ReducerContext from './context/reducerContext';
import AuthContext from './context/authContext';
import InspiringQuote from './components/InspiringQuote/InspiringQuote';
import { reducer, initialState } from './reducer';
import Home from './pages/Home/Home';

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


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);


  const searchHandler = term => {
    const newHotels = [...backendHotels]
      .filter(x => x.name
        .toLowerCase()
        .includes(term.toLowerCase()));

    dispatch({ type: 'set-hotels', hotels: newHotels});
  }
  
  const header = (
    <Header>
      <InspiringQuote/>
      <Searchbar onSearch={term => searchHandler(term)} />
      <ThemeButton />
    </Header>
  );
  
  const content = (
    <>
      <Route exact={true} path="/">
        <Home />
      </Route>

      <Route path="/hotel/:id">
        <h1>To jest hotel!</h1>
      </Route>
    </>
  );

  const menu = <Menu />;
  const footer = <Footer />;

  return(
    <Router>
      <AuthContext.Provider value={{ 
        isAuthenticated: state.isAuthenticated,
        login: () => dispatch({ type: 'login' }),
        logout: () => dispatch({ type: 'logout' }),
      }}>
        <ThemeContext.Provider value={{
          color: state.theme,
          changeTheme: () => dispatch({ type: 'change-theme'})
        }}>
          <ReducerContext.Provider value={{
              state: state,
              dispatch: dispatch
            }}>
            <Layout 
              header={header}
              menu={menu}
              content={content}
              footer={footer}
            />
          </ReducerContext.Provider>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
