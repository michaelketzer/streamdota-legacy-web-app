import Router from 'next/router';
import { completeAuthRoutine } from '../api/authorization';

async function handleAuthRoutine(code: string): Promise<void> {
    const success = await completeAuthRoutine(code);

    Router.push(success ? '/dashboard' : '/');
}

const Auth = ({code}: {code: string}) => {
    console.log(code);
    if(process.browser && code) {
        handleAuthRoutine(code);
    }
    return <>Loading</>;
}

Auth.getInitialProps = ({query: {code}}) => {
    return {code}
}

export default Auth;