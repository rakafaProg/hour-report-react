import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { moveKnight, canMoveKnight } from './Game';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './constants';

class Square extends Component {
    render() {
        const { pos, black, connectDropTarget, isOver, canDrop } = this.props;
        const fill = black ? 'black' : 'white';
        const stroke = black ? 'white' : 'black';

        return connectDropTarget(
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}>
                <div style={{
                    backgroundColor: fill,
                    color: stroke,
                    width: '100%',
                    height: '100%'
                }}>
                    {this.props.children}
                </div>
                {isOver &&
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        opacity: 0.5,
                        backgroundColor: getColor(isOver, canDrop),
                    }} />}
            </div>
        );
    }
}

const getColor = (isOver, canDrop) => {
    if (isOver && !canDrop) return 'red';
    if (isOver && canDrop) return 'green';

}

const squareTarget = {
    canDrop(props) {
        return canMoveKnight(props.pos[0], props.pos[1]);
    },
    drop(props, monitor) {
        moveKnight(props.pos[0], props.pos[1]);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),

        canDrop: monitor.canDrop()
    };
}

Square.propTypes = {
    black: PropTypes.bool,
    pos: PropTypes.arrayOf(
        PropTypes.number.isRequired
    ).isRequired
};

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(Square);
