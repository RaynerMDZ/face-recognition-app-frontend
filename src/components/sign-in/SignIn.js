import React, {Component} from "react";
import './signIn.css';
import { URL } from "../../util/url";

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.url = URL;

        this.state = {
            email: '',
            password: ''
        };
    }


    onEmailChange = event => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = event => {
        this.setState({password: event.target.value});
    }

    onSubmitSignIn = () => {
        fetch(this.url + '/sign-in', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email.toLowerCase(),
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {

        const { onRouteChange } = this.props;

        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5  center">
                <main className={'pa4 black-80'}>
                    <div className={'measure'}>
                        <fieldset id={'sign_up" className="ba b--transparent ph0 mh0'}>
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>

                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email"
                                       name="email-address"
                                       id="email-address"
                                       onChange={this.onEmailChange}/>
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password"
                                       name="password"
                                       id="password"
                                       onChange={this.onPasswordChange} />
                            </div>
                        </fieldset>

                        <div className="center mt3">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   type="submit"
                                   value="Sign in"
                                   onClick={this.onSubmitSignIn} />
                        </div>

                        <div className="lh-copy mt3 center">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;
