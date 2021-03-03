import React, {Component} from "react";


class BaseFormComponent extends Component{
    constructor() {
        super();
        this.handleInputChangeState = this.handleInputChangeState.bind(this);
        this.propagatePropertyChange = this.propagatePropertyChange.bind(this);
        this.propertyChangeHandler = this.propertyChangeHandler.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handlePropertyChangeExecute = this.handlePropertyChangeExecute.bind(this);
        this.propagatePropertyChangeByFieldName = this.propagatePropertyChangeByFieldName.bind(this);
    }
    handleInputChangeState(event){
        let newValue = event.target.value;
        let fieldName = event.target.name;
        this.handleChangeState(fieldName, newValue);
    }

    handleChangeState(fieldName, newValue){
        this.setState({
            [fieldName]: newValue
        });
    }

    propagatePropertyChange(event){
        let newValue = event.target.value;
        let fieldName = event.target.name;
        this.propagatePropertyChangeByFieldName(fieldName, newValue);
    }

    propagatePropertyChangeByFieldName(fieldName, newValue){
        if(newValue === ""){
            return;
        }
        this.props.propertyChangeHandler(this.props.id, fieldName, newValue);
    }

    propertyChangeHandler(id, fieldName, newValue){
        this.props.handlePropertyChangeExecute(id, fieldName, newValue);
    }

    handlePropertyChangeExecute(id, fieldName, newValue){

    }
}


export default BaseFormComponent;