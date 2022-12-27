import ThemeContext from "../../../context/themeContext";

export default function LoadingIcon(props) {
    return(
        <ThemeContext.Consumer>
            {({theme}) => (
                <div className="d-flex justify-content-center">
                    <div className={`spinner-border m-5" text-${theme}`} role="status"></div>
                </div>
            )}
        </ThemeContext.Consumer>
    );
}