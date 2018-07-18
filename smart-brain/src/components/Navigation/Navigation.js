import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';
import './Navigation.css'
import Logo from '../Logo/Logo.js'
import brain from '../Logo/brain.png'

const Navigation = ({onRouteChange, isSignedIn, toogleModal }) => {

		if(isSignedIn) {
			return (
				<div className = "header-signin">
					<Logo/>
					<nav >
						<ProfileIcon onRouteChange = {onRouteChange} toogleModal = {toogleModal} />
					</nav>
				</div>
			);
		} else {
			return(
			<header className = "header">
				<img className = "logo" alt = 'logo' src= {brain} />
				<div className = "user-nav">
					<div className = "signin">
						<p onClick = {() => onRouteChange('signin')} >Sign In</p>
					</div>
					<div className = "register">
						<p onClick = {() => onRouteChange('register')} >Register</p>
					</div> 
				</div>
			</header>
			);
		}

}

export default Navigation;