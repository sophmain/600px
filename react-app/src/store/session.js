// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USER = "session/GET_USER"
const GET_ALLUSERS = "session/GET_ALLUSERS"
const EDIT_USERCOVER = "session/EDIT_USER"
const EDIT_USERINFO = "session/EDIT_USERINFO"
const EDIT_USERPROFILE = "session/EDIT_USERPROFILE"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});
const getUser = (user) => ({
	type: GET_USER,
	user
})
const getAllUser = (users) => ({
	type: GET_ALLUSERS,
	users
})
export const editUserCover = (coverPhoto) => ({
	type: EDIT_USERCOVER,
	coverPhoto
})
export const editProfilePhoto = (profilePhoto) => ({
	type: EDIT_USERPROFILE,
	profilePhoto
})
const actionEditUserInfo = (user) => ({
	type: EDIT_USERINFO,
	user
})


export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (firstName, lastName, email, username, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			firstName,
			lastName,
			email,
			username,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const thunkGetUser = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}`)

	if (response.ok) {
		const user = await response.json()
		dispatch(getUser(user))
		return user
	}
}

export const thunkGetAllUser = () => async (dispatch) => {
	const response = await fetch(`/api/users/`)
	console.log('RESPONSE FROM THUNK', response)
	if (response.ok) {
		const users = await response.json()
		dispatch(getAllUser(users.users))
		return users
	}
}
export const thunkEditUser = (user, userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/edit`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })

    if (response.ok) {
        const user = await response.json()
        dispatch(actionEditUserInfo(user))
        return user;

    } else if (response.status < 500) {
        const user = await response.json()
        if (user.errors) {
            return user.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}

const normalize = (arr) => {
    const resObj = {}
    arr.forEach((ele) => { resObj[ele.id] = ele })
    return resObj
}

const initialState = { user: null };

export default function reducer(state = initialState, action) {
	let newState
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case GET_USER:
			newState = { ...state }
			newState.singleUser = action.user
			return newState
		case GET_ALLUSERS:
			newState = { ...state }
			newState.allUsers = normalize(action.users)
			return newState
		case EDIT_USERCOVER:
			newState = { ...state }
			newState.user = { ...newState.user, cover_photo_url: action.coverPhoto }
			return newState
		case EDIT_USERINFO:
			newState = { ...state }
			newState.user = { ...newState.user, ...action.user }
			return newState
		case EDIT_USERPROFILE:
			newState = { ...state }
			newState.user = { ...newState.user, prof_photo_url: action.profilePhoto }
			return newState
		default:
			return state;
	}
}
