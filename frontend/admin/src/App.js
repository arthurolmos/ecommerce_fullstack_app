import React from 'react'
import { 
  Container,
  Row,
  Col,
} from 'reactstrap'
import MainContainer from './components/layout/MainContainer'

import { AlertProvider } from './contexts/AlertContext'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/login/Login'

import AlertDefault from './components/alert/AlertDefault'
import Routes from './routes'
import Auth from './services/Auth'

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <AlertProvider>
            <AuthProvider>
                
              <AlertDefault />
              <Routes />

            </AuthProvider>
          </AlertProvider>
        </Switch>
      </Router>
    </>
  )
}

export default App;
