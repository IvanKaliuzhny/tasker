import React, {useEffect, useState} from 'react';
import StatusLine from "./StatusLine";
import NavBar from "./NavBar";
import {createNewTask, getAllTasks, removeTask, updateTask} from "../utils/api/api.flask";
import {Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton} from "@chakra-ui/react";
import {IntToTaskStatus, TaskStatusToInt} from "../constants/statuses";

const Board = () => {
    const [showAlert, setShowAlert] = useState(false)
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasksFromAPI();
    }, []);

    function addEmptyTask(status) {
        setTasks((tasks) => [
            ...tasks,
            {
                id: undefined,
                title: "",
                description: "",
                status: status
            }
        ]);
    }

    function addTask(taskToAdd) {
        let filteredTasks = tasks.filter((task) => {
            return task.id !== taskToAdd.id;
        });
        let newTaskList = [...filteredTasks, taskToAdd];
        setTasks(newTaskList);

        saveTaskInAPI(taskToAdd);
    }

    function deleteTask(taskId) {
        let filteredTasks = tasks.filter((task) => {
            return task.id !== taskId;
        });

        setTasks(filteredTasks);

        deleteTaskInAPI(taskId);
    }

    function moveTask(id, newStatus) {
        let task = tasks.filter((task) => {
            return task.id === id;
        })[0];

        let filteredTasks = tasks.filter((task) => {
            return task.id !== id;
        });

        task.status = newStatus;

        let newTaskList = [...filteredTasks, task];

        setTasks(newTaskList);
        saveTaskInAPI(task);
    }

    function saveTaskInAPI(task) {
        if (task.id === undefined) {
            const req = {
                'title': task.title,
                'description': task.description,
                'status': TaskStatusToInt(task.status),
            }
            const resp = createNewTask(req)
            resp.then(response => {
                console.log(`successfully added task: ${response.data.msg}`)
            }).catch(error => {
                setShowAlert(true)
                console.error('add task request error', error)
            });
        } else {
            const req = {
                'title': task.title,
                'description': task.description,
                'status': TaskStatusToInt(task.status),
                'taskId': task.id,
            }
            const resp = updateTask(req)
            resp.then(response => {
                console.log(`successfully updated task: ${response.data.msg}`)
            }).catch(error => {
                setShowAlert(true)
                console.error('update task request error', error)
            });
        }
    }

    function deleteTaskInAPI(taskId) {
        const resp = removeTask({taskId})
        resp.then(response => {
            console.log(`successfully deleted task: ${response.data.msg}`)
        }).catch(error => {
            setShowAlert(true)
            console.error('remove task request error', error)
        });
    }

    function loadTasksFromAPI() {
        const resp = getAllTasks()
        resp.then(response => {
            console.log(`successfully loaded tasks: ${response.data}`)

            let tasksFromAPI = []
            response.data.map((task) => {
                tasksFromAPI.push({
                    id: task.task_id,
                    status: IntToTaskStatus(task.status),
                    title: task.title,
                    description: task.description,
                    isCollapsed: true,
                })
            })
            setTasks(tasksFromAPI)
        }).catch(error => {
            setShowAlert(true)
            console.error('get tasks request error', error)
        });
    }

    return (
        <>
            {showAlert && (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>Some error...</AlertDescription>
                    <CloseButton onClick={() => setShowAlert(false)} position="absolute" right="8px" top="8px" />
                </Alert>
            )}

            <div className="Board">
                <NavBar></NavBar>
                <main>
                    <section>
                        <StatusLine
                            tasks={tasks}
                            addEmptyTask={addEmptyTask}
                            addTask={addTask}
                            deleteTask={deleteTask}
                            moveTask={moveTask}
                            status="Backlog"
                        />
                        <StatusLine
                            tasks={tasks}
                            addEmptyTask={addEmptyTask}
                            addTask={addTask}
                            deleteTask={deleteTask}
                            moveTask={moveTask}
                            status="In Progress"
                        />
                        <StatusLine
                            tasks={tasks}
                            addEmptyTask={addEmptyTask}
                            addTask={addTask}
                            deleteTask={deleteTask}
                            moveTask={moveTask}
                            status="Done"
                        />
                    </section>
                </main>
            </div>
        </>
    );
};

export default Board;