import React, { useContext } from 'react'
import { UserContext } from '../App';
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({children}) {
  const data = useContext(UserContext)

  return (
    <Route render={() => data.user ? children : <Redirect to="/leaderboard"/> }/>
  );
}
