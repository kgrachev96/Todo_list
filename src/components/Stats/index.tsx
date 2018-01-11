import * as React from "react";

export default class Stats extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        const total = this.props.todos.length;
        const completed = this.props.todos.filter((todo: Itodo) => todo.completed).length;
        const notCompleted = total - completed;

        return (
            <table className="stats">
                <tbody>
                    <tr>
                        <th>Всего задач:</th>
                        <td>{total}</td>
                    </tr>
                    <tr>
                        <th>Выполнено:</th>
                        <td>{completed}</td>
                    </tr>
                    <tr>
                        <th>Осталось:</th>
                        <td>{notCompleted}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
