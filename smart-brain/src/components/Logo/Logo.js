import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png'



const Logo = () => {

	return (
		<div >
			<Tilt style={{ marginLeft: "20px", height: 100, width: 100 }} >
	 			<div className="Tilt-inner pa3">
	 				<img style ={{paddingTop: '5px', height: 100, width: 100}}alt = 'logo' src= {brain} />
	 			</div>
			</Tilt>
		</div>

	);
}

export default Logo;