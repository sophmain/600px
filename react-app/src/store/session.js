// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USER = "session/GET_USER"
const GET_ALLUSERS = "session/GET_ALLUSERS"
const EDIT_USER = "session/EDIT_USER"

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
export const editUser = (coverPhoto) => ({
	type: EDIT_USER,
	coverPhoto
})

const initialState = { user: null };

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

const normalize = (arr) => {
    const resObj = {}
    arr.forEach((ele) => { resObj[ele.id] = ele })
    return resObj
}
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
		case EDIT_USER:
			console.log('state.coverphoto', action.coverPhoto)
			newState = { ...state }
			// newState.user.cover_photo_url = action.coverPhoto
			newState.user = { ...newState.user, cover_photo_url: action.coverPhoto }
			return newState
		default:
			return state;
	}
}
