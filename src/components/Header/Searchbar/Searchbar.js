import React, { useState } from "react";

function Searchbar (props) {
    const [term, setTerm] = useState('');

    const search = () => {
        props.onSearch(term)
    }

    const onKeyDownHandler = (e) =>{
        if(e.key === 'Enter'){
            search();
        }
    }

    return(
        <div className="d-flex">
            <input 
                value={term}
                onKeyDown={onKeyDownHandler}
                onChange={e => setTerm(e.target.value)}
                className="form-control"
                type="text" 
                placeholder='Szukaj...' 
            />
            <button 
                onClick={search}
                className="btn btn-primary">Szukaj
            </button>
        </div>
    )
}

export default Searchbar;