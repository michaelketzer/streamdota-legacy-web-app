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

const Auth = ({query}: {query: any}) => {
    const dispatch = useDispatch();
    console.log(process.browser, query);
    if(process.browser && query.code) {
        handleAuthRoutine(dispatch, query.code);
    }
    return <Loader />;
}

Auth.getInitialProps = ({query}) => {
    return {query}
}

export default wrapper.withRedux(Auth);
