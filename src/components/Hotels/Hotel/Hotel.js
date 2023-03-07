import PropTypes from "prop-types"
import styles from "./Hotel.module.css"
import ThemeContext from "../../../context/themeContext";
import { useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    desctription: PropTypes.string.isRequired,
}

function Hotel(props){
    const theme = useContext(ThemeContext);
    const [auth] = useAuth();

    const clickHandler = e => {
        if (props.onOpen) {
            props.onOpen(props);
        }
    }

    return (

        <div className={`card ${styles.hotel}`}>
            <div className="card-body">
                <div className={"row"}>
                    <div className="col-4">            
                        <img 
                            src={`https://loremflickr.com/326/217/architecture,building?random=${Math.floor(Math.random()*100)}`}
                            alt="" 
                            className="img-fluid img-thumbnail"/>
                    </div>

                    <div className="col-8">  
                        <div className="row">
                            <div className="col">
                                <p className={styles.title}>{props.name}</p>    
                                <span className="badge badge-light text-dark">{props.city}</span>
                            </div>      
                            <div className="col">
                                <p>Ocena: {props.rating ?? "Brak ocen"}</p>    
                                <p>Cena: {props.price ?? "Brak cennika"}/dzień</p>
                                {auth 
                                    ? <p>Dostępność: {props.rooms} pokoje</p>
                                    : <p>Dostępność: zaloguj</p>
                                }
                            </div>
                            
                        </div>           
                    </div>

                    <div className="col-12">
                        <p className={styles.desctription}>{props.desctription}</p>
                            <Link to={`/hotele/${props.id}`} onClick={clickHandler} className={`btn btn-${theme.color} mt-2 px-4`}>
                                Pokaż
                            </Link>
                            {}
                    </div>
                </div>
            </div>
        </div>
        
    )
}

Hotel.propTypes = propTypes;

export default Hotel;