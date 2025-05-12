import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashBoard';
import MoneyRecord from './pages/MoneyRecord';
import SetGoal from './pages/SetGoal';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import MoneyRecordList from './pages/MoneyRecordList';
import MainPage from './pages/MainPage';

import './App.css';


function App() {
  return (
    <>
      <div className="app-wrapper">
        <div className="app-container">
          <Router>
            <Header>
          
            </Header>
        
            <Routes>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/moneyrecord" element={<MoneyRecord />} />
              <Route path="/goals" element={<SetGoal />} />
              <Route path="/moneyrecord-list" element={<MoneyRecordList />} />
              <Route path="/" element={<MainPage />} />
            </Routes>
          </Router>

        </div>
      </div>
    </>
    
  );
}

export default App;

