import React from "react";


const ThemeContext = React.createContext({
    theme: 'primary',
    onChange: () => {}
});

export default ThemeContext;