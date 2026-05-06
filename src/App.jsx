import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import AuditForm from "./pages/AuditForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/audit" element={<AuditForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;