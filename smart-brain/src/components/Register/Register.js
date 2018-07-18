import React from 'react';
import './main.css'
class Register extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	} 

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	} 
	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	saveAuthTokejnInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data.userId && data.success === 'true'){
					this.saveAuthTokejnInSession(data.token);
			          fetch(`http://localhost:3000/profile/${data.userId}`, {
			            method: 'get',
			            headers: {
			              'Content-Type': 'application/json',
			              'Authorization': data.token
			            }
			          })
			          .then(resp => resp.json())
			          .then(user => {
			            if(user && user.email){
			              this.props.loadUser(user)
			              this.props.onRouteChange('home');
			            }
			          })
				}
			})
		// console.log(this.state)
		
	}

	render() {
		return (
		<div className="">
				<div className="container-register100">
					<div className="wrap-register100">


						<article className="register100-form ">
							<div className="register100-form-title">
								Register
							</div>
							<div className="wrap-input100 ">
								<input 
									onChange ={this.onNameChange}
									className="input100" type="text" id = "name" name="name" placeholder="Name" />
								<div className="focus-input100"></div>

							</div>
							<div className="wrap-input100 ">
								<input 
									onChange ={this.onEmailChange}
									className="input100" type="text" name="email" placeholder="Email" />
								<div className="focus-input100"></div>

							</div>

							<div className="wrap-input100 validate-input" >
								<input 
									onChange = {this.onPasswordChange}
									className="input100" type="password" placeholder="Password" />
								<span className="focus-input100"></span>
								
							</div>
							
							<div className="container-register100-form-btn">
								<button 
									onClick = { this.onSubmitSignIn }
									className="register100-form-btn">
									Register
								</button>
							</div>


						</article>
					</div>
				</div>
			</div>
	);
	}

}

export default Register;