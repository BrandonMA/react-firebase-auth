var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { AuthenticationStateProvider, UserDocumentProvider } from '../context';
import React from 'react';
import { Authenticate } from './Authenticate';
export function FirebaseAuthRoot(props) {
    return (React.createElement(AuthenticationStateProvider, null,
        React.createElement(UserDocumentProvider, null,
            React.createElement(Authenticate, __assign({}, props)))));
}
//# sourceMappingURL=FirebaseAuthRoot.js.map