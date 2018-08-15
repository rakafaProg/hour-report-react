import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as appActions from '../../Redux/actions';
import TableRow from './TableRow';

class Report extends Component {

    componentWillMount() {
        this.props.dispatch(appActions.getHourReport());
    }

    renderItems() {
        this.props.hourList;
        return _.map(this.props.hourList, (item, index) => (
            <TableRow key={index} data={item} />
        ));
    }

    renderHead(headerText, propName) {
        const { orderBy, dispatch } = this.props;
        return (
            <th>
                <i
                    className={`sort alphabet down icon ${orderBy == propName ? 'green' : 'grey'}`}
                    onClick={() => dispatch(appActions.sortTableBy(propName))}
                ></i>
                {headerText}
            </th>
        );
    }

    render() {
        const mainStyle = {
            maxWidth: "800px",
            margin: "auto",
            padding: "20px",
        }

        return (
            <main className="ui segment orange" style={mainStyle}>
                <h1 className="ui header orange">Report</h1>
                <hr />
                <table className="ui table">
                    <thead>
                        <tr>
                            {this.renderHead("Username", "username")}
                            {this.renderHead("Month", "month")}
                            {this.renderHead("Avarage Hours", "avg")}
                            {this.renderHead("Hours Sum", "sum")}
                            {this.renderHead("Extra Hours", "extra")}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItems()}
                    </tbody>
                </table>
            </main>
        );
    }
}

const mapStateToProps = state => {
    const { hourList, orderBy } = state.appReducer;
    return { hourList, orderBy };
}

export default connect(mapStateToProps)(Report);
