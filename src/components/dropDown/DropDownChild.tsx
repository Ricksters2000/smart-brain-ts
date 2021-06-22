import React from 'react';

interface IDropDownProps {
    text: string,
    onClick: () => any,
}

const DropDownChild = ({text, onClick}: IDropDownProps) => {
    return(
        <div className='ph3 pv2 bb b--light-silver' >
            <p onClick={onClick}>{text}</p>
        </div>
    )
}

export default DropDownChild;