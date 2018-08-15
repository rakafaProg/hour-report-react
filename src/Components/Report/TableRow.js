import React from 'react';

const TableRow = props => {
    const { avg, month, username, sum, extra } = props.data;
    return (
        <tr>
            <td>{username}</td>
            <td>{month}</td>
            <td>{avg}</td>
            <td>{sum}</td>
            <td>{extra}</td>
        </tr>
    );
}

export default TableRow;
