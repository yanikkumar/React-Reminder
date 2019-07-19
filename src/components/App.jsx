import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        }
    }

    addReminder() {
        console.log('this.state.dueDate', this.state.dueDate);

        this.props.addReminder(this.state.text, this.state.dueDate)
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }

    renderReminders() {
        const { reminders } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div className="list-item">
                                    <div>{reminder.text}</div>
                                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                                </div>
                                <div className="list-item delete-button cursor"
                                    onClick={() => this.deleteReminder(reminder.id)}
                                >
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
        return (
            <div className="app" >
                <div className="title display-4">React Reminder</div>
                <div className="form-inline reminder-form">
                    <div className="form-input">
                        <input className="form-control"
                            placeholder="I Have To..."
                            onChange={event => this.setState({ text: event.target.value })}
                        />
                        <input className="form-control cursor"
                            type="datetime-local"
                            onChange={event => this.setState({ dueDate: event.target.value })}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-success cursor"
                        onClick={() => this.addReminder()}
                    >
                        Add Reminder
                    </button>
                </div>
                {this.renderReminders()}
                <div
                    className="btn btn-danger cursor"
                    onClick={() => this.props.clearReminders()}
                >
                    Clear All Reminders
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        reminders: state
    }

}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);