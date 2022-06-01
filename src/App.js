import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store-rtk/index.js'
import { fetchProducts } from './Store-rtk/product-slice.js'
import './App.css';
import Cart from './Components/Layout/Cart.js'
import Home from './Components/Layout/Home.js'
import Breadcrumb from './Components/Layout/Breadcrumb.js'
import Nav from './Components/Layout/Nav.js'
import Footer from './Components/Layout/Footer.js'

function App() {

  useEffect(() => {
    store.dispatch(fetchProducts())
  }, [])

  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <Nav />
          <Breadcrumb />
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
        </Router>
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
