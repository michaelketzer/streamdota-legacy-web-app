import Router from 'next/router';
import { startAuthRoutine } from '../api/authorization';

export default function Index() {
    if(process.browser) {
        if(localStorage.getItem('jwt')) {
            Router.push('/dashboard');
        } else {
            startAuthRoutine();
        }
    }
    return <>Loading</>;
}