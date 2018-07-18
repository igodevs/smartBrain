import React, { Component } from 'react';

import Navigation from './components/Navigation/Navigation.js';
//import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Signin from './components/Signin/Signin.js'
import Register from './components/Register/Register.js'
import Modal from './components/Modal/Modal'
import Profile from './components/Profile/Profile'
import Footer from './components/Footer/Footer'
import './App.css';

const initState = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      isProfileOpen: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
        age: 0,
        pet: ''
      }
}

class App extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  componentDidMount(){
    const token = window.sessionStorage.getItem('token');
    if(token){
      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if(data && data.id) {
          fetch(`http://localhost:3000/profile/${data.id}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(resp => resp.json())
          .then(user => {
            if(user && user.email){
              console.log(user)
              this.loadUser(user)
              this.onRouteChange('home');
            }
          })
        }
      })
      .catch(console.log)
    }
  }


  loadUser =(data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        age: data.age,
        pet: data.pet
    }})
  }

  calculateFaceLocations = (data) => {
    if(data && data.outputs){
      const image = document.getElementById('inputimage')
      const width = Number(image.width);
      const height = Number(image.height);
      return data.outputs[0].data.regions.map(face => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      });
    }
    return;
  }

  displayFaceBoxes = (boxes) => {
    if(boxes){
      this.setState({boxes: boxes});
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    if(this.state.input === ''){
      return null
    }
    this.setState({imageUrl: this.state.input})
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then((response) => {
        if(response){
          fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
              },
              body: JSON.stringify({
                id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
        }
        this.displayFaceBoxes(this.calculateFaceLocations(response))
      })
      .catch(err => console.log(err));
    
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      return this.setState(initState);
    } else if(route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  toogleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }


  render() {
    const {isSignedIn, imageUrl, route, boxes, isProfileOpen, user } = this.state;
    return (
      <div className="container">
        <Navigation isSignedIn= {isSignedIn} onRouteChange = {this.onRouteChange}
          toogleModal = {this.toogleModal}
        />
        { isProfileOpen &&
          <Modal>
            <Profile 
              isProfileOpen= {isProfileOpen} 
              toogleModal={this.toogleModal}
              loadUser = {this.loadUser}
              user= {user}
              />
          </Modal> 
        }
        { route === 'home'
          ? <div>
              <Rank 
                name = {this.state.user.name} 
                entries = {this.state.user.entries}
                pet = {this.state.user.pet}
                />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit = {this.onButtonSubmit}
              />
              <FaceRecognition boxes= {boxes} imageUrl = {imageUrl}/>
            </div>
            : (
                route === 'signin' 
                  ? <Signin  loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
                  : <Register loadUser ={this.loadUser} onRouteChange = {this.onRouteChange} />
              )
             

        }
        <Footer />
        
      </div>
    );
  }
}

export default App;
