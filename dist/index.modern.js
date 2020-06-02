import { auth, initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import 'firebase/auth';
import { useSelector } from 'react-redux';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

var signIn = createAsyncThunk('authentication/signIn', function (user) {
  try {
    return Promise.resolve(auth().signInWithEmailAndPassword(user.email, user.password)).then(function (userCredential) {
      return {
        firebaseUser: userCredential.user,
        loading: false
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
});

var signOut = createAsyncThunk('authentication/signOut', function () {
  try {
    return Promise.resolve(auth().signOut()).then(function () {
      return {
        firebaseUser: undefined,
        loading: false
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
});

var signUp = createAsyncThunk('authentication/signUp', function (user) {
  try {
    return Promise.resolve(auth().createUserWithEmailAndPassword(user.email, user.password)).then(function (userCredential) {
      return {
        firebaseUser: userCredential.user,
        loading: false
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
});

var initialState = Object.freeze({
  firebaseUser: undefined,
  loading: true
});
function createAuthenticationSlice(reducers, _extraReducers) {
  return createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: _extends({
      setFirebaseUser: function setFirebaseUser(state, action) {
        state.firebaseUser = action.payload;
      },
      setLoadingFirebaseData: function setLoadingFirebaseData(state, action) {
        state.loading = action.payload;
      }
    }, reducers),
    extraReducers: function extraReducers(builder) {
      var replaceAuthenticationState = function replaceAuthenticationState(state, action) {
      };

      builder.addCase(signIn.fulfilled, replaceAuthenticationState);
      builder.addCase(signOut.fulfilled, replaceAuthenticationState);
      builder.addCase(signUp.fulfilled, replaceAuthenticationState);

      if (_extraReducers != null) {
        var keys = Object.keys(_extraReducers);

        if (keys.length > 0) {
          for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
            var reducerKey = _step.value;
            var data = _extraReducers[reducerKey];
            builder.addCase(data.fullfilled, data.callback);
          }
        }
      }
    }
  });
}

var authSlice = createAuthenticationSlice();
authSlice.actions.setLoadingFirebaseData(false);
function Firebase(props) {
  var _useState = useState(false),
      firebaseReady = _useState[0],
      setFirebaseReady = _useState[1];

  var firebaseConfig = props.firebaseConfig;
  useEffect(function () {
    initializeApp(firebaseConfig);
    setFirebaseReady(true);
  }, [firebaseConfig]);
  return firebaseReady ? props.children : props.loadingComponent;
}

function isAuthenticationState(value) {
  var castedValue = value;
  return castedValue.loading != null;
}

function isMinimalExpectedReduxState(value) {
  var castedValue = value;
  return castedValue.authentication != null && isAuthenticationState(castedValue.authentication) && castedValue.users != null;
}

var getState = function getState(state) {
  if (isMinimalExpectedReduxState(state)) {
    return state.authentication;
  } else {
    throw Error('State does not have the expected shape');
  }
};

var useAuthenticationState = function useAuthenticationState() {
  return useSelector(getState);
};

function isUsersState(value) {
  var casted = value;
  return casted.values != null;
}

function getUsers(state) {
  if (isMinimalExpectedReduxState(state) && isUsersState(state.users)) {
    return state.users;
  } else {
    throw Error('State does not have the expected shape');
  }
}

function useCurrentUser() {
  var authState = useAuthenticationState();
  var users = useSelector(getUsers);

  if (authState.firebaseUser != null) {
    return users.values.get(authState.firebaseUser.uid);
  } else {
    return null;
  }
}

function Authenticate(props) {
  var authenticationState = useAuthenticationState();
  var currentUser = useCurrentUser();

  if (authenticationState.firebaseUser === undefined && authenticationState.loading) {
    return props.loadingComponent;
  } else if (authenticationState.firebaseUser === null && authenticationState.loading === false) {
    return props.authenticationComponent;
  } else {
    if (currentUser == null) {
      return props.userNotAvailableComponent;
    } else {
      return props.children;
    }
  }
}

var initialState$1 = Object.freeze({
  values: new Map()
});
function createUsersSlice(reducers, _extraReducers) {
  return createSlice({
    name: 'users',
    initialState: initialState$1,
    reducers: _extends({
      setUser: function setUser(state, action) {
        state.values.set(action.payload.id, action.payload);
      }
    }, reducers),
    extraReducers: function extraReducers(builder) {
      if (_extraReducers != null) {
        var keys = Object.keys(_extraReducers);

        if (keys.length > 0) {
          for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
            var reducerKey = _step.value;
            var data = _extraReducers[reducerKey];
            builder.addCase(data.fullfilled, data.callback);
          }
        }
      }
    }
  });
}

export { Authenticate, Firebase, createAuthenticationSlice, createUsersSlice, isAuthenticationState, isMinimalExpectedReduxState, isUsersState, signIn, signOut, signUp, useAuthenticationState, useCurrentUser };
//# sourceMappingURL=index.modern.js.map
