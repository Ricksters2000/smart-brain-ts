import {Link} from 'react-router-dom';
import {useAppSelector, useThunkDispatch} from '../../app/hooks';
import {signoutUser, setToken} from '../auth/actions';
import ProfileIcon from '../profile/components/ProfileIcon';
import './Navigation.css';

interface INavigationProps {
    handleAuthRouteChange: (route: string) => void,
}

const Navigation = ({handleAuthRouteChange}: INavigationProps) => {
    const userId = useAppSelector(state => state.auth.id);
    const userImage = useAppSelector(state => state.auth.user?.image);
    const dispatch = useThunkDispatch();

    const onSignout = () => {
        setToken('');
        window.sessionStorage.removeItem('token');
        handleAuthRouteChange('signin');
        dispatch(signoutUser());
    }

    return(
        <nav className="flex justify-between bb b--white-10 bg-black">
            <Link to={userId === -1 ? '/' : '/home'} className="link white-70 hover-white no-underline flex items-center pa3 pointer">
                <svg
                className="dib h1 w1"
                data-icon="grid"
                viewBox="0 0 32 32"
                style={{fill: "currentcolor"}}>
                <title>Super Normal Icon Mark</title>
                <path d="M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z">
                </path>
                </svg>
            </Link>
            <div className="flex-grow pa3 flex items-center">
                {userId === -1 ? 
                    <Link to='/'>
                        <p 
                            className="f6 link dib white dim mr3 mr4-ns pointer" 
                            onClick={() => handleAuthRouteChange('signin')}>
                                Sign In
                        </p>
                        <p 
                            className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer" 
                            onClick={() => handleAuthRouteChange('signup')}>
                                Sign Up
                        </p>
                    </Link>
                    : <ProfileIcon userId={userId} userImage={userImage} onSignout={onSignout} />
                }
            </div>
        </nav>
    )
}

export default Navigation;