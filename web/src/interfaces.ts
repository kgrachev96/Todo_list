// Main app
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
}

// Button
interface IBProp {
    text?: string;
    icon?: string;
    className?: string;
    onClick?: any;
    onBlur?: any;
    children?: any;
    type?: any;
}

// Checkbox
interface ICProp {
    text?: string;
    checked?: boolean;
    onChange: any;
}

interface ICState {
    checked?: boolean;
}

// Form
interface IFProp {
    type?: any;
    onAdd: any;
}

// Header
interface IHProp {
    text?: string;
    todos: any;
}

// Todo
interface IProp {
    completed: boolean;
    onStatusChange: any;
    onDelete: any;
    onEdit: any;
    defaultValue?: any;
    title: any;
    id: any;
}
