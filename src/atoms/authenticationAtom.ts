import { atom } from 'recoil';
import { AuthenticationState, createAuthenticationState } from '../types';

export const authenticationAtom = atom<AuthenticationState>({
    key: 'authenticationAtom',
    default: createAuthenticationState(),
    dangerouslyAllowMutability: true // Objects that are already working with deep freeze, crash without this.
});
