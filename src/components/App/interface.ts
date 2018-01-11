interface IMProp {
    filterBy?: any;
}

interface IMState {
    todos: any;
    filteredTodos: any;
}

interface Itodo {
    id: string;
    title: string;
    completed: boolean;
    [field: string]: any;
}
