import React from 'react';

import { MainPage, LoginPage, SignUpPage, LaundryListPage, LaundryDetailPage,  ProfilePage, OrderListPage, OrderDetailPage, OrderPage, PaymentPage, ReviewPage } from './pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />

        <Route path="/profile" component={ProfilePage} />
        <Route path="/orderlist" component={OrderListPage} />
        <Route path="/orderdetail/:id" component={OrderDetailPage} />
        <Route path="/review" component={ReviewPage} />

        <Route exact path="/laundrylist" component={LaundryListPage} />
        <Route exact path="/laundrylist/:id" component={LaundryDetailPage} />
        <Route path="/laundrylist/:id/order" component={OrderPage} />
        <Route path="/laundrylist/:id/payment" component={PaymentPage} />
      </Router>
    </div>
  );
}

export default App;
