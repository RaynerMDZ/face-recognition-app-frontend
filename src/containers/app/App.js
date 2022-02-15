import React, {useState} from "react";
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

const App = () => {

    const [imageUrl, setImageUrl] = useState('');
    const [box, setBox] = useState({});
    const [route, setRoute] = useState('signIn');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState({id: '', name: '', email: '', entries: '', joined: ''});

    const calculateFaceLocation = (data) => {
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
        setBox(box);
    }

    const onInputChange = (event) => {
        setImageUrl(event.target.value);
    }

    const onDetectImage = async () => {
        try {
            const response = await fetch(URL + '/imageUrl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: imageUrl
                })
            });

            console.log(response);
            const coordinates = await response.json();
            console.log(coordinates);

            if (coordinates.outputs[0].data.regions[0].region_info.bounding_box) {
                const response = await fetch(URL + '/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: user.id
                    })
                });
                const count = await response.json();
                const updatedUser = {...user, entries: count};
                setUser(updatedUser);

                calculateFaceLocation(coordinates);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const onRouteChange = (route) => {
        if (route === 'signOut') {
            clearData();
        } else if (route === 'home') {
            setIsSignedIn(true);
        }
        setRoute(route);
    }

    const loadUser = data => {
        const newUser = {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }
        setUser(newUser);
    }

    const clearData = () => {
        setUser({id: '', name: '', email: '', entries: '', joined: ''});
        setBox({});
        setRoute('');
        setIsSignedIn(false);
        setImageUrl('');
    }

    return (
        <div className={'App'}>
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
            {
                route === 'home'
                    ?
                    <div>
                        <Logo/>
                        <Rank name={user.name} entries={user.entries}/>
                        <ImageLinkForm onInputChange={onInputChange} onPictureSubmit={onDetectImage}/>
                        <FaceRecognition imageUrl={imageUrl} box={box}/>}
                    </div>
                    :
                    route === 'signIn'
                        ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
                        : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
            }
        </div>
    )
}

export default App;
