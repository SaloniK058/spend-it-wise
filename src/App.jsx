import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import AuditForm from "./pages/AuditForm";
import ResultsPage from './pages/ResultsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/audit" element={<AuditForm/>}/>
        <Route path="/results" element={<ResultsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;