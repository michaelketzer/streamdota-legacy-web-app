import Router from 'next/router';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { Dispatch, useEffect } from 'react';
import { authUser } from '../modules/reducer/User';
import { wrapper } from '../modules/Store';
import { useRouter } from "next/router";

async function handleAuthRoutine(dispatch: Dispatch<any>, code: string): Promise<void> {
    const success = (await dispatch(authUser(code))) as unknown as boolean;
    Router.push(success ? '/dashboard' : '/');
}

const Auth = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(router.query);
        if(process.browser && router.query.code) {
            handleAuthRoutine(dispatch, router.query.code as unknown as string);
        }
    }, [router]);
    
    return <Loader />;
}

export default wrapper.withRedux(Auth);
