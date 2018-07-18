import React from 'react';
import './Profile.css';

class Profile extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			name:this.props.user.name,
			age: this.props.user.age,
			pet: this.props.user.pet
		}
	}

	onFormChange = (event) => {
		switch(event.target.name){
			case 'user-name':
				this.setState({name: event.target.value})
				break;
			case 'user-age':
				this.setState({age: event.target.value})
				break;
			case 'user-pet':
				this.setState({pet: event.target.value})
				break;
			default:
				return;
		}
	}

	onProfileUpdate = (data) => {
		fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': window.sessionStorage.getItem('token')
			},
			body: JSON.stringify({ formInput:data })
		}).then(resp => {
			if(resp.status === 200 || resp.status === 304){
				this.props.toogleModal();
				this.props.loadUser({...this.props.user, ...data});
			} else {
				console.log('auch')
			}
		}).catch(console.log)
	}
	render(){
		const {user} = this.props;
		const {name, age, pet} = this.state;
		return (
			<div className = "profile-modal">
				<article className="article">
				<main className="main">
					<img
						src="http://tachyons.io/img/logo.jpg"
						className="image" alt="avatar" />
					<h1>{this.state.name}</h1>
					<h4>{`Images Submitted: ${user.entries}`}</h4>
					<p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
					<hr />
				    <label className="lab" htmlFor="user-name">Name:</label>
				    <input 
				    	onChange = {this.onFormChange}
					    className="input100" 
					    placeholder={user.name}
					    type="text" 
					    name="user-name"  
					    id="name" 
				    /> 
				    <label className="lab" htmlFor="user-age">Age:</label>
				    <input 
				   		onChange = {this.onFormChange}
					    className="input100" 
					    placeholder={user.age}
					    type="text" 
					    name="user-age"  
					    id="age" 
				    /> 
				    <label className="lab" htmlFor="user-pet">Pet:</label>
				    <input 
				    	onChange = {this.onFormChange}
					    className="input100" 
					    placeholder={user.pet}
					    type="text" 
					    name="user-pet"  
					    id="pet" 
				    /> 
				    <div className='' style={{display: 'flex', justifyContent: 'space-evenly'}}>
				    	<button 
				    		onClick = {() => this.onProfileUpdate({name, age, pet})}
				    		className = 'register100-form-btn' style= {{marginTop: "20px", marginRight: "2px", background: "blue"}}>
				    		Save
				    	</button>
				    	<button className = 'register100-form-btn' style= {{marginTop: "20px", marginLeft: "2px",background: "red"}} 
				    		onClick={this.props.toogleModal}>
				    		Cancel
				    	</button>
				    </div>
				</main>
				<div className='modal-close' onClick={this.props.toogleModal} >&times;</div>
			</article>
			</div>
		);
	}
	
}

export default Profile;