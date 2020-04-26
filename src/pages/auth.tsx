import Router from 'next/router';
import { completeAuthRoutine } from '../api/authorization';
import Loader from '../components/Loader';

async function handleAuthRoutine(code: string): Promise<void> {
    const success = await completeAuthRoutine(code);

    Router.push(success ? '/dashboard' : '/');
}

const Auth = ({code}: {code: string}) => {
    if(process.browser && code) {
        handleAuthRoutine(code);
    }
    return <Loader />;
}

Auth.getInitialProps = ({query: {code}}) => {
    return {code}
}

export default Auth;