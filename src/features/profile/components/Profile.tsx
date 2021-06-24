import React, {useState, useEffect} from 'react';
import {useThunkDispatch, useAppSelector} from '../../../app/hooks';
import { useParams } from 'react-router-dom';
import {getUser, setTempImage, updateUser} from '../actions';
import { authenticateUser } from '../../auth/actions';
import type {User} from '../../commonTypes';
import { API_URL } from '../../../services/api';
import { DEFAULT_PFP } from '../constants';
import UpdateInput from './UpdateInput';
import './Profile.css';

interface IProfileProps {
    appReady: boolean
}

interface IProfileParams {
    id: string | undefined
}

const Profile = ({appReady}: IProfileProps) => {
    const currentUserId: number = useAppSelector(state => state.auth.id);
    const [canEdit, setCanEdit] = useState<boolean>(true);
    const [initialUser, setInitialUser] = useState<User>({} as User);
    const [user, setUser] = useState<User>({} as User);
    const {id} = useParams<IProfileParams>();
    const dispatch = useThunkDispatch();

    const getId = (i: string | undefined): number => i ? parseInt(i) : -1;
    const getDate = (): string | undefined => {
        if(!user.joined)
            return;

        let date = new Date(user.joined)
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
    }
    
    useEffect(() => {
        if(!appReady || initialUser.email)
            return;
        const userId: number = getId(id);
        setCanEdit(currentUserId === userId);

        getUser(userId).then(u => {
            setInitialUser({...u})
            setUser({...u})
        });
    })

    useEffect(() => {
        return () => {
            setInitialUser({} as User);
            setUser({} as User);
        }
    },[])

    const onFormChange = (evt: React.FormEvent<HTMLInputElement>) => {
        console.log(evt.currentTarget.name);

        if(evt.currentTarget.name === 'image') {
            const e: any = evt;
            console.log(e.target.files)
            setUser({...user, image: e.target.files[0]})
        }
        else
            setUser({...user, [evt.currentTarget.name]: evt.currentTarget.value})
    }

    const onImageChange = (evt: any) => {
        const data = new FormData();
        data.append('image', evt.target.files[0]);
        setTempImage(data)
            .then(img => {
                setUser({...user, image: img ? img : initialUser.image});
            })
    }

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const userId = getId(id);
        const {age, pet, image} = user as typeof user & {age: number, pet: string, image: string};
        const data = new FormData();
        const target = evt.target as typeof evt.target & {
            age: {value: string},
            pet: {value: string},
            image: {files: any[]},
        }
        console.log(target.age.value, target.pet.value, target.image.files);
        
        data.append('age', target.age.value || age.toString());
        data.append('pet', target.pet.value || pet);
        data.append('image', target.image.files[0] || '');

        // data.append('age', age.toString());
        // data.append('pet', pet);
        // data.append('image', image);

        updateUser(userId, data)
            .then(resp => {
                console.log(resp);
                dispatch(authenticateUser({id: userId, user: {...user}}));
                setInitialUser({...user});
                // evt.currentTarget.reset();
            }).catch(console.log)
    }

    const onReset = () => {
        setUser({...initialUser})
    }

    return(
        <div className='background-profile'>
            <form className='main-profile' encType="multipart/form-data" onSubmit={onSubmit} onReset={onReset}>
                <div className='header-row'>
                    <div className="pa3 tc">
                        <div className="ba dib profile-pic hide-child" style={{backgroundImage: user.image && user.image.substr(user.image.lastIndexOf('/')+1) !== 'null' ? `url(${user.image})` : `url(${DEFAULT_PFP})`}}>
                            {canEdit && (
                                <>
                                <label className='child image-button pointer' htmlFor='getImage'>Edit</label>
                                <input className='image-select' type='file' id='getImage' name='image' onChange={onImageChange} /> 
                                </>
                            )}                                                        
                        </div>
                    </div>
                    <div style={{overflow: 'hidden'}}>
                        <h1>{user.name}</h1>
                        <div className='header-row' style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                            <p>Entries: {initialUser.entries}</p>
                            <p>Date Created: {getDate()}</p>
                        </div>
                    </div>
                </div>
                <UpdateInput text='Email' name='email' placeholder={initialUser.email} onChange={onFormChange} disabled />
                <UpdateInput text='Age' name='age' placeholder={user.age?.toString()} onChange={onFormChange} disabled={!canEdit} />
                <UpdateInput text='Pet' name='pet' placeholder={user.pet} onChange={onFormChange} disabled={!canEdit} />
                <div className='update-buttons'>
                    <input className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-red pointer" type='reset' />
                    <input type='submit' className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green pointer"/>
                </div>
            </form>
        </div>
    )
}

export default Profile;