import {Routes, Route} from 'react-router-dom'
import Home from './components/routers/home/home.component'
import Navigation from "./components/routers/navigation/navigation.component";
import Authentication from "./components/routers/authentication/authentication.component";
import Shop from "./components/routers/shop/shop.components";
import Checkout from "./components/routers/checkout/checkout.component";



const App = () => {
    return (<Routes>
        <Route path='/' element={<Navigation/>}>
            <Route index element={<Home/>}/>
            <Route path='shop' element={<Shop/>}/>
            <Route path='auth' element={<Authentication/>}/>
            <Route path='checkout' element={<Checkout/>}/>
        </Route>
    </Routes>)

}

export default App;