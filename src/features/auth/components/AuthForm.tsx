import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useAppSelector, useThunkDispatch} from '../../../app/hooks';
import ErrorMessage from '../../../components/error/ErrorMessage';
import { User } from '../../commonTypes';
import {registerUser, signinUser, getUser, setToken, authenticateFailed} from '../actions';

export type UserForm = {
    name: string | null,
    email: string,
    password: string
}

interface IAuthProps {
    isSignup: boolean,
    handleRouteChange: () => void,
}

const AuthForm = ({isSignup, handleRouteChange}: IAuthProps) => {
    const [userForm, setUserForm] = useState({} as UserForm);
    const userId: number = useAppSelector(state => state.auth.id);
    const user: User | undefined = useAppSelector(state => state.auth.user);
    const err: string | undefined = useAppSelector(state => state.auth.err);

    const dispatch = useThunkDispatch();

    const onCloseErr = () => {
        dispatch(authenticateFailed(''));
    }

    const handleOnSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        // console.log('submitting form')

        if(isSignup)
            dispatch(registerUser(userForm))
        else
            dispatch(signinUser(userForm));
    }

    const handleOnInputChange = (evt: React.FormEvent<HTMLInputElement>): void => {
        switch(evt.currentTarget.name) {
            case 'name':
                setUserForm({...userForm, name: evt.currentTarget.value});
                break;
            case 'email-address':
                setUserForm({...userForm, email: evt.currentTarget.value});
                break;
            case 'password':
                setUserForm({...userForm, password: evt.currentTarget.value});
                break;
        }
    }

    return (
        <main className="pa4 black-80">
            {err && (<ErrorMessage msg={err} closeErr={onCloseErr} />)}
            <form className="ba bw1 b--purple measure center" onSubmit={handleOnSubmit}>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">{isSignup ? 'Sign Up' : 'Sign In'}</legend>
                    {isSignup && (
                        <>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    style={{width: '-webkit-fill-available'}} 
                                    type="input" name="name"  id="name" 
                                    onChange={handleOnInputChange}
                                />
                            </div>
                        </>
                    )}
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address"  id="email-address" 
                            onChange={handleOnInputChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"  id="password" 
                            onChange={handleOnInputChange}
                        />
                    </div>
                </fieldset>
                <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value={isSignup ? 'Sign Up' : 'Sign In'} />
                </div>
                <div className="lh-copy mt3">
                    <p className="f6 link dim black db pointer" onClick={() => handleRouteChange()}>{isSignup ? 'Sign In' : 'Sign Up'}</p>
                </div>
                {userId && userId !== -1 && user && user.email ? <Redirect to='/home' /> : ''}
            </form>
        </main>
    )
}

export default AuthForm;