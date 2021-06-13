import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProtectedRoute from './pages/ProtectedRoute';
import Header from './compoenents/Header'
import Arena from './pages/Arena'
import InventoryPage from './pages/InventoryPage'
import Leaderboard from './pages/Leaderboard'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Shop from './pages/Shop'
import Profile from './pages/Profile'
import Signup from './pages/Signup'

export const UserContext = React.createContext('')

function App() {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        <Header />
        <Switch>
          {/* Private routes for loged in users */}
          <ProtectedRoute path='/menu'>
            <Menu/>
          </ProtectedRoute>
          <ProtectedRoute path='/arena'>
            <Arena/>
          </ProtectedRoute>
          <ProtectedRoute path='/inventory'>
            <InventoryPage/>
          </ProtectedRoute>
          <ProtectedRoute path='/shop'>
            <Shop/>
          </ProtectedRoute>
          {/* Public routes */}
          <Route path='/leaderboard'>
            <Leaderboard/>
          </Route>
          <Route path='/profile/:name'>
            <Profile/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/signup'>
            <Signup/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
