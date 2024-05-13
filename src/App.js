import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import AppRoutes from './main/AppRoutes';


export default class App extends React.Component {


  render(){
    return(
      <div>
        <Navbar/>
        <AppRoutes/>
      </div>
    )
  }


}
