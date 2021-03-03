import React, {Component} from "react";
import ActionMessage from "./ActionMessage";
import BaseFormComponent from "./BaseFormComponent";

class Profile extends BaseFormComponent{
    constructor() {
        super();
        this.state = {
            oldPassword: "",
            newPassword: "",
            repeatNewPassword: "",
            loggedUser: "",
            msg: "",
            success: ""
        }

        this.handleRegister = this.handleRegister.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }
    componentDidMount() {
        this.loadUser();
    }



    dbUpdate(update){
        let component = this;
        fetch("http://localhost:80/backend/passwordChange.php?token="+localStorage.getItem("token"),
            {headers: {
                    // 'Content-Type':'application/json'
                },
                method: "POST", body: JSON.stringify(update)}).then(function (response) {
            return (response.text());
        }).then(function(response){
            let jsonResponse = JSON.parse(response);
                component.setState({
                    msg: jsonResponse.msg,
                    success: jsonResponse.success
                });
        })
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

    handleRegister(){
        let passwordInfo = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            token: this.state.loggedUser.token
        }
        if(this.state.newPassword !== this.state.repeatNewPassword){
            this.setState({
                msg: "Podane hasła różnią się",
                success: false
            });

        }
        else{

            this.dbUpdate(passwordInfo);
        }
    }

    render() {
        let avatar = "";
        if(this.state.loggedUser.avatar !== ""){
            avatar = <img className = "img" src={this.state.loggedUser.avatar} />

        }
        else{
            avatar = <img alt="profile" className="img" src="data:image/jpeg;base64,/9j/4QCORXhpZgAATU0AKgAAAAgABQEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAIKYAAIAAAArAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABKGMpIE1vaGFtbWFkIFN1bGhhbiBCYWRyaSB8IERyZWFtc3RpbWUuY29tAAD/7QBSUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAADYcAnQAKihjKSBNb2hhbW1hZCBTdWxoYW4gQmFkcmkgfCBEcmVhbXN0aW1lLmNvbRwCAAACAAT/4Qx1aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pgo8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJyB4OnhtcHRrPSdJbWFnZTo6RXhpZlRvb2wgMTAuODAnPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6cGx1cz0naHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyc+CiAgPHBsdXM6TGljZW5zb3I+CiAgIDxyZGY6U2VxPgogICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgICAgPHBsdXM6TGljZW5zb3JVUkw+aHR0cHM6Ly93d3cuZHJlYW1zdGltZS5jb208L3BsdXM6TGljZW5zb3JVUkw+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvcGx1czpMaWNlbnNvcj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wUmlnaHRzPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyc+CiAgPHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ+aHR0cHM6Ly93d3cuZHJlYW1zdGltZS5jb20vYWJvdXQtc3RvY2staW1hZ2UtbGljZW5zZXM8L3htcFJpZ2h0czpXZWJTdGF0ZW1lbnQ+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0ndyc/Pv/bAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIAyADIAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAA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D+TJJgFE9q6nlYCX5ZbFbRbZbBflkLhIbh7oDtQBIAf6Cn//2gAMAwEAAgADAAAAEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPu0YUYUYd/vPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPO0Qgggggggggggod/PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPOI4AggggggggggggggggE9PPPPPPPPPPPPPPPPPPPPPPPPPPPPAQggggggggggggggggggggfPPPPPPPPPPPPPPPPPPPPPPPPPO4ggggggggggggggggggggggkt/PPPPPPPPPPPPPPPPPPPPPPKwgggggggggggggggggggggggggl/PPPPPPPPPPPPPPPPPPPPMwgggggggggggggggggggggggggggs/PPPPPPPPPPPPPPPPPPOwggggggggggggT3rjwQgggggggggggt/PPPPPPPPPPPPPPPPPIgggggggggggFvPPPPPKgAgggggggggkvPPPPPPPPPPPPPPPOAQggggggggghvPPPPPPPPPCgggggggggggdPPPPPPPPPPPPPPIwggggggggggn/ADzzzzzzzzy8IIIIIIIIIIJPzzzzzzzzzzzzzyAIIIIIIIIIJRzzzzzzzzzzyygIIIIIIIIIIDzzzzzzzzzzzzzsIIIIIIIIIIIXzzzzzzzzzzzwkIIIIIIIIIILfzzzzzzzzzzzwkIIIIIIIIIIIXzzzzzzzzzzzwsIIIIIIIIIIIXzzzzzzzzzzzwIIIIIIIIIIIIXzzzzzzzzzzzwkIIIIIIIIIIILzzzzzzzzzzz8IIIIIIIIIIIIHzzzzzzzzzzzwEIIIIIIIIIIIL/AM8888888887CCCCCCCCCCCCC+8888888888+CCCCCCCCCCCCC38888888888JCCCCCCCCCCCCCV0888888884pCCCCCCCCCCCCCF8888888888hCCCCCCCCCCCCCCV0888888sFiCCCCCCCCCCCCCR8888888888JCCCCCCCCCCKaOCKwf0w84nxhKKCKCCCCCCCCCCF8888888888hCCCCCCCCCWV/TdfXSFlZz7+kNd2ZCCCCCCCCCCR8888888888JCCCCCCCCCSHOKNKVG6edqCOWq6TpWCCCCCCCCCF8888888888hCCCCCCCCCCCCCMPPDBBABDPPMCCCCCCCCCCCCCR8888888888vCCCCCCCCCCCA38888888888887ACCCCCCCCCCCf8888888888/CCCCCCCCCCVc88888888888888spCCCCCCCCCC/88888888888CCCCCCCCCdc8888888888888888stCCCCCCCCC888888888888hCCCCCCCJ88888888888888888888BCCCCCCCV888888888888vCCCCCCZc88888888888888888888slCCCCCCf8888888888888ICCCCC888888888888888888888888CCCCCE88888888888888LCCCCC88888888888888888888888+CCCCCH88888888888888sBCCCCA0888888888888888888884ACCCCBc8888888888888888KCCCCA+8888888888888888888ACCCCG888888888888888888vCCCCCCf0888888888888884vCCCCCCf8888888888888888888PCCCCCCx38888888888887xCCCCCCP888888888888888888888rCCCCCCCRX68888882rgCCCCCCCX88888888888888888888888vKCCCCCCCCCABBACCCCCCCCCGf8APPPPPPPPPPPPPPPPPPPPPPPPPAQggggggggggggggggggggfPPPPPPPPPPPPPPPPPPPPPPPPPPPLCwAggggggggggggggghR3PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPLxQgggggggggggiX/PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP7xSRSRSX/vPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP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"/>
        }

        let component = this;
        return (

            <div>
                <h1>Profil użytkownika</h1>

                <ActionMessage msg = {component.state.msg} success = {component.state.success}>
                </ActionMessage>
                <div className = "user-info">
                    <h2>Informacje o zalogowanym użytkowniku:</h2>
                    <p>Login: {component.state.loggedUser.login}</p>
                    <p>Nick: {component.state.loggedUser.nick}</p>
                    <label>Avatar:</label><br/>
                    {avatar}
                </div>
                <div className = "password-change">

                    <h2>Zmiana hasła:</h2>
                    <label>Podaj aktualne hasło:</label>
                    <input type="password" id="password" name="oldPassword" className = "form-input" onChange = {this.handleInputChangeState}></input><br/>
                    <label>Podaj nowe hasło:</label>
                    <input type="password" id="new-password" name="newPassword" className = "form-input" onChange = {this.handleInputChangeState}></input><br/>
                    <label>Powtórz nowe hasło:</label>
                    <input type="password" id="repeat-new-password" name="repeatNewPassword" className = "form-input" onChange={this.handleInputChangeState}></input><br/>
                    <button id="change-password" onClick={this.handleRegister}>Zmień hasło</button>
                </div>
            </div>
        );
    }
}

export default Profile;