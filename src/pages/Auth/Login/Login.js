import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import axios from "../../../axios-auth";


export default function Login(props) {
    const [auth, setAuth] = useAuth();
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [valid, setValid] = useState(null)
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await axios.post("accounts:signInWithPassword", {
                email: email,
                password: password,
                returnSecureToken: true
            });
            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userID: res.data.localId,
            });
            history.push('/');
        } catch (ex) {
            setError(ex.response.data.error.message)
            setLoading(false)
        }
        };

        if (auth) {
            history.push('/');
        }

    return (
        <div>
            <h2>Logowanie:</h2>

            {valid === false ? (
                <div className="alert alert-danger">Niepoprawne dane logowania</div>
            ) : null}

            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                        className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Hasło</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        className="form-control"
                    />
                </div>
                {error ? (
                        <div className="alert alert-danger">Nieprawidłowy email lub hasło</div>
                    ) : null}
                <LoadingButton loading={loading} label="Zaloguj">Zaloguj</LoadingButton>
            </form>
        </div>
    );
}