import React, { Component } from "react";
import ContentEditable from 'react-contenteditable';
import BaseFormComponent from "./BaseFormComponent";

class Task extends BaseFormComponent{
    constructor() {
        super();
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.contentEditable = React.createRef();
    }

    handleTitleChange(event){
        let newTitle = event.target.value;
        if(newTitle === ""){
            return;
        }
        this.props.taskTitleHandler(this.props.id, newTitle);
    }

    handleBodyChange(event){
        let newBody = event.target.value;
        if(newBody === ""){
            return;
        }
        this.props.taskBodyHandler(this.props.id, newBody);
    }

    handleUserChange(event){
        console.log(event.target.value, "słowo");
        let newUser = event.target.value;
        if(newUser === ""){
            return;
        }

        this.props.taskUserHandler(this.props.id, newUser);
    }

    handleTaskDelete(){
        this.props.taskDeleteHandler(this.props.id);
    }



    render(){
        let component = this;
        return <div className = "task-wrapper">
            <h4>{this.props.title}</h4>
            {/*<ContentEditable id = "title" className = "title-wrapper"*/}
            {/*    innerRef={this.contentEditable}*/}
            {/*    html={this.props.title} // innerHTML of the editable div*/}
            {/*    disabled={false}       // use true to disable editing*/}
            {/*    onChange={this.handleTitleChange} // handle innerHTML change*/}
            {/*    tagName='h4' // Use a custom HTML tag (uses a div by default)*/}
            {/*/>*/}
            <ContentEditable id = "body" className = "body-wrapper"
                             innerRef={this.contentEditable}
                             html={this.props.body}
                             disabled={false}
                             onChange={this.handleBodyChange}
                             tagName='p'
            />
            {/*<p>{this.props.body}</p>*/}
            {/*<p>{this.props.status}</p>*/}
            <select id = "status-select" name = "status" onChange={this.propagatePropertyChange}>
                {this.props.statuses.map(function(status){
                    if(component.props.status === status.id) {
                        return <option value={status.id} selected>{status.label}</option>
                    }
                    else{
                        return <option value={status.id}>{status.label}</option>
                    }
                })}
            </select>
            <select id = "assignedTo-select" onChange={this.handleUserChange}>
                {this.props.users.map(function(user){
                    if(component.props.assignedTo == user.id) {
                        return <option value={user.id} selected>{user.nick}</option>
                    }
                    else{
                        return <option value={user.id}>{user.nick}</option>
                    }
                })}
            </select>
            {/*<p>Przypisane do: {this.props.assignedTo}</p>*/}
            <button onClick = {this.handleTaskDelete}>Usuń</button>
        </div>
    }
}
export default Task;
// ReactDOM.render(<Task title = "pierwszy tytul" body = "tresc" status = "status"/>, document.getElementById("root"));