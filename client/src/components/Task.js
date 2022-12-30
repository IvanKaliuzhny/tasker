import React, { useState } from "react";
import {Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton} from "@chakra-ui/react";

export default function Task(props) {
    const { addTask, deleteTask, moveTask, task } = props;
    const [showAlert, setShowAlert] = useState(false)
    const [collapsed, setCollapsed] = useState(task.isCollapsed);
    const [formAction, setFormAction] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (formAction === "save") {
            if (collapsed) {
                setCollapsed(false);
            } else {
                let newTask = {
                    id: task.id,
                    title: event.target.elements.title.value,
                    description: event.target.elements.description.value,
                    status: task.status,
                    isCollapsed: true
                };
                console.log(newTask)
                if (newTask.title === '' || newTask.description === '') {
                    setShowAlert(true);
                    return
                }

                addTask(newTask);
                setCollapsed(true);
            }
        }

        if (formAction === "delete") {
            deleteTask(task.id);
        }
    }

    function handleMoveLeft() {
        let newStatus = "";

        if (task.status === "In Progress") {
            newStatus = "Backlog";
        } else if (task.status === "Done") {
            newStatus = "In Progress";
        }

        if (newStatus !== "") {
            moveTask(task.id, newStatus);
        }
    }

    function handleMoveRight() {
        let newStatus = "";

        if (task.status === "Backlog") {
            newStatus = "In Progress";
        } else if (task.status === "In Progress") {
            newStatus = "Done";
        }

        if (newStatus !== "") {
            moveTask(task.id, newStatus);
        }
    }

    return (
        <>
            {showAlert && (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>Please fill title and description fields!</AlertDescription>
                    <CloseButton onClick={() => setShowAlert(false)} position="absolute" right="8px" top="8px" />
                </Alert>
            )}

            <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
                {collapsed && <button onClick={handleMoveLeft} className="button moveTask">
                    &#171;
                </button>}
                <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
                    <input
                        type="text"
                        className="title input"
                        name="title"
                        placeholder="Please enter task title here"
                        disabled={collapsed}
                        defaultValue={task.title}
                    />
                    <textarea
                        rows="2"
                        className="description input"
                        name="description"
                        placeholder="Please enter task description here"
                        defaultValue={task.description}
                    />
                    <button
                        onClick={() => {
                            setFormAction("save");
                        }}
                        className="button"
                    >
                        {collapsed ? "Edit" : "Save"}
                    </button>
                    {collapsed && (
                        <button
                            onClick={() => {
                                setFormAction("delete");
                            }}
                            className="button delete"
                        >
                            x
                        </button>
                    )}
                </form>
                {collapsed && <button onClick={handleMoveRight} className="button moveTask">
                    &#187;
                </button>}
            </div>
        </>
    );
}