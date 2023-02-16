import PropTypes from 'prop-types';
import { useRef } from 'react';

const InputText = props => {
    return (
        <div className='form-group'>
            <label>{props.label}</label>
            <input 
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                type={props.type}
                className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback"> 
                {props.error}
            </div>
        </div>
    );
}

const InputTextarea = props => {
    return (
        <div className='form-group'>
            <label>{props.label}</label>
            <textarea 
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                type={props.type}
                className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback"> 
                {props.error}
            </div>
        </div>
    );
}

const InputCheckbox = props => {

    const changeFeatureHandler = e => {
        const value = e.target.value;
        const isChacked = e.target.checked;

        if (isChacked) {
            const newValue = [...props.value, value]
            props.onChange(newValue);
        } else {
            const newValue = props.value.filter(x => x !== value);
            props.onChange(newValue);
        }
    }

    return (
        <div className="form-group">
            {props.options.map(option => (
                <div className="custom-control custom-checkbox" key={option.value}>
                    <input 
                        type="checkbox"
                        className="custom-control-input"
                        id={option.value}
                        value={option.value}
                        onChange={changeFeatureHandler}
                        checked={props.value.find(x => x === option.value)}
                    />
                    <label className="custom-control-label" htmlFor={option.value}>{option.label}</label>
                </div>
            ))}
        </div>
    );
}

const InputSelect = props => {
    return (
        <div className="form-group">
        <label>{props.label}</label>
        <select 
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`} >
                {props.options.map(option =>
                    <option value={option.value} key={option.value}>{option.label}</option>
                    )}
        </select>
        <div className="invalid-feedback"> 
            {props.error}
        </div>
    </div>
    );
}

const InputFile = props => {
    const fileRef = useRef()
    const changeHandler = (e) => {
        props.onChange(e.target.files[0]);
    }

    return (
        <div className="form-group">
            <input 
                type="file"
                onChange={changeHandler} 
                ref={props.fileRef}
            />
        </div>
    );
}

const InputRadio = props => {
    return (
        <div className="form-group">
            {props.options.map(option => (
                <div className="custom-control custom-radio" key={option.value}>
                    <input 
                        type="radio"
                        id={`radio-${option.value}-${props.name}`}
                        name={props.name}
                        className="custom-control-input"
                        value={option.value}
                        onChange={e => props.onChange(e.target.value)}
                        checked={props.value == option.value}
                    />
                <label className="custom-control-label" htmlFor={`radio-${option.value}-${props.name}`}>{option.label}</label>
            </div>
            ))}
        </div>
    );
}

function Input(props) {
    switch (props.type) {
        case 'select':
            return <InputSelect {...props} />
        case 'checkbox':
            return <InputCheckbox {...props} />
        case 'file':
            return <InputFile {...props} />
        case 'radio':
            return <InputRadio {...props} />
        case 'textarea':
            return <InputTextarea {...props} />
        default:
            return <InputText {...props} />
    }
}

Input.defaultProps = {
    type: 'text',
    isValid: false,
    showError: false
};

export default Input;