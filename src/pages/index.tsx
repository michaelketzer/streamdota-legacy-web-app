import Router from 'next/router';
import Loader from '../components/Loader';

const Index = () => {
    if(process.browser) {
        if(localStorage.getItem('jwt')) {
            Router.push('/dashboard');
        } else {
            location.href = `${process.env.API_URL}/auth/twitch`;
        }
    }
    return <Loader />;
}

export default Index;