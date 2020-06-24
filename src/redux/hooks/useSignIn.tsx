import { useDispatch } from 'react-redux';
import { signIn } from '../thunks';
import { useCallback } from 'react';

export function useSignIn(email: string, password: string): () => Promise<void> {
    const dispatch = useDispatch();
    return useCallback(async () => {
        await dispatch(
            signIn({
                email,
                password
            })
        );
    }, [email, password, dispatch]);
}