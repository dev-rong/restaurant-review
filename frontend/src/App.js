import React from "react";
import {BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import Nav from "./components/Nav"
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import MyPage from "./components/MyPage";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  const logout = async () => {
    setUser(null)
  }

  return (
        <>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          {/* <li className="nav-item"> */}
            {/* <Link to={"/restaurants"} className="navbar-brand"> //왜 로그아웃됨? */}
            <a href="/restaurants" className="navbar-brand">Restaurant Reviews</a> 
            {/* </Link> */}
          {/* </li> */}

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
            </li>
          
            { user ? (
              <>
                <li className="nav-item" >
                  <Link to={"/mypage"} className="nav-link">
                    My Page  
                  </Link>
                </li>
                <li className="nav-item" >
                  <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                    Logout {user.name}
                  </a>
                </li>
                </>
            ) : (    
              <li className="nav-item" >        
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
              </li>
            )}
        </div>
      </nav>

      <div className="container mt-3">
        
        {/* <Nav user={user} logout={logout}/> */}
        <Routes>
          <Route path="/" 
            element={
              <RestaurantsList/>
            } 
          />
          <Route path="/restaurants"
            element={
              <RestaurantsList/>
            } 
          />
          <Route 
            path="/restaurants/:id/review" //restaurantId
            element={
              <AddReview user={user} />
            } 
          />j
          <Route 
            path="/restaurants/:id"
            element={
              <Restaurant user={user} />
            }
          />
          <Route 
            path="/login"
            element={
              <Login login={login} />
            }
          />
        </Routes>
        
      </div>
      </>
  );
}

export default App;