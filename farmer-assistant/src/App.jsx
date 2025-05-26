import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Dashboard from "./pages/services/Dashboard";
import DiseaseDetection from "./pages/services/DiseaseDetection";
import AssistantAI from "./pages/services/AssistantAI";
import Market from "./pages/services/Market";
import Weather from "./pages/services/Weather";
import Prediction from "./pages/services/Prediction";
import EconomicOptimization from "./pages/services/EconomicOptimization";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="disease" element={<DiseaseDetection />} />
        <Route path="assistant" element={<AssistantAI />} />
        <Route path="market" element={<Market />} />
        <Route path="weather" element={<Weather />} />
        <Route path="prediction" element={<Prediction />} />
        <Route path="economic" element={<EconomicOptimization />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
