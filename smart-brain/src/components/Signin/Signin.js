import React from 'react';
import login from '../images/img-01.png'
import './Signin.css';
import './main.css'
import './util.css'


class Signin extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	} 
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	saveAuthTokejnInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
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
		//console.log(this.state)
		
	}
	render(){
		const {onRouteChange} = this.props;
		return(
			<div className="">
				<div className="container-login100">
					<div className="wrap-login100">
						<div className="login100-pic " >
							<img src={login} alt="IMG" />
						</div>

						<article className="login100-form ">
							<div className="login100-form-title">
								Member Login
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
							
							<div className="container-login100-form-btn">
								<button 
									onClick = { this.onSubmitSignIn }
									className="login100-form-btn">
									Login
								</button>
							</div>

							<div className="text-center p-t-12">
								<span className="txt1">
									Forgot 
								</span>
								<a className="txt2" style = {{marginLeft: "5px"}}>
									Username / Password?
								</a>
							</div>

							<div className="text-center p-t-136">
								<a className="txt2" onClick= {() => onRouteChange('register')}>
									Create your Account
									
								</a>
							</div>
						</article>
					</div>
				</div>
			</div>
		);
	}
}

export default Signin;