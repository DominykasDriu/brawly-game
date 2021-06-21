import React, { useContext } from 'react'
import { UserContext } from '../App';
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({children}) {
  const data = useContext(UserContext)
  // If user is not set redirect to leaderboard so that log outed user could not go to menu, arena ect.
  return (
    <Route render={() => data.user ? children : <Redirect to="/leaderboard"/> }/>
  );
}
