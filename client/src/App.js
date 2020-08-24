import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
    return (
        <Router>
            <Fragment className='App'>
                <Navbar />
                <Route exact path='/' component={Landing} />
                <section className='container'>
                    <Switch>
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                    </Switch>
                </section>
            </Fragment>
        </Router>
    );
}

export default App;
