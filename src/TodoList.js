import './App.css';
import React from "react";
import AddTodo from "./AddTodo"
import { toast } from 'react-toastify';




class TodoList extends React.Component {


    state = {
        ListTodo: JSON.parse(localStorage.getItem('todo')),
        editTodo: {}
    }


    addNewTodo = (todo) => {
        this.setState({
            ListTodo: [...this.state.ListTodo, todo],
        })

        localStorage.setItem('todo', JSON.stringify([...this.state.ListTodo, todo]));
        toast.success("Wow so easy!")
    }
    handleDeleteTodo = (todo) => {
        let currentTodos = this.state.ListTodo;
        currentTodos = currentTodos.filter(item => item.id !== todo.id)
        this.setState({
            ListTodo: currentTodos
        })
        localStorage.setItem('todo', JSON.stringify(currentTodos));
        toast.success("Delete success!")

    }
    handleEditTodo = (todo) => {
        let { editTodo, ListTodo } = this.state
        let isEmptyObj = Object.keys(editTodo).length === 0;

        if (isEmptyObj === false && editTodo.id === todo.id) {
            let ListTodoCopy = [...ListTodo]
            let objIndex = ListTodoCopy.findIndex((item => item.id == todo.id));

            ListTodoCopy[objIndex].doing = editTodo.doing
            this.setState({
                ListTodo: ListTodoCopy,
                editTodo: {}
            })
            localStorage.setItem('todo', JSON.stringify(ListTodoCopy));
            toast.success("Update ListTodo success!")

            return;

        }

        this.setState({
            editTodo: todo
        })


    }
    handleOnChangeEditTodo = (event) => {
        let editTodoCopy = { ...this.state.editTodo }
        editTodoCopy.doing = event.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }
    render() {
        let { ListTodo, editTodo } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        return (
            <div className="list-todo-container">
                <AddTodo
                    addNewTodo={this.addNewTodo}
                >
                </AddTodo>
                <div className='list-todo-content'>
                    {ListTodo && ListTodo.length > 0 &&
                        ListTodo.map((item, index) => {
                            return (

                                <div className="todo-chidl" key={index} >
                                    {isEmptyObj === true ?
                                        <span> {index + 1}-
                                            {item.doing}
                                        </span>
                                        :
                                        <>
                                            {editTodo.id === item.id ?
                                                <span
                                                    onChange={(event) => this.handleOnChangeEditTodo(event)}
                                                >
                                                    {index + 1}-<input value={editTodo.doing} />
                                                </span>
                                                :
                                                <span> {index + 1}-
                                                    {item.doing}
                                                </span>
                                            }
                                        </>
                                    }
                                    <button className='edit'
                                        onClick={() => this.handleEditTodo(item)}
                                    >
                                        {isEmptyObj === false && editTodo.id === item.id ?
                                            'Save'
                                            :
                                            'Edit'
                                        }
                                    </button>
                                    <button className='delete'
                                        onClick={() => this.handleDeleteTodo(item)}
                                    >Delete</button>

                                </div>
                            )
                        })
                    }
                </div>

            </div >
        )
    }
}

export default TodoList;
