import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const isAuthenticated = localStorage.getItem('user') ? true : false;
	const [auth, setAuth] = useState({
		token: null,
		user: null,
	});

	const login = (token, user) => {
		setAuth({ token, user });
		localStorage.setItem('user', JSON.stringify(user));
	};

	const logout = () => {
		setAuth({ token: null, user: null });
		localStorage.removeItem('user');
	};

	return (
		<AuthContext.Provider value={{ auth, login, logout, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);