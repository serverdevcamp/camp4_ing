import React from 'react';
import { MainPage, LoginPage, SignUpPage, LaundryListPage, LaundryDetailPage, OrderPage } from './pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route exact path="/laundrylist" component={LaundryListPage} />
        <Route exact path="/laundrylist/:id" component={LaundryDetailPage} />
        <Route path="/laundrylist/:id/order" component={OrderPage} />
      </Router>
    </div>
  );
}

export default App;
