import { Link } from "react-router-dom";

function LastHotel(props) {

    return(
        <div className="mb-2 card bg-light">
            <div className="card-header d-flex">
                <div className="mr-auto align-self-center">
                    Ostatnio oglądałeś ten hotel. Czy jesteś wciąż zainteresowany?
                </div>
                <div>
                    <Link to={`/hotele/${props.id}`} className="m-2 btn btn-sm btn-dark">
                        Tak
                    </Link>
                    <button onClick={props.onRemove} className="btn btn-sm btn-dark">
                        Nie
                    </button>
                </div>
            </div>
            <div className="card-body special-card">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{props.name}</h5>
                    <span className="badge badge-light text-dark">{props.city}</span>
                </div>
            </div>
        </div>

    
    );
}

export default LastHotel;