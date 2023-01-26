import PropTypes from "prop-types"
import styles from "./Hotel.module.css"
import hotelImg from "../../../assets/images/hotel1.png"
import ThemeContext from "../../../context/themeContext";
import { useContext } from "react";
import useAuth from "../../../hooks/useAuth";

const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

function Hotel(props){
    const theme = useContext(ThemeContext);
    const [auth] = useAuth();

    return (

        <div className={`card ${styles.hotel}`}>
            <div className="card-body">
                <div className={"row"}>
                    <div className="col-4">            
                        <img 
                            src={hotelImg} 
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
                                <p>Ocena: {props.rating}</p>    
                                <p>Cena: {props.price}/dzień</p>
                                {auth 
                                    ? <p>Dostępność: 4 pokoje</p>
                                    : <p>Dostępność: zaloguj</p>
                                }
                            </div>
                            
                        </div>           
                    </div>

                    <div className="col-12">
                        <p className={styles.description}>{props.description}</p>
                            <a href="#" className={`btn btn-${theme.color} float-end`}>
                                Pokaż
                            </a>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

Hotel.propTypes = propTypes;

export default Hotel;