import { useEffect } from "react";
import Router from "next/router";
import Loader from "../components/Loader";

export default function Index() {
    useEffect(() => {
        Router.push('/login');
    }, []);
    
    return <Loader />;
}