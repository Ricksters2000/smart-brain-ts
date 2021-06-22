import React from 'react';
import './ImageDisplay.css';

export type box = {topRow: number, rightCol: number, bottomRow: number, leftCol: number};

interface IImageDisplayProps {
    link: string,
    boxes: box[]
}

const ImageDisplay = ({link, boxes}: IImageDisplayProps) => {
    return(
      <div className='center ma'>
        <div className='absolute mt2' style={{width: '25%', marginLeft: '35%'}}>
          <img alt='' src={link} width='100%' height='auto'/>
          {boxes.map((box,i) => {
            return <div key={i} className='bounding-box' style={{top: `${box.topRow}%`, right: `${box.rightCol}%`, bottom: `${box.bottomRow}%`, left: `${box.leftCol}%`}}></div>
          })}
        </div>
      </div>
    )
}

export default ImageDisplay;