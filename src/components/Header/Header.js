import React from 'react';
import Searchbar from './Searchbar/Searchbar'
import styles from './Header.module.css';

function Header() {
    return ( 
        <header className={styles.header}>
            <Searchbar />
        </header>
    )
}

export default Header;