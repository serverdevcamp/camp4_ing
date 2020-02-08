import React from 'react';
import { LoginPage, SignUpPage } from './pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
      </Router>
    </div>
  );
}

export default App;
