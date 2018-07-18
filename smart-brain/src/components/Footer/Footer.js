import React from 'react';
import facebook from '../images/facebook-logo.png'
import twitter from '../images/twitter-logo.png'
import './Footer.css'

const Footer = () => {

	return(
		<footer className= 'footer'>
			<a target="_blank" rel="noopener noreferrer" href = "https://www.facebook.com/100000081282715" >
				<img src= {facebook} style={{witdth: "50x", height: "50px", marginRight: "1rem"}} href= "#" alt="IMG" /> 
			</a>
			<a target="_blank" rel="noopener noreferrer" href = "https://twitter.com/i_savko" >
				<img src= {twitter} style={{witdth: "50x", height: "50px"}} href= "#" alt="IMG" /> 
			</a>
		</footer>

	);
}

export default Footer;