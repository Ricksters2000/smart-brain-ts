import React, {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch, useThunkDispatch} from '../../../app/hooks';
import {setImageLink} from '../actions';
import {submitEntry} from '../../auth/actions';
import {fetchApi} from '../../../services/api';
import ImageDisplay from './ImageDisplay';
import Rank from './Rank';
import type {box} from './ImageDisplay';
import './ImageLinkForm.css';

type ImageUrl = [string, React.Dispatch<React.SetStateAction<string>>]
type Boxes = [box[], React.Dispatch<React.SetStateAction<box[]>>]

type ImageLinkFormState = {
    id: number,
    link: string,
    name: string | undefined,
    entries: number | undefined,
}

const ImageLinkForm = () => {
    const [imageUrl, setImageUrl]: ImageUrl = useState('');
    const [boxes, setBoxes]: Boxes = useState([{} as box]);
    const {id, link, name, entries} = useAppSelector<ImageLinkFormState>(state => ({id: state.auth.id, link: state.IMAGE_RECOGNITION.link, name: state.auth.user?.name, entries: state.auth.user?.entries}));
    const dispatch = useThunkDispatch();
    // const tDispatch = useThunkDispatch();

    useEffect(() => {
        return () => {
            // console.log('resetting link')
            dispatch(setImageLink(''));
        }
    },[]) //somehow using [] as a second argument executes lifecycle hook once for when it mounts and unmounts

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(setImageLink(imageUrl));

        fetchApi('post', `/imageurl`, {input: imageUrl})
            .then(res => {
                const data: any = res
                const regions = data.outputs[0].data.regions;
                let arr: box[] = [];
                
                for(let i=0; i < regions.length; i++) {
                    console.log(regions[i])
                    const boundingBox: any = regions[i].region_info.bounding_box;
                    console.log(boundingBox);
                    let b: box = {
                        topRow: boundingBox.top_row*100, 
                        rightCol: 100-boundingBox.right_col*100, 
                        bottomRow: 100-boundingBox.bottom_row*100, 
                        leftCol: boundingBox.left_col*100
                    };
                    arr.push(b)
                }
                setBoxes(arr);
                
                dispatch(submitEntry(id));
            }).catch(console.log);
    }

    return(
        <div>
            <Rank userName={name as string} userRank={entries as number} />
            <form className='form center' onSubmit={onFormSubmit}>
                <input className='f4 pa2 w-70 center' type='text' name='link' onChange={(e: React.FormEvent<HTMLInputElement>) => setImageUrl(e.currentTarget.value)} />
                <input className='grow f4 link ph3 pv2 dib white bg-light-purple' type='submit' />
            </form>
            <ImageDisplay link={link} boxes={boxes} />
        </div>
    )
}

export default ImageLinkForm;