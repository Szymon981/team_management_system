import React, { useState } from "react";



const ActionMessage = (props) => {
    let classType = "";
    if(props.success === true){
        classType = "success";
    }
    else if(!props.success){
        classType = "failure";
    }

    return <div className={classType}>
        <p>{props.msg}</p>
    </div>;

}

// const ActionMessage = (props) => {
//     const [classType, setClassType] = useState(null);
//     if(props.success === true){
//         setClassType("success");
//     }
//     else if(!props.success){
//         setClassType("failure");
//     }
//     return (
//         <div className = {classType}>
//         <p>{props.msg}</p>
//     </div>
//     );
// }


export default ActionMessage;




