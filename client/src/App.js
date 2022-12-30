import logo from './logo.svg';
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/board' element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
