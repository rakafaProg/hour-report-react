import * as React from 'react'
import { findDOMNode } from 'react-dom'
import {
	DragSource,
	DropTarget,
} from 'react-dnd';
import flow from 'lodash/flow';

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		}
	},
}

const cardTarget = {
	hover(props, monitor, component) {
		if (!component) {
			return null
		}
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = (findDOMNode(
			component,
		)).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = (clientOffset).y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}


		props.moveCard(dragIndex, hoverIndex)


		monitor.getItem().index = hoverIndex
	},
}


class Card extends React.Component {
	render() {
		const {
			extraStyle,
			children,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props
		const opacity = isDragging ? 0 : 1

		return (
			connectDragSource &&
			connectDropTarget &&
			connectDragSource(
				connectDropTarget(<tr style={{ ...extraStyle, opacity }}>{children}</tr>),
			)
		)
	}
}

export default flow(
	DragSource(
		'CARD',
		cardSource,
		(connect, monitor) => ({
			connectDragSource: connect.dragSource(),
			isDragging: monitor.isDragging(),
		})),
	DropTarget(
		'CARD',
		cardTarget,
		(connect) => ({
			connectDropTarget: connect.dropTarget(),
		}))
)(Card);