import { useEffect, useState, useLayoutEffect } from "react";

const quotes = [
    'Podróże to jedyna rzecz na którą wydajemy pieniądze, a stajemy się bogatsi.',
    'Podróżowanie uczy skromności. Widzisz, jak niewiele miejsca zajmujesz w świecie.',
    'Każde miejsce, które odwiedzasz staje się w jakiś sposób częścią ciebie.',
    'Nie czekaj. Pora nigdy nie będzie idealna.',
    'Jeśli myślisz, że przygody bywają niebezpieczne, spróbuj rutyny. Ona jest śmiercionośna.',
    "Podróżnik, który nie potrafi obserwować, jest jak ptak pozbawiony skrzydeł.",
    "Lepiej zobaczyć coś raz, niż słyszeć o tym tysiąc razy."
]

const styles = {
    position: 'absolute',
    padding: '10px',
    top: '10px',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontStyle: 'italic'
}

function InspiringQuote(props) {

    const [quote, setQuote] = useState('Wczytywanie cytatu...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ... pobieranie
        setLoading(false);
    }, []);

    useLayoutEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, [loading])

    return (
        <p style={styles}>{quote}</p>
    );
}

export default InspiringQuote;