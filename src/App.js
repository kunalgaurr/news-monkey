import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Component } from 'react';

export default class App extends Component {
  c = 'Kunal';
  render() {
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <Route exact path='' element={<News key="general" country="in" category="general" />}/>
          
          <Routes>
            <Route
              exact
              path="/business"
              element={<News key="business" country="in" category="business" />}
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/newsapp"
              element={<News key="general" country="in" category="general" />}
            />
            <Route
              exact
              path="/health"
              element={<News key="health" country="in" category="health" />}
            />
            <Route
              exact
              path="/science"
              element={<News key="science" country="in" category="science" />}
            />
            <Route
              exact
              path="/sports"
              element={<News key="sports" country="in" category="sports" />}
            />
            <Route
              exact
              path="/technology"
              element={
                <News key="technology" country="in" category="technology" />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
