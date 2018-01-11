import * as React from "react";

export default class Search extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            searchTodo: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange(event: any) {
        const searchTodo = event.target.value;
        this.setState({ searchTodo });
        if (searchTodo) {
            this.props.filterBy("title", searchTodo);
        }

    }

    public render() {
        return (
            <form className="search">
                <input
                    className="search_todo"
                    type="text"
                    value={this.state.searchTodo}
                    placeholder="Что нужно найти?"
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}
