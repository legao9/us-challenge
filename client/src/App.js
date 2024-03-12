import { Route, Routes } from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./App.css";
import CreateChallenge from "./pages/CreateChallenge/CreateChallenge";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";

import Dashboard from "./pages/Dashboard/Dashboard";
import Product from "./pages/Products/Product";
import User from "./pages/Users/Users";
import SignUp from "./pages/Auth/Signup.jsx";
import SignIn from "./pages/Auth/Signin.jsx";
import Layout from "./components/Layout/Layout";
import NotFound from "./pages/NotFound/NotFound";
import Polls from "./pages/Polls/Polls.jsx";
import CreatePoll from "./pages/CreatePoll/CreatePoll.jsx";
import Challenge from "./pages/Challenge/Challenge.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import VideoPlayer from "./pages/VideoPlayer.jsx";
import SinglePollPage from "./pages/Polls/SinglePollPage.js";
import NewCreateChallenge from "./pages/CreateChallenge/NewCreateChallenge.jsx";
import CreateTodoList from "./components/TodoList/CreateTodoList.js";

function App() {

  return (
   
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="/create-challenge" element={     <PrivateRoute><CreateChallenge /> </PrivateRoute>} />
        <Route path="/:challengeId" element={ <PrivateRoute><Challenge /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><Product /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path="/LandingPage" element={<PrivateRoute><LandingPage /></PrivateRoute>} />
        <Route path="/polls" element={<PrivateRoute><Polls /></PrivateRoute>} />
        <Route path="/create-poll" element={<PrivateRoute><CreatePoll /></PrivateRoute>} />
        <Route path="/VideoPlayer" element={<VideoPlayer />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="polls/:id" element={ <SinglePollPage />} />
        <Route path="/new-create-challenge" element={<NewCreateChallenge />} />
        <Route path= "add-todo" element={<CreateTodoList />} />
        </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>

  );
}

export default App;
