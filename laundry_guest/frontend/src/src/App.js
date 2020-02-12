import React from 'react';
<<<<<<< HEAD
import { MainPage, LoginPage, SignUpPage, LaundryListPage, ProfilePage } from './pages';
=======
import { MainPage, LoginPage, SignUpPage, LaundryListPage, LaundryDetailPage } from './pages';
>>>>>>> b47385e45a020165c251284bbbe9e0ae54161c0b
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
<<<<<<< HEAD
        <Route path="/profile" component={ProfilePage} />
        <Route path="/laundrylist" component={LaundryListPage} />
=======
        <Route exact path="/laundrylist" component={LaundryListPage} />
        <Route path="/laundrylist/:id" component={LaundryDetailPage} />
>>>>>>> b47385e45a020165c251284bbbe9e0ae54161c0b
      </Router>
    </div>
  );
}

export default App;
