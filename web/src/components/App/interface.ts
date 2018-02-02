interface IMProp {
    filterBy?: any;
}

interface IMState {
    todos: Array<{ id: number, title: string, completed: boolean }>;
}

interface Itodo {
    id: number;
    title: string;
    completed: boolean;
    [field: string]: any;
}
