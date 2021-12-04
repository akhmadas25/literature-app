import React, {useContext} from "react";
import "../../assets/stylesheets/home.css";
import book from "../../assets/image/book.png";
import logo from "../../assets/image/icon.png";
import Signup from "../../components/auth/Signup";
import Login from "../../components/auth/Login";
import "../../assets/stylesheets/home.css"

function Landing() {
  
  return (
    <div className="container-fluid text-light bg-dark main">
      <div className="container">
        <img src={logo} alt={logo} />
        <div className="row">
          <div className="col">
            <div className="header">
              <h1 className="jumbotron">
                source <i> of </i> intellegence
              </h1>
              <h2>
              Sign-up and receive unlimited accesss to all of your literatur - share your literature.
              </h2>
            </div>
            <div className="sign-button mt-5">
              <Signup />
              <Login />
            </div>
          </div>
          <div className="col">
            <img src={book} alt={book} style={{ height: 500 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
