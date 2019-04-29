import React from "react";
import { Message } from "semantic-ui-react";

const Toast = (props) => <Message visible header={props.header} content={props.message} />

export default Toast;
