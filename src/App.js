import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import Hotel from './pages/Hotel/Hotel';
import Search from './pages/Search/Search';


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
      <Switch>
        <Route path="/hotele/:id">
          <Hotel />
        </Route>

        <Route path="/wyszukaj/:term">
          <Search />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>

    </div>
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
