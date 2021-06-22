import React, {useState} from 'react';
import './UpdateInput.css';

interface IUpdateInput {
    text: string,
    name: string,
    placeholder: string | undefined,
    onChange: (evt: React.FormEvent<HTMLInputElement>) => void,
    disabled?: boolean
}

const UpdateInput = ({text, name, placeholder, onChange, disabled=false}: IUpdateInput) => {
    const [editOn, setEditOn] = useState<boolean>(false);
    
    return(
        <div className='hide-child input-container'>
            <p className='text'>{text}:</p>
            {
            disabled ? 
                <p style={{textAlign: 'left', margin: 0}}>{placeholder}</p>
            :
                <input className='input' type='text' placeholder={placeholder} name={name} onChange={onChange} />
            }
        </div>
    )
}

export default UpdateInput;