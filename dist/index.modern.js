import{useState as e,useEffect as n}from"react";import{atom as r,selector as t,useRecoilState as o,useSetRecoilState as i,useRecoilValue as u}from"recoil";import s from"immer";import{auth as c,initializeApp as a}from"firebase/app";import"firebase/auth";function l(e){return s({firebaseUser:void 0,loading:!0},function(n){Object.assign(n,e)})}function f(e){return null!=e.loading}function m(e){return null!=e.email}function d(e){return null!=e.collections.users}var g=r({key:"authenticationAtom",default:l()}),b=r({key:"usersAtom",default:new Map}),h=t({key:"currentUserSelector",get:function(e){var n=e.get,r=n(g),t=n(b);if(null!=r.firebaseUser)return t.get(r.firebaseUser.uid)}});function p(e){return c().onAuthStateChanged(function(n){e(l({firebaseUser:n,loading:!1}))},function(e){alert(e.message)})}function v(e,n,r){return e.collections.users.subscribeToDocument(n,function(e){r&&r(e)},function(e){alert(e.message)},function(){r&&r()})}function P(r){var t=o(g),s=t[0],c=t[1],a=i(b),l=u(h),f=e(!0),m=f[0],d=f[1],P=r.database;return n(function(){var e=p(function(e){c(e)});return function(){e()}},[c]),n(function(){var e;return null!=s.firebaseUser&&(e=v(P,s.firebaseUser.uid,function(e){null!=e&&a(function(n){return n.set(e.id(),e)}),d(!1)})),function(){e&&e()}},[s,P,a]),void 0===s.firebaseUser&&s.loading?r.loadingComponent:null===s.firebaseUser&&!1===s.loading?r.authenticationComponent:m&&null==l?r.loadingComponent:null==l?r.userNotAvailableComponent:r.children}function U(r){var t=e(!1),o=t[0],i=t[1],u=r.firebaseConfig;return n(function(){a(u),i(!0)},[u]),o?r.children:r.loadingComponent}var y=function(e,n){try{return Promise.resolve(c().signInWithEmailAndPassword(e,n)).then(function(e){return l({firebaseUser:e.user,loading:!1})})}catch(e){return Promise.reject(e)}},C=function(){try{return Promise.resolve(c().signOut()).then(function(){return l({loading:!1})})}catch(e){return Promise.reject(e)}},j=function(e,n){try{return Promise.resolve(c().createUserWithEmailAndPassword(e,n)).then(function(e){return l({firebaseUser:e.user,loading:!1})})}catch(e){return Promise.reject(e)}},A=function(e,n){try{return Promise.resolve(e.collections.users.createDocument(n))}catch(e){return Promise.reject(e)}},k=function(e,n){try{return Promise.resolve(e.collections.users.updateDocument(n))}catch(e){return Promise.reject(e)}};export{P as Authenticate,U as FirebaseInit,g as authenticationAtom,l as createAuthenticationState,A as createUser,h as currentUserSelector,f as isAuthenticationState,d as isMinimalExpectedDatabase,m as isMinimalUserData,y as signIn,C as signOut,j as signUp,p as subscribeForAuthenticatedUser,v as subscribeForUser,k as updateUser,b as usersAtom};
//# sourceMappingURL=index.modern.js.map
