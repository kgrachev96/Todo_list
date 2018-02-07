import * as React from "react";

export default class Search extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    public handleChange(event: any) {
        const searchTodo = event.target.value;
        const filter = this.props.todos.filter((todo: any) => todo.title.toLowerCase().startsWith(searchTodo.toLowerCase()));
        this.props.searchBy(searchTodo, filter);
    }

    public render() {
        return (
            <form className="search">
                <input
                    className="search_todo"
                    placeholder="Что нужно найти?"
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}
