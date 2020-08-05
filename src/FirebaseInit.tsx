import * as firebase from 'firebase/app';
import { useState, useEffect } from 'react';

interface Config {
    [key: string]: string;
}

interface Props {
    children: JSX.Element;
    firebaseConfig: Config;
    loadingComponent: JSX.Element;
}

export function FirebaseInit(props: Props): JSX.Element {
    const [firebaseReady, setFirebaseReady] = useState(false);
    const { firebaseConfig } = props;

    useEffect(() => {
        firebase.initializeApp(firebaseConfig);
        setFirebaseReady(true);
    }, [firebaseConfig]);

    return firebaseReady ? props.children : props.loadingComponent;
}