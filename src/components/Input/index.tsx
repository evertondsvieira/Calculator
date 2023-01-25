import { IInputForm } from '../../types';
import './style.css'

const Input = ({htmlFor, label, name, type, register}:IInputForm) => {
    return(
        <div className='input-centralize'>
            <label className='input-label' htmlFor={htmlFor}> {label} </label>
            <input className='input' name={name} type={type} {...register(name)} autoComplete="off" />
        </div>
    )
}

export default Input;