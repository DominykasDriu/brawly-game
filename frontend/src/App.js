import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Arena from './pages/Arena'
import InventoryPage from './pages/InventoryPage'
import Leaderboard from './pages/Leaderboard'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Shop from './pages/Shop'
import Profile from './pages/Profile'
import Signup from './pages/Signup'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/menu'>
          <Menu/>
        </Route>
        <Route path='/arena'>
          <Arena/>
        </Route>
        <Route path='/inventory'>
          <InventoryPage/>
        </Route>
        <Route path='/leaderboard'>
          <Leaderboard/>
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/signup'>
          <Signup/>
        </Route>
        <Route path='/shop'>
          <Shop/>
        </Route>
        <Route path='/profile/:name'>
          <Profile/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
