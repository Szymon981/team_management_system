import React, { Component } from "react";
import Task from "./Task.js";
import BaseFormComponent from "./BaseFormComponent";

class TaskList extends BaseFormComponent{
    constructor() {
        super();

        this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
        this.handleTaskUserChange = this.handleTaskUserChange.bind(this);
        this.handleTaskBodyChange = this.handleTaskBodyChange.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.handleMoveDown = this.handleMoveDown.bind(this);
        this.handleMoveUp = this.handleMoveUp.bind(this);
        this.deleteStatus = this.deleteStatus.bind(this);
    }


    handleTaskTitleChange(taskId, newTitle){
        this.props.handleTaskTitleChange(taskId, newTitle);
    }

    handleTaskUserChange(taskId, newStatus){
        this.props.taskUserHandler(taskId, newStatus);
    }

    handleTaskBodyChange(taskId, newBody){
        this.props.taskBodyChange(taskId, newBody);
    }

    handleTaskDelete(taskId){
        this.props.handleTaskDelete(taskId);
    }

    deleteStatus(){
        let id = this.props.statusId;
        this.props.handleStatusDelete(id);
    }

    handleMoveDown(taskId){
        this.props.handleMoveDown(taskId);
    }

    handleMoveUp(taskId){
        this.props.handleMoveUp(taskId);
    }

    render(){
        let statusId = this.props.statusId;
        let listTasks = this.props.tasks.filter(function(task){
            return task.status == statusId;
        });
        listTasks.sort((a,b)=>a["position"] - b["position"]);
        let component = this;
        let display ="";

        if(listTasks.length === 0){
            display = <button className = "delete-status" onClick={this.deleteStatus}>Usuń</button>;
        }

        return <div className = "tasks-wrapper" >
            <h2 className = "task-title">{this.props.title}</h2>
            {display}
            {listTasks.map(function(task){
                return  <Task title = {task.title} body = {task.body} status = {task.status}
                              assignedTo = {task.assignedTo} statuses = {component.props.statuses}
                              currentStatus = {task.status} id = {task.id}
                              users = {component.props.users}
                              tasks = {component.props.tasks}
                              taskTitleHandler = {component.handleTaskTitleChange}
                              taskUserHandler = {component.handleTaskUserChange}
                              taskBodyHandler = {component.handleTaskBodyChange}
                              taskDeleteHandler = {component.handleTaskDelete}
                              propertyChangeHandler = {component.propertyChangeHandler}
                              moveDownHandler = {component.handleMoveDown}
                              moveUpHandler = {component.handleMoveUp}
                              key = {task.id}/>
            })}
        </div>
    }
}

export default TaskList;