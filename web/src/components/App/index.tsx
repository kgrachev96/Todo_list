import axios from "axios";
import * as React from "react";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as ReactDOM from "react-dom";

import Form from "../Form";
import Head from "../Header";
import Search from "../Search";
import Todo from "../Todo";

export default class App extends React.Component<IMProp, IMState> {
    constructor(props: any) {
        super(props);

        this.state = {
            filteredTodos: [],
            todos: [],
        };

        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.filterBy = this.filterBy.bind(this);
    }

    public componentDidMount() {
        axios.get("localhost:3000/api/todo")
            .then((response: any) => response.data)
            .then((todos: any) => this.setState({ todos, filteredTodos: todos }))
            .catch(this.handleError);
    }

    public handleStatusChange(id: any) {
        axios.patch(`localhost:3000/api/todo${id}`)
            .then((response) => {
                const todos = this.state.todos.map((todo: Itodo) => {
                    if (todo.id === id) {
                        todo = response.data;
                    }

                    return todo;
                });

                this.setState({ todos });
            })
            .catch(this.handleError);

    }

    public handleAdd(title: string) {
        axios.post("localhost:3000/api/todo", { title })
            .then((response) => response.data)
            .then((todo) => {
                const todos = [...this.state.todos, todo];
                this.setState({ todos });
            })
            .catch(this.handleError);
    }

    public handleError(error: any) {
        console.error(error);
    }

    public handleEdit(id: any, title: any) {
        axios.put(`localhost:3000/api/todo${id}`, { title })
            .then((response) => {
                const todos = this.state.todos.map((todo: Itodo) => {
                    if (todo.id === id) {
                        todo = response.data;
                    }
                    return todo;
                });
                this.setState({ todos });
            })
            .catch(this.handleError);
    }

    public handleDelete(id: any) {
        axios.delete(`localhost:3000/api/todo${id}`)
            .then(() => {
                const todos = this.state.todos.filter((todo: Itodo) => todo.id !== id);
                this.setState({ todos });
            })
            .catch(this.handleError);
    }

    public filterBy(field: any, value: any) {
        if (value !== "") {
            const filteredTodos = this.state.todos.filter((todo: Itodo) => todo[field].includes(value));
            this.setState({ filteredTodos });
        } else {
            this.setState({ filteredTodos: this.state.todos });
        }
    }

    public render() {

        return (

            <main>
                <Search filterBy={this.filterBy} />
                <Head
                    text="Список задач"
                    todos={this.state.todos}
                />
                <ReactCSSTransitionGroup
                    component="section"
                    className="list-todo"
                    transitionName="slide"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {this.state.todos.map((todo: Itodo) => (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onStatusChange={this.handleStatusChange}
                            onDelete={this.handleDelete}
                            onEdit={this.handleEdit}
                        />))}

                </ReactCSSTransitionGroup>
                <Form onAdd={this.handleAdd} />

            </main>
        );
    }
}
