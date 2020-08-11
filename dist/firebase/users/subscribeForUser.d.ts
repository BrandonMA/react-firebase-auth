import firebase from 'firebase/app';
import { MinimalExpectedDatabase } from '../../types/MinimalExpectedDatabase';
import { MinimalUserData } from '../../types';
import { Document } from '@bma98/firebase-db-manager';
export declare function subscribeForUser<T extends MinimalUserData, S>(database: MinimalExpectedDatabase<T, S>, id: string, onFetchDone?: (newDocument?: Document<T, S>) => void): firebase.Unsubscribe;
