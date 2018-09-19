import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

class DropTo extends Component {

    render() {
        const { isOver, connectDropTarget } = this.props;
        return connectDropTarget(
            <div style={{
                width: "200px",
                height: isOver ? "20px" : "5px",
                backgroundColor: isOver ? "#83f67d" : ""
            }}>
                {isOver &&
                    <span>You can drop here</span>}
            </div>
        );
    }
}


const squareTarget = {

    drop(props) {
        return props.item;
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

export default DropTarget("CARD", squareTarget, collect)(DropTo);

