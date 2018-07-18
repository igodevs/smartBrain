import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { 
	Dropdown, 
	DropdownToggle, 
	DropdownMenu, 
	DropdownItem 
} from 'reactstrap';


class ProfileIcon extends React.Component {

	constructor(props){
		super();
		this.state = {
			dropdownOpen: false
		}
	}

	toggle = () => {
	    this.setState(prevState => ({
	      dropdownOpen: !prevState.dropdownOpen
	    }));
	  }

	render(){
		return(
			<div className = "logos">
				<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
			        <DropdownToggle
			          tag=""
			          data-toggle=""
			          aria-expanded={this.state.dropdownOpen}
			        >
						  <img
						      src="http://tachyons.io/img/logo.jpg"
						      className="logos" alt="avatar" />
        			</DropdownToggle>
			        <DropdownMenu 
			        	right
			        	className = "dropdown-content" 
			        	style={{marginTop: '20px',  backgroundColor: 'rgba(255,255,255, 0.5)'}}>
			          <DropdownItem onClick = {this.props.toogleModal}>View Profile</DropdownItem>
			          <DropdownItem onClick = { () => {this.props.onRouteChange('signout'); window.sessionStorage.removeItem('token');} }>Sign Out</DropdownItem>
			        </DropdownMenu>
			      </Dropdown>
				
			</div>

		);
	}
}

export default ProfileIcon;