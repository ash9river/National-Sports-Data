

import './App.css'
import DashboardPage from './Pages/DashBoardPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FacilityPage from './Pages/FacilityPage';
import CoursePage from './Pages/CoursePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/facility" element={<FacilityPage />} />
        </Routes>
      </Router>
      {/* <ClippedDrawer /> */}
    </>
  )
}

export default App
