import React, {useState} from "react";
import './register.css';
import { URL } from "../../util/url";

const Register = ({ onRouteChange, loadUser }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onNameChange = event => {
        setName(event.target.value);
    }

    const onEmailChange = event => {
        setEmail(event.target.value);
    }

    const onPasswordChange = event => {
        setPassword(event.target.value);
    }

    const onSubmitRegister = async () => {

        try {
            const response = await fetch(URL + '/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: name.toLowerCase(),
                    email: email.toLowerCase(),
                    password: password
                })
            });

            const user = await response.json();

            if (user.id) {
                loadUser(user);
                onRouteChange('home');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5  center">
            <main className={'pa4 black-80'}>
                <div className={'measure'}>
                    <fieldset id={'register" className="ba b--transparent ph0 mh0'}>
                        <legend className="f1 fw6 ph0 mh0">Register</legend>

                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name" id={'name'}>Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="text"
                                   name="name"
                                   id="name"
                                   onChange={onNameChange}/>
                        </div>

                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address"
                                   id={'email-address'}>Email</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="email"
                                   name="email-address"
                                   id="email-address"
                                   onChange={onEmailChange}/>
                        </div>

                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="password"
                                   name="password"
                                   id="password"
                                   onChange={onPasswordChange}/>
                        </div>
                    </fieldset>

                    <div className="center mt3">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer"
                               type="submit"
                               value="Register"
                               onClick={onSubmitRegister}/>
                    </div>

                    <div className="lh-copy mt3 center">
                        <p onClick={() => onRouteChange('signIn')} className="f6 link dim black db pointer">Sign In</p>
                    </div>
                </div>
            </main>
        </article>
    );


}

export default Register;
