export function IntToTaskStatus(i) {
    switch (i) {
        case 0:
            return 'Backlog';
        case 1:
            return 'In Progress';
        case 2:
            return 'Done';
        default:
            return 'Backlog';
    }
}

export function TaskStatusToInt(status) {
    switch (status) {
        case 'Backlog':
            return 0;
        case 'In Progress':
            return 1;
        case 'Done':
            return 2;
        default:
            return 0;
    }
}