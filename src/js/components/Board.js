import React, { Component } from "react";
import ReactDOM from "react-dom";
import TaskList from "./TaskList.js";
import Modal from 'react-modal';
import { StickyContainer, Sticky } from 'react-sticky';
import { Redirect } from "react-router-dom";
import BaseFormComponent from "./BaseFormComponent";
import ActionMessage from "./ActionMessage";



Modal.setAppElement('#root');

class Board extends BaseFormComponent{
    constructor() {
        super();
        this.locks = {
            tasks : false,
            statuses: false,
            users: false
        };
        this.state ={
            tasks : [],
            alltasks: [],
            statuses: [],
            users: [],
            currentAssignedTo: null,
            currentStatus: null,
            currentTitle: "",
            currentBody: "",
            newStatus: null,
            modalOpenTask: false,
            modalOpenStatus: false,
            redirect: false,
            msgRedirect: "",
            loggedAs: "",
            message: null,
            messageSuccess: null
        };
        this.saver = this.saver.bind(this);
        this.handleAssignToFilter = this.handleAssignToFilter.bind(this);
        this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
        this.handleTaskUserChange = this.handleTaskUserChange.bind(this);
        this.handleTaskBodyChange = this.handleTaskBodyChange.bind(this);
        this.modalIsOpen = this.modalIsOpen.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModalTask = this.openModalTask.bind(this);
        this.openModalStatus = this.openModalStatus.bind(this);
        this.newStatusSaver = this.newStatusSaver.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.handleStatusDelete = this.handleStatusDelete.bind(this);
        this.loggedAsSetter = this.loggedAsSetter.bind(this);
        this.handlePropertyFiltering = this.handlePropertyFiltering.bind(this);
        this.handleMoveDown = this.handleMoveDown.bind(this);
        this.handleMoveUp = this.handleMoveUp.bind(this);
    }


    handleTaskTitleChange(taskId, newTitle){
        let updatedTask = null;
        this.setState({
            alltasks: this.state.alltasks.map(function(task){
                if(task.id === taskId){
                    task.title = newTitle;
                    updatedTask = task;
                }
                return task;
            })
        })
        this.dbUpdate(updatedTask);
    }

    handleTaskBodyChange(taskId, newBody){
        let updatedTask = null;
        this.state.alltasks.filter(function(task){
            if(task.id === taskId){
                updatedTask = task;
                return task;
            }
        })
        updatedTask.body = newBody;

        // this.setState({
        //     alltasks: this.state.alltasks.map(function(task){
        //         if(task.id === taskId){
        //             task.body = newBody;
        //             updatedTask = task;
        //         }
        //         return task;
        //     })
        // })
        let component = this;

        this.dbUpdate(updatedTask, this.successCallback,this.failureCallback);
    }



    handleTaskDelete(taskId){
        let content = {id: taskId};
        let component = this;
        fetch("http://localhost:80/backend/taskDelete.php?token="+localStorage.getItem("token"),
            {headers: {
                    // 'Content-Type':'application/json'
                },
                method: "POST", body: JSON.stringify(content)}).then(function (response) {
            return (response.text())
        }).then(function (text) {

            let type = "tasks";
            component.parser(type,text);


        })
    }

    handleStatusDelete(statusId){
        let content = {id: statusId};
        let component = this;

        fetch("http://localhost:80/backend/statusDelete.php?token="+localStorage.getItem("token"),
            {headers: {
                    // 'Content-Type':'application/json'
                },
                method: "POST", body: JSON.stringify(content)}).then(function (response) {
            return (response.text())
        }).then(function (text) {

            let type = "statuses";
            component.parser(type,text);


        })
    }

    dbUpdate(update, successCallback, failureCallback){
        let component = this;
        fetch("http://localhost:80/backend/tasks.php?token="+localStorage.getItem("token"),
            {headers: {
                // 'Content-Type':'application/json'
                },
            method: "POST", body: JSON.stringify(update)}).then(function (response) {
            return (response.text())
        }).then(function (text) {
                let jsonText = JSON.parse(text);
                let type = "tasks";
                if(jsonText.success === true){
                    if(jsonText[type] !== undefined){
                        component.parser(type, text);
                    }
                    if(successCallback !== undefined){
                        successCallback(jsonText.msg);
                    }

                }
                else if(failureCallback !== undefined){
                    failureCallback(jsonText.msg);
                }


        })

    }

    handleResponse(type, text){
        let parsedText = JSON.parse(text);
        if(parsedText["success"] === false){
            this.setState({
                redirect: true,
                msgRedirect: parsedText.msg
            })
        }
        else{
            this.parser(type, text);
        }
    }

    parser(type, text){
        let component = this;
        var nextState = component.state;
        nextState[type] = JSON.parse(text)[type];
        if(type === "tasks"){
            nextState.alltasks = nextState[type];
        }
        component.setState(nextState);
    }



    saver(){

        let content = {
            title: this.state.currentTitle,
            body: this.state.currentBody,
            status: this.state.currentStatus,
            assignedTo: this.state.currentAssignedTo
        }

        this.dbUpdate(content);


    }

    newStatusSaver(){

        let component = this;
        let content = {
            label: this.state.newStatus,
        }

        fetch("http://localhost:80/backend/statuses.php?token="+localStorage.getItem("token"),
            {headers: {
                    // 'Content-Type':'application/json'
                },
                method: "POST", body: JSON.stringify(content)}).then(function (response) {
            return (response.text())
        }).then(function (text) {
            let type = "statuses";
            component.handleResponse(type, text);
        });
    }

    handleAssignToFilter(event){
        if(event.target.value === "all"){
            this.setState({
                tasks: this.state.alltasks
            })
        }
        else{
            let filtertasks = this.state.alltasks.filter(function(task){
                return parseInt(task.assignedTo) === parseInt(event.target.value);
            });
            this.setState({
                tasks: filtertasks
            })
        }
    }


    handleTaskUserChange(taskId, newUser){
        this.handlePropertyFiltering(taskId, newUser, "assignedTo");
    }

    handlePropertyChangeExecute(id, fieldName, newValue){
        let mapping = {
            status: this.handlePropertyFiltering
        };
        return mapping[fieldName](id, newValue, fieldName);
    }

    handlePropertyFiltering(taskId, propertyValue, property) {
        let updatedTask = null;
        this.setState({
            alltasks: this.state.alltasks.map(function (task) {
                if (task.id === taskId) {
                    task[property] = propertyValue;
                    updatedTask = task;
                }
                return task;
            })
        })
        this.dbUpdate(updatedTask);
    }

    closeModal(){
        this.setState({
            modalOpenTask: false,
            modalOpenStatus: false,
        });
    }

    openModalTask(){
        this.setState({
            modalOpenTask: true
        });
    }

    openModalStatus(){
        this.setState({
            modalOpenStatus: true
        });
    }

    modalIsOpen(){
        return this.state.modalOpenTask;
    }

    loggedAsSetter(user){
        this.setState({
            loggedAs: user
        })
    }

    handleMoveDown(taskId){

        let update = {
            "id": taskId,
            "direction": "down"
        }

        let component = this;
        fetch("http://localhost:80/backend/moving.php?token="+localStorage.getItem("token"),
            {headers: {
                    // 'Content-Type':'application/json'
                },
                method: "POST", body: JSON.stringify(update)}).then(function (response) {
            return (response.text())
        }).then(function (text) {
            let jsonText = JSON.parse(text);
            let type = "tasks";
            if(jsonText.success === true){
                if(jsonText[type] !== undefined){
                    component.parser(type, text);
                }
                component.successCallback("Udało się przenieść w dół");

            }else{
                component.failureCallback("Nie udało się przenieść w dół");
            }



        })

    }

    handleMoveUp(taskId){
        let update = {
            "id": taskId,
            "direction": "up"
        }

        let component = this;
        fetch("http://localhost:80/backend/moving.php?token="+localStorage.getItem("token"),
            {headers: {
                    // 'Content-Type':'application/json'
                },
                method: "POST", body: JSON.stringify(update)}).then(function (response) {
            return (response.text())
        }).then(function (text) {
            let jsonText = JSON.parse(text);
            let type = "tasks";
            if(jsonText.success === true){
                if(jsonText[type] !== undefined){
                    component.parser(type, text);
                }
                component.successCallback("Udało się przenieść w górę");

            }else{
                component.failureCallback("Nie udało się przenieść w górę");
            }



        })

    }

    successCallback(message){
        this.setState({message: message, messageSuccess: true});
    }


    failureCallback(message){
        this.setState({message: message, messageSuccess: false});
    }

    render(){
        let success = "";
        if(this.state.message !== ""){
            success = <ActionMessage msg = {this.state.message} success={this.state.messageSuccess}></ActionMessage>;
        }
        // else{
        //     success = (this.props.location.state !== null && this.props.location.state.msg !== "") ?
        //         <ActionMessage msg = {this.props.location.state.msg} success={this.state.success}></ActionMessage>: "";
        // }
        if(this.state.redirect !== false){
            return <Redirect to={
                {
                    pathname: '/login',
                    state: {
                            msg: this.state.msgRedirect,

                    }
                }
            } />
        }

        let component = this;

        function fetcher(type){
            if(component.state[type].length > 0){
                return;
            }
            component.locks[type] = true;
            fetch("http://localhost:80/backend/"+type+".php?token="+localStorage.getItem("token"), {}).then(function (response) {
                return (response.text())
            }).then(function (text) {
                let jsonResponse = JSON.parse(text);
                if(jsonResponse.success === true) {
                    let decodedElements = jsonResponse[type];
                    if (JSON.stringify(component.state[type]) !== JSON.stringify(decodedElements)) {
                        var nextState = component.state;
                        nextState[type] = decodedElements;
                        var users = [];
                        if (type === "tasks") {
                            nextState.alltasks = nextState[type];
                        }
                        component.setState(nextState);
                    } else if (component.locks[type] === false) {
                        // component.locks[type] = true;
                        // setTimeout(fetcher, 3000, type);
                    }
                }
                else{
                    component.setState({
                        redirect: true,
                        msgRedirect: jsonResponse.msg
                    })
                }
            })
        }

        if(component.locks.tasks === false){
            fetcher("tasks");
        }

        if(component.locks.statuses === false){
            fetcher("statuses");
        }

        if(component.locks.users === false) {
            fetcher("users");
        }

        return <div>

            {/*<StickyContainer>*/}

            {/*    <Sticky>*/}

            {/*    <span>Strona główna</span>*/}
            {/*    <span>Taski</span>*/}
            {/*    <span>Statusy</span>*/}
            {/*    <span>Logowanie</span>*/}
            {/*    </Sticky>*/}
            {/*</StickyContainer>*/}

            {success}

            <div className="actions-wrapper">

                <div className = "filters-wrapper">
                    <p>Filtruj po:</p>
                    <select id = "assignedTo-filter" onChange={this.handleAssignToFilter}>
                        <option value = "all">Wszyscy</option>
                        {this.state.users.map(function(user){
                            return  <option value = {user.id}>{user.nick}</option>
                        })}
                    </select>
                </div>
                
                <div className = "adding-status-button-wrapper">
                    <button className = "adding-status-button action-button" onClick={this.openModalStatus}>Dodaj status</button>
                </div>

                <div className = "adding-task-button">
                    <button className = "adding-task-button action-button" onClick={this.openModalTask}>Dodaj zadanie</button><br/>
                </div>


            </div>


            <Modal
                isOpen={this.state.modalOpenTask}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                // style={customStyles}
                contentLabel="Example Modal"
            >

                <h2>Dodawanie zadania</h2>
                <button className = "action-button close-button" onClick={this.closeModal}>Zamknij</button>
                    <div className = "modal-content-wrapper">
                        <label>Tytuł:</label>
                        <input type = "text" id = "title" name = "currentTitle" className = "form-input" onChange={this.handleInputChangeState}/><br/>
                        <label>Treść:</label>
                        <input type = "text" id = "body" name="currentBody" className = "form-input" onChange={this.handleInputChangeState}/><br/>

                        <label>Użytkownik:</label>
                        <select id = "assignedTo-select" name="currentAssignedTo" onChange={this.handleInputChangeState}>
                            {this.state.users.map(function(user){
                                return  <option value = {user.id}>{user.nick}</option>
                            })}
                        </select><br/>

                        <label>Status:</label>
                        <select id = "status-select" name="currentStatus" onChange={this.handleInputChangeState}>
                            {this.state.statuses.map(function(status){
                                return <option value = {status.id}>{status.label}</option>
                            })}
                        </select><br/>

                        <input type = "submit" className = "action-button" value = "Zapisz zadanie" onClick={this.saver}/>
                    </div>
            </Modal>

            <Modal
                isOpen={this.state.modalOpenStatus}
                contentLabel="Example Modal"
            >

                <h2>Dodawanie statusu</h2>
                <button className = "action-button close-button" onClick={this.closeModal}>Zamknij</button>
                <div className = "modal-content-wrapper">
                    <label>Dodaj nowy status:</label>
                    <input type = "text" id = "new-status" name="newStatus" className = "form-input" onChange={this.handleInputChangeState}/><br/>
                    <input type = "submit" className = "action-button" value = "Zapisz status"  onClick={this.newStatusSaver}/>
                    <br/><br/>
                </div>
            </Modal>


            <div className="task-lists-wrapper">

            {this.state.statuses.map(function(status){
                return  <TaskList title = {status.label} statusId = {status.id} tasks= {component.state.tasks}
                                  statuses = {component.state.statuses} users = {component.state.users}
                                  handleTaskTitleChange = {component.handleTaskTitleChange}
                                  taskUserHandler = {component.handleTaskUserChange}
                                  taskBodyChange = {component.handleTaskBodyChange}
                                  handleTaskDelete = {component.handleTaskDelete}
                                  handleStatusDelete = {component.handleStatusDelete}
                                  handlePropertyChangeExecute = {component.handlePropertyChangeExecute}
                                  handleMoveDown = {component.handleMoveDown}
                                  handleMoveUp = {component.handleMoveUp}
                                    key = {status.id}/>
            })}
            </div>



        </div>
    }
}


export default Board;
// ReactDOM.render(<Board/>, document.getElementById("root"));