import React, {Component} from "react";
import {Redirect} from "react-router-dom";

class LogOut extends Component{
    constructor() {
        super();
    }
    logOut(){
        localStorage.removeItem("token");
    }
    render(){
      this.logOut();
      return  <Redirect to={
            {
                pathname: '/login',
                state: {
                    msg: "Wylogowano użytkownika",

                }
            }
        } />
    }
}

export default LogOut;