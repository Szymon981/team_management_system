import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Board from "./Board.js";
import Login from "./Login.js"
import Register from "./Register.js"
import Profile from "./Profile.js"
import ReactDOM from "react-dom";
import ProfileBar from "./ProfileBar";
import LogOut from "./LogOut";


class Page extends Component {
    constructor() {
        super();
        this.state = {
            isLogged: false
        };
    }



    render(){
        // let display = "";
        // if(this.state.isLogged === true){
        //     display = "display: none";
        // }
        // else{
        //     display = "display: block";
        // }
        let button = <button style = "display:none">Wyloguj</button>;
        return (<div>
        <HashRouter>
            <h1>MENU GŁÓWNE</h1>
            <div>
                <ul className="header">
                    <li className="main-menu-elements">
                        <NavLink to="/">Strona główna</NavLink>
                    </li>
                    <li className="main-menu-elements">
                        <NavLink to="/login">Logowanie</NavLink>
                    </li>
                    <li className="main-menu-elements">
                        <NavLink to="/register">Rejestracja</NavLink>
                    </li>
                    <li className="main-menu-elements">
                        <NavLink to="/profile">Profil</NavLink>
                    </li>
                    <li className="main-menu-elements">
                        <NavLink to="/logout">Wyloguj</NavLink>
                    </li>
                </ul>
                <ProfileBar isLogged = {this.props.isLogged}></ProfileBar>
                <div className="content">
                    <Route exact path="/" component={Board}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/logout" component={LogOut}/>
                </div>
            </div>
        </HashRouter>
        </div>);
    }
}


export default Page;
ReactDOM.render(<Page/>, document.getElementById("root"));