import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';

import React, { Component } from 'react';

export default class App extends Component {
  c = 'Kunal';
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <News pageSize={8} country={'in'} category={'sports'}></News>
      </div>
    );
  }
}
