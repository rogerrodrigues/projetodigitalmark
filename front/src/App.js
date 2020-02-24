import React, { Component } from 'react';
import './styles';
import Routes from './routes';
import GlobalStyle from './styles/global'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  
  render() {
    return (
      <>
        <Routes />
        <GlobalStyle />
        <ToastContainer />
      </>
    );
  }

}

export default App;
