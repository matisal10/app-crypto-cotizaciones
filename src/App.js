import './App.css';
import Currencies from './components/Currencies';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chart from './components/Chart';


function App() {
  return (
    <div className='container'>
      <div className='row'>
        <h2>Coin Market</h2>
        <Routes>
          <Route exact path="/" element={<Currencies />} />
          <Route exact path="/chart" element={<Chart />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
