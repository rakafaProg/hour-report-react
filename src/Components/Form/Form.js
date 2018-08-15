import React, { Component } from 'react';
import { connect } from 'react-redux';

import { detailChanged, saveData, clearFormData } from '../../Redux/actions';

class Form extends Component {

    componentWillMount() {
        this.props.dispatch(clearFormData());
    }

    render() {
        const {
            formData,
            formValidationError,
            dispatch,
            formSuccess
        } = this.props;

        const formStyle = {
            width: '500px',
            margin: 'auto'
        }

        return (
            <main>
                <div className="ui form" style={formStyle}>
                    <div className="ui stacked segment orange">
                        <h1 className="ui header orange">
                            Report your work hours
                    </h1>
                        <hr />
                        <p className="ui header grey">
                            Please fill the details below
                    </p>
                        <div >

                            <div className="ui left icon fluid field input" >
                                <i className="envelope icon"></i>
                                <input type="text"
                                    name="username"
                                    placeholder="Email Address"
                                    required
                                    onChange={event => dispatch(detailChanged('username', event.target.value))}
                                    value={formData.username || ""}
                                />
                            </div>

                            <div className="ui left icon fluid field input" >
                                <i className="calendar alternate outline icon"></i>
                                <input type="date"
                                    name="date"
                                    placeholder="Date"
                                    required
                                    onChange={event => dispatch(detailChanged('date', event.target.value))}
                                    value={formData.date || ""}
                                />
                            </div>

                            <div className="two fields">
                                <div className="ui left icon fluid field input" >
                                    <i className="clock icon"></i>
                                    <input type="number"
                                        name="start"
                                        placeholder="Start"
                                        required
                                        onChange={event => dispatch(detailChanged('start', event.target.value))}
                                        value={formData.start || ""}
                                    />
                                </div>
                                <div className="ui left icon fluid field input" >
                                    <i className="clock icon"></i>
                                    <input type="number"
                                        name="end"
                                        placeholder="End"
                                        required
                                        onChange={event => dispatch(detailChanged('end', event.target.value))}
                                        value={formData.end || ""}
                                    />
                                </div>
                            </div>
                            {(formValidationError && formValidationError.length > 0) &&
                                <div className="ui error message visible" >
                                    <div className="header">We got the following errors: </div>
                                    <ul className="list">
                                        {renderError(formValidationError)}
                                    </ul>
                                </div>
                            }
                            {formSuccess &&
                                <div className="ui success message visible" >
                                    <div className="header">Your times where saved successfully</div>
                                </div>
                            }
                            <div className="ui button positive fluid"
                                onClick={() => dispatch(saveData(formData))}
                            >
                                Save
                        </div>
                        </div>
                    </div>
                </div>
            </main >
        );
    }
}

const renderError = (error) => {
    return error.map(
        (err, index) => (
            <li key={index}>{err}</li>
        )
    )
}

const mapStateToProps = state => {
    const { formData, formValidationError, formSuccess } = state.appReducer;
    return { formData, formValidationError, formSuccess };
}

export default connect(mapStateToProps)(Form);