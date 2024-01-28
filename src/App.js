import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Footer from './screens/Footer';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import Navbar from './components/Navbar';
import { useState } from 'react';
import MyOrders from './screens/MyOrders';

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  return (
    <CartProvider>
      <Router>
        <div>
          <Navbar loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
          <Routes>
            <Route exact path='/' element={<Main loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>} />
            <Route exact path='/myOrders' element={<MyOrders />} />
            <Route exact path='/login' element={<Login setLoginStatus={setLoginStatus}/>} />
            <Route exact path='/signup' element={<Signup />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
