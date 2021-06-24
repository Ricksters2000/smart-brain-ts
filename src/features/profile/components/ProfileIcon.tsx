import React from 'react';
import {Link} from 'react-router-dom';
import DropDownList from '../../../components/dropDown/DropDownList';
import DropDownChild from '../../../components/dropDown/DropDownChild';
import { API_URL } from '../../../services/api';
import { DEFAULT_PFP } from '../constants';

interface IProfileIconProps {
    userId: number,
    userImage: string | undefined,
    onSignout: () => void
}

const ProfileIcon = ({userId, userImage, onSignout}: IProfileIconProps) => {
    return(
        <div className='pointer' style={{position: 'relative'}}>
            <DropDownList image={userImage && userImage.substr(userImage.lastIndexOf('/')+1) !== 'null' ? userImage : DEFAULT_PFP}>
                <Link to={`/profile/${userId}`}>
                    <DropDownChild text='Profile' onClick={()=>{}} />
                </Link>
                <Link to='/'>
                    <DropDownChild text='Sign Out' onClick={onSignout} />
                </Link>
            </DropDownList>
        </div>
    )
}

export default ProfileIcon;