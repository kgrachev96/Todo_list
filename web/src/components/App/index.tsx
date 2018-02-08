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
            todos: [],
        };

        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.searchBy = this.searchBy.bind(this);
    }

    public componentDidMount() {
        axios.get("http://localhost:3000/api/initial")
            .then((res: any) => {
                const newTodo = res.data;
                this.setState({ todos: newTodo });
            })
            .catch(this.handleError);
    }

    public handleStatusChange(id: any) {
        axios.patch(`http://localhost:3000/api/todoStatus/${id}`)
            .then((response) => {
                const todos = this.state.todos.map((todo: any) => {
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
        axios.post("http://localhost:3000/api/todoAdd", { title })
            .then((res: any) => res.data)
            .then((todo) => {
                const todos = [...this.state.todos, todo];
                this.setState({ todos });
            })
            .catch(this.handleError);
    }

    public handleError(error: string) {
        console.error(error);
    }

    public handleEdit(id: any, title: any) {
        axios.put(`http://localhost:3000/api/todoSave/${id}`, { title })
            .then((response) => {
                const todos = this.state.todos.map((todo: any) => {
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
        axios.delete(`http://localhost:3000/api/todoDelete/${id}`)
            .then(() => {
                const todos = this.state.todos.filter((todo: any) => todo.id !== id);
                this.setState({ todos });
            })
            .catch(this.handleError);
    }

    public searchBy(searchTodo: any, filter: Array<{ id: number, title: string, completed: boolean }>) {
        (searchTodo !== "") ? this.setState({ todos: filter }) : this.componentDidMount();
    }

    public render() {

        return (

            <main>
                <Search searchBy={this.searchBy} todos={this.state.todos} />
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
                    {this.state.todos.map((todo: any) => (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onStatusChange={this.handleStatusChange}
                            onDelete={this.handleDelete}
                            onEdit={this.handleEdit}
                        />

                    ))}

                </ReactCSSTransitionGroup>

                <Form onAdd={this.handleAdd} />

            </main>
        );
    }
}
