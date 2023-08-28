import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import AdminRegister from './pages/AdminRegister';
import AdminHome from './pages/AdminHome';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-navigation">
        <Link to="/admin" className="app-link">Admin</Link>
        <Link to="/user" className="app-link">User</Link>
      </div>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/adminRegister" element={<AdminRegister />} /> {/* Ensure you have this route */}
        <Route path="/user" element={<UserLogin />} />
        <Route path="*" element={<div>Select a page from above to navigate.</div>} />
      </Routes>
    </Router>
  );
}

export default App;
