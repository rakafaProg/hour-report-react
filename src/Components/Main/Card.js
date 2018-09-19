import React, { Component } from 'react';
import { DragSource } from 'react-dnd';



class Card extends Component {

    render() {
        const { item, isDragging, connectDragSource } = this.props;
        const rowStyle = {
            height: "50px",
            width: "200px",
            padding: "5px",
            borderColor: "black",
            borderRadius: "5px",
            borderWidth: "1px",
            borderStyle: "solid",
            margin: '5px',
        }

        return connectDragSource(
            <div style={rowStyle}>
                {item.name} {item.family} {item.phone}
            </div>
        )
    }
}

const cardSource = {
    beginDrag(props) {
        return { id: "This is the idea of that" };
    },

    endDrag(props, monitor, comp) {
        if (monitor.getDropResult())
            props.move(monitor.getDropResult());
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview(),
    }
}


export default DragSource("CARD", cardSource, collect)(Card);