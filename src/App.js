import {Route, Routes} from 'react-router-dom'
import Home from './components/routers/home/home.component'
import Navigation from "./components/routers/navigation/navigation.component";
import Authentication from "./components/routers/authentication/authentication.component";
import Shop from "./components/routers/shop/shop.components";
import Checkout from "./components/routers/checkout/checkout.component";
import {useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";


const App = () => {
    const dispatch = useDispatch();
    //USER LOGIN STATE LISTENER
    useEffect(()=>{
        const unsubscribe = onAuthStateChangeListener(async (user)=>{
            if(user){
                await createUserDocumentFromAuth(user)
            }
            dispatch(setCurrentUser(user))
        })
        return unsubscribe;
    },[])

    return (<Routes>
        <Route path='/' element={<Navigation/>}>
            <Route index element={<Home/>}/>
            <Route path='shop/*' element={<Shop/>}/>
            <Route path='auth' element={<Authentication/>}/>
            <Route path='checkout' element={<Checkout/>}/>
        </Route>
    </Routes>)

}

export default App;