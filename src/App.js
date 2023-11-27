import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App container-fluid">
      <Routes>
        <Route
          exact path='/'
          element={<Dashboard/>}
        />
      </Routes>
    </div>
  );
}

export default App;
