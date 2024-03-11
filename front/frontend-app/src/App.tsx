import React from 'react';
import { BrowserRouter as Router,Routes, Route, useNavigate  } from 'react-router-dom';
import './App.css';

import Page1 from './Page/Page1';
import Page2 from './Page/Page2';
import Page3 from './Page/Page3';
import Page4 from './Page/Page4';



const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <div className="button-group">
          <button className="big-button" onClick={() => navigate('/Page1')}>버튼 1</button>
          <button className="big-button" onClick={() => navigate('/Page2')}>버튼 2</button>
          <button className="big-button" onClick={() => navigate('/Page3')}>버튼 3</button>
          <button className="big-button" onClick={() => navigate('/Page4')}>버튼 4</button>
        </div>
      </header>
      <Routes>
        <Route path="/Page1" element={<Page1 />} />
        <Route path="/Page2" element={<Page2 />} />
        <Route path="/Page3" element={<Page3 />} />
        <Route path="/Page4" element={<Page4 />} />
      </Routes>
    </div>
  );
}

export default App;
