import { useState } from "react";


function useStateStorage(key, defaultValue) {
    const [state, setState] = useState(() => {
        let value;
        const storageValue = window.localStorage.getItem(key);
        if(storageValue) {
            return JSON.parse(storageValue);
        } 
        return defaultValue;
    });

    const setValue = val =>{
        setState(val);
        window.localStorage.setItem(key, JSON.stringify(val));
    }

    return [state, setValue]
}

export default useStateStorage;