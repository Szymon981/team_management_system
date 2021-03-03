import React, {Component} from "react";

class ProfileBar extends Component{
    constructor() {
        super();
        this.state = {
            loggedUser: null
        }
    }
    loadUser(){
        if(localStorage.getItem("token") !== null){
            let component = this;

            fetch("http://localhost:80/backend/profil.php?token="+localStorage.getItem("token"),
                {headers: {
                        // 'Content-Type':'application/json'
                    },
                    method: "GET"}).then(function (response) {
                return (response.text())
            }).then(function (text) {
                let response = JSON.parse(text);
                if(response.success === true){
                    component.setState({
                       loggedUser: response.user
                    });
                }

            })
        }
    }
    render(){
        if(this.state.loggedUser === null){
            this.loadUser();
        }
        let bar = "";
        if(this.state.loggedUser !== null){
            bar =  <div className = "profile-bar">
            <p>Jesteś zalogowany jako: {this.state.loggedUser.nick}</p>
        </div>;
        }
        else{
            bar = <div className = "profile-bar">
                <p>Nie jesteś zalogowany</p>
            </div>;
        }
        return <div>{bar}</div>;
    }
}



export default ProfileBar;