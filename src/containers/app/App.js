import React, { Component } from "react";
import 'tachyons';
import './App.css';
import Navigation from "../../components/navigation/Navigation";
import Logo from "../../components/logo/Logo";
import ImageLinkForm from "../../components/imageLinkForm/imageLinkForm";
import FaceRecognition from "../../components/faceRecognition/FaceRecognition";
import Rank from "../../components/rank/Rank";
import SignIn from "../../components/sign-in/SignIn";
import Register from "../../components/register/Register";
import { URL } from '../../util/url.js';

const testImage = 'https://eyeandfaceclinic.ie/wp-content/uploads/2018/01/beautiful-face-clear-skin.jpg';

const initialState = {
    imageUrl: '',
    box: {},
    route: 'signIn',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
    }
}

class App extends Component {

    constructor(props) {
        super(props);

        this.url = URL;

        this.state = initialState;
    }

    calculateFaceLocation = (data) => {
        const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);

        const box = {
            leftColumn: faceBox.left_col * width,
            topRow: faceBox.top_row * height,
            rightColumn: width - (faceBox.right_col * width),
            bottomRow: height - (faceBox.bottom_row * height)
        }
        this.setState({box: box})
    }

    onInputChange = (event) => {
        this.setState({ imageUrl: event.target.value })
    }

    onPictureSubmit = () => {
        fetch(this.url + '/imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.imageUrl
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch(this.url + '/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            const user = {...this.state.user, entries: count}
                            this.setState({user: user});
                        })
                        .catch(err => console.log(err))

                    this.calculateFaceLocation(response);
                }
            })
            .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route === 'signOut') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({route: route})
    }

    loadUser = data => {
        this.setState({user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }})
    }

    render() {

        const { isSignedIn, imageUrl, route, box } = this.state;

        return (
            <div className={'App'}>
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
                {
                    route === 'home'
                        ?
                        <div>
                            <Logo/>
                            <Rank name={this.state.user.name} entries={this.state.user.entries} />
                            <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
                            <FaceRecognition imageUrl={imageUrl} box={box} />}
                        </div>
                        :
                        route === 'signIn'
                            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                }
            </div>
        );
    }
}

export default App;
