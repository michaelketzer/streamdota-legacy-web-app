import Router from 'next/router';
import Loader from '../components/Loader';

const Login = () => {
    if(process.browser) {
        if(localStorage.getItem('jwt')) {
            Router.push('/dashboard');
        } else {
            location.href = `${process.env.API_URL}/auth/twitch`;
        }
    }
    return <Loader />;
}

export default Login;