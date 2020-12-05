import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase'
import { Link,useHistory } from 'react-router-dom';
function Login() {
    const history = useHistory();
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const login = e =>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password).then((auth)=>{
                history.push('/')
        }).catch(error=>{alert(error.message)})
    }

    const register = e =>{
        
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,password).then((auth)=>{
            //it successfully created a new user with email and password
            console.log(auth)
            if(auth){
                history.push('/')
            }
        }).catch(error=>{alert(error.message)})
    }
    return (
        <div className="login">
            <Link to="/">
            <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
             alt="login_logo" />
             </Link>
             <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e=>setemail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e=>setpassword(e.target.value)} />

                    <button type='submit' className='login__signInButton' onClick={login}>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button className='login__registerButton' onClick={register}>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
