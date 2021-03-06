import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import Knight from './Knight';
import { moveKnight } from './Game';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';



class Board extends Component {

    renderSquare = i => {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const black = (x + y) % 2 === 1;

        const [knightX, knightY] = this.props.knightPosition;
        const piece = (x === knightX && y === knightY) ?
            <Knight /> :
            <span>&nbsp;</span>;

        return (
            <div key={i}
                style={{ width: '12.5%', height: '12.5%' }}
                onClick={() => moveKnight(x, y)}
            >
                <Square black={black} pos={[x, y]}>
                    {piece}
                </Square>
            </div>
        );
    }

    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(this.renderSquare(i));
        }

        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {squares}
            </div>
        );
    }
}

Board.propTypes = {
    knightPosition: PropTypes.arrayOf(
        PropTypes.number.isRequired
    ).isRequired
};


export default DragDropContext(HTML5Backend)(Board);
