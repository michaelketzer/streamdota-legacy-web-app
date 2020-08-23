import Router from 'next/router';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'react';
import { authUser } from '../modules/reducer/User';
import { wrapper } from '../modules/Store';

async function handleAuthRoutine(dispatch: Dispatch<any>, code: string): Promise<void> {
    const success = (await dispatch(authUser(code))) as unknown as boolean;
    Router.push(success ? '/dashboard' : '/');
}

const Auth = ({code}: {code: string}) => {
    const dispatch = useDispatch();
    if(process.browser && code) {
        handleAuthRoutine(dispatch, code);
    }
    return <Loader />;
}

Auth.getInitialProps = ({query: {code}}) => {
    return {code}
}

export default wrapper.withRedux(Auth);