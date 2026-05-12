import { BrowserRouter, Route, Routes,Link } from "react-router-dom";
import Landing from "./pages/Landing";
import AuditForm from "./pages/AuditForm";
import ResultsPage from './pages/ResultsPage';
// import SharedResults from "./pages/SharedResults";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
       {/* NAVIGATION */}
      <nav>
        <Link to="/">
          Home
        </Link>

        <Link to="/history">
          View Audit History
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/audit" element={<AuditForm/>}/>
        <Route path="/results" element={<ResultsPage/>}/>
        <Route path="/history" element={<History />} />
        <Route
            path="/results/:id"
            element={<ResultsPage />}
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;