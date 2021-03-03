import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import ActionMessage from "./ActionMessage";
import BaseFormComponent from "./BaseFormComponent";


class Login extends BaseFormComponent {
    constructor() {
        super();
        this.state = {
            login: "",
            password: "",
            redirect: false,
            msg: "",
            success: ""
        }

        this.handleRegister = this.handleRegister.bind(this);
    }



    dbUpdate(update){
        let component = this;

        fetch("http://localhost:80/backend/login.php",
            {headers: {
                    // 'Content-Type':'application/json'
                },
                method: "POST", body: JSON.stringify(update)}).then(function (response) {
            return (response.text());
        }).then(function(response){
            let jsonResponse = JSON.parse(response);
            if(jsonResponse.success === true){
                console.log(response);
                localStorage.setItem("token", jsonResponse.token);
                component.setState({
                    redirect: true
                })

            }
            else if(jsonResponse.success === false){
                component.setState({
                    msg: jsonResponse.msg,
                    success: jsonResponse.success
                })
            }
        })
    }

    handleRegister(){
        this.dbUpdate(this.state);
    }

    render() {
        let success = "";
        if(localStorage.getItem("token") !== null){
            this.setState({
                redirect: true
            });
        }
        if(this.state.msg !== ""){
            success = <ActionMessage msg = {this.state.msg} success={this.state.success}></ActionMessage>;
        }
        else{
            success = (this.props.location.state !== null && this.props.location.state.msg !== "") ?
                <ActionMessage msg = {this.props.location.state.msg} success={this.state.success}></ActionMessage>: "";
        }


        if(this.state.redirect !== false){
            return <Redirect to={
                {
                    pathname: '/'
                }
            } />
        }

        return (<div>
            {success}
            <h1>Logowanie</h1>

            <div>
                <label>Podaj login:</label>
                <input type="text" id="login" name="login" className = "form-input" onChange={this.handleInputChangeState}></input><br/>
                <label>Podaj hasło:</label>
                <input type="password" id="password" name="password" className = "form-input" onChange={this.handleInputChangeState}></input><br/>
                <button id="register" onClick={this.handleRegister}>Zaloguj</button>
            </div>
        </div>);
    }
}

export default Login;