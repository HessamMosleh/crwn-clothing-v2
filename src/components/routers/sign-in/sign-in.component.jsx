import {signInWithGooglePopup, createUserDocumentFromAuth} from "../../../utils/firebase/firebase.utils";
import './sign-in.styles.scss'

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }
    return (<div className='sign-in-container'>
        <div className='sign-in-section'>
            <h1>
                I already have an account
            </h1>
            <h2>
                Sign in with your email and password
            </h2>
            <div className="input-container">
                <input type="email" key="email" required/>
                <label htmlFor="email">Email</label>
            </div>
            <div className="input-container">
                <input type="password" key="password" required/>
                <label htmlFor="password">Password</label>
            </div>
            <button onClick={logGoogleUser}>
                Sign in with Google
            </button>
        </div>
    </div>)
}

export default SignIn;