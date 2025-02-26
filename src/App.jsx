import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReferralReceiver from "./pages/ReferalReciever";


function App() {

  return (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/referral/:id" element={<ReferralReceiver />} />
      </Routes>
    </Router>
  </>
  )
}

export default App
