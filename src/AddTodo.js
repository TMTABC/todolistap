import React from "react";
import { toast } from 'react-toastify';

class AddTodo extends React.Component {
    state = {
        doing: ''
    }
    handleOnChangeTitle = (event) => {
        this.setState({
            doing: event.target.value
        })
    }
    handleAddTodo = () => {
        if (!this.state.doing) {
            toast.error("missing title's ToDo")
            return;
            // undefined/null
        }
        let todo = {
            id: Math.floor(Math.random() * 10000),
            doing: this.state.doing
        }
        this.props.addNewTodo(todo);
        this.setState({
            doing: ''
        })
    }
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (!this.state.doing) {
                toast.error("missing title's ToDo")
                return;
                // undefined/null
            }
            let todo = {
                id: Math.floor(Math.random() * 10000),
                doing: this.state.doing
            }
            this.props.addNewTodo(todo);
            this.setState({
                doing: ''
            })
        }
    }
    render() {
        let { doing } = this.state;
        return (
            <div className="add-todo">
                <input type="text" value={doing}
                    onChange={(event) => this.handleOnChangeTitle(event)} onKeyDown={this._handleKeyDown}
                ></input>
                <button type="button" className='add'
                    onClick={() => this.handleAddTodo()}
                >add</button>
            </div>
        )
    }
}
export default AddTodo;