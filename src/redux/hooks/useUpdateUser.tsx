import { useDispatch } from 'react-redux';
import { MinimalExpectedReduxState } from '../types/MinimalExpectedReduxState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useCallback } from 'react';
import { UsersSlice } from '../slices/createUsersSlice';
import { MinimalUserData } from '../types/MinimalUser';
import { MinimalExpectedDatabase } from '../types/MinimalExpectedDatabase';
import { updateUser } from '../thunks/Users/updateUser';

export function useUpdateUser<T extends MinimalUserData, S>(
    database: MinimalExpectedDatabase<T, S>,
    usersSlice: UsersSlice
): (data: T) => Promise<void> {
    const dispatch = useDispatch<ThunkDispatch<Promise<void>, MinimalExpectedReduxState, Action>>();
    return useCallback(
        (data: T) => {
            return dispatch(updateUser(database, data, usersSlice));
        },
        [dispatch, database, usersSlice]
    );
}