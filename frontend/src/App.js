import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import axios from 'axios';
import dotenv from 'dotenv';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import AboutScreen from './screens/AboutScreen';

const HealthRoute = () => null;

dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_URL_SERVER;

const App = () => {
    return(
        <Router>
            <Route path="/health" component={HealthRoute} />
            <Route
                render={({ location }) => (
                    <>
                        {location.pathname !== '/health' && <Header />}
                        <main className='py-3'>
                            <Container>
                                <Route path='/' component={HomeScreen} exact />
                                <Route path='/book/:id' component={BookScreen} />
                                <Route path='/about' component={AboutScreen} />
                            </Container>
                        </main>
                        {location.pathname !== '/health' && <Footer />}
                    </>
                )}
            />
        </Router>
    );
}
export default App;