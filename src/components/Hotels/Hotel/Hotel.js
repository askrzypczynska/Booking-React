import React from "react";
import styles from "./Hotel.module.css"
import hotelImg from "../../../assets/images/hotel1.png"

function Hotel(){
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
                                <p className={styles.title}>Buddyjska świątynia</p>    
                                <span className="badge badge-light text-dark">Uji - Japonia</span>
                            </div>      
                            <div className="col">
                                <p>Ocena: 8.3</p>    
                                <p>600 jenów/dzień</p>
                            </div>
                        </div>           
                    </div>

                    <div className="col-12">
                        <p className={styles.description}>Niezależna świątynia buddyjska w Uji. Na terenie obiektu znajdują się dwie małe świątynie: Saishō-in należąca do sekty Tendai-shū i Jōdo-in do Jōdo-shū. Miejsce przechowywania wielu dzieł sztuki i jedna z największych atrakcji turystycznych rejonu Kioto.</p>
                        <a href="#" className="btn btn-primary float-end">Pokaż</a>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Hotel;