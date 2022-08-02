import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const parseJwt = (token) => {
	try {
		return JSON.parse(window.atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};

class AuthVerify extends Component {
	constructor(props) {
		super(props);

		window.history.listen(() => {
			const user = JSON.parse(localStorage.getItem('user'));

			if (user) {
				const decodedJwt = parseJwt(user.accessToken);

				if (decodedJwt.exp * 1000 < Date.now()) {
					props.logOut();
				}
			}
		});
	}

	render() {
		return <></>;
	}
}

export default withRouter(AuthVerify);