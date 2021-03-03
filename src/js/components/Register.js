import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import BaseFormComponent from "./BaseFormComponent";

class Register extends BaseFormComponent {
    constructor() {
        super();
        this.state = {
            login: "",
            password: "",
            repeatPassword: "",
            nick: "",
            redirect: false
        }
        this.loginData = {
            login: this.state.login,
            password: this.state.password,
            nick: this.state.nick
        }
        this.handleRegister = this.handleRegister.bind(this);

    }




    handleRegister() {
        if(this.state.password.length < 5){
            alert("Hasło za krótkie. Musi mieć przynajmniej 5 liter.")
        }
        // else if(this.state.password.toUpperCase()){
        //     alert("Hasło powinno zawierać przynajmniej 1 dużą literę.")
        // }
        // else if('/\d/'.test(this.state.password)){
        //     alert("Hasło powinno mieć przynajmniej jedną liczbę.")
        // }
        else if(this.state.password !== this.state.repeatPassword){
            alert("Podane hasła są różne");
        }
        else if(this.state.password === this.state.repeatPassword){
            let data = {
                login: this.state.login,
                password: this.state.password,
                nick: this.state.nick
            }
            this.dbUpdate(data);
            alert("Rejestracja udana");
        }


    }


    dbUpdate(update){
        fetch("http://localhost:80/backend/register.php",
            {headers: {
                    // 'Content-Type':'application/json'
                },
                method: "POST", body: JSON.stringify(update)}).then(function (response) {
            return (response.text());
        }).then(function(response){
            console.log(response);
        })
    }



    render() {
        if(localStorage.getItem("token") !== null){
            this.setState({
                redirect: true
            });
        }
        if(this.state.redirect !== false){
            return <Redirect to={
                {
                    pathname: '/'
                    // state: {
                    //     msgFailure: this.state.msgRedirect,
                    //     // msgSuccess: "failure"
                    // }
                }
            } />
        }
        return (
            <div>
                <h1>Rejestracja</h1>
                <div>
                    <label>Podaj login:</label>
                    <input type="text" id="login" name="login" className = "form-input" onChange={this.handleInputChangeState}></input><br/>
                    <label>Podaj hasło:</label>
                    <input type="password" id="password" name="password" className = "form-input" onChange={this.handleInputChangeState}></input><br/>
                    <label>Powtórz hasło:</label>
                    <input type="password" id="repeat-password" name="repeatPassword" className = "form-input" onChange={this.handleInputChangeState}></input><br/>
                    <label>Podaj nick:</label>
                    <input type="text" id="nick" name="nick" className = "form-input" onChange={this.handleInputChangeState}></input><br/>
                    <button id="register" onClick={this.handleRegister}>Zarejestruj</button>
                </div>
            </div>);
    }
}

export default Register;