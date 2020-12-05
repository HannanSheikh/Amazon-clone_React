import React,{useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment'
import { auth } from './firebase';
import { useStateValue } from './Stateprovider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders';

const promise = loadStripe('pk_test_51HgXsGBLHMLuKXqzlSq5T66Tj46VbWEjPa4XQ7o87tuwiRGqsucovbOO8iR4fddnkqq9TbIwLAk7QZwygcqOYv8600ZUKdPIQf')

function App() {
  const [{basket},dispatch] = useStateValue();
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
      
        <Switch>
          <Route path="/"exact={true}>
          <Header />
          <Home />
          </Route>
          <Route path="/checkout">
          <Header />
          <Checkout />
          </Route>
          <Route path="/signin">
          <Login />
          </Route>
          <Route path="/payment">
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
          </Route>
          <Route path="/Orders">
          <Header />
          <Orders />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
