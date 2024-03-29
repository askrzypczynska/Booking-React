import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import { useReducer, lazy, Suspense, useEffect } from 'react';
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
import Hotel from './pages/Hotel/Hotel';
import Search from './pages/Search/Search';
import NotFound from './pages/404/404';
import Login from './pages/Auth/Login/Login';
import AuthenticatedRoute from './hoc/AuthenticatedRoute';
import ErrorBoundary from './hoc/ErrorBoundary';
import AddHotel from './pages/Profile/MyHotels/AddHotel/AddHotel';
import EditHotel from './pages/Profile/MyHotels/EditHotel/EditHotel';
import Register from './pages/Auth/Register/Register';

const Profile = lazy(() => import('./pages/Profile/Profile'));

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <InspiringQuote/>
      <Searchbar />
      <ThemeButton />
    </Header>
  );
  
  const content = (
    <div>
      <ErrorBoundary>
      <Suspense fallback={<p>Ładowanie...</p>}>
        <Switch>

          <AuthenticatedRoute path="/profil/hotele/edytuj/:id" component={EditHotel} />
          <AuthenticatedRoute path="/profil/hotele/dodaj" component={AddHotel} />
          <AuthenticatedRoute path="/profil" component={Profile} />
          <Route path="/hotele/:id" component={Hotel} />
          <Route path="/wyszukaj/:term?" component={Search}/>
          <Route path="/zaloguj" component={Login}/>
          <Route path="/rejestracja" component={Register}/>
          <Route path="/" exact component={Home}/>
          <Route component={NotFound}/>

        </Switch>
      </Suspense>
      </ErrorBoundary>
    </div>
  );

  const menu = <Menu />;
  const footer = <Footer />;

  return(
    <Router>
      <AuthContext.Provider value={{ 
        user: state.user,
        login: (user) => dispatch({ type: 'login', user }),
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
