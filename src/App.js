import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { NoteState } from './context/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import UserLogin from './components/UserLogin';
import { useState } from 'react';
import FeatureFlagGlobalState from './feature-flag/context';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  return (
    <>
      <NoteState>
        <FeatureFlagGlobalState>
          <Router>
            <Navbar showAlert={showAlert} />
            <Alert alert={alert} />
            <div className='container'>
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<UserLogin showAlert={showAlert} />} />
                <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              </Routes>
            </div>
          </Router>
        </FeatureFlagGlobalState >
      </NoteState>
    </>
  );
}

export default App;
