import {useNavigate} from "react-router-dom";
import {getAllUsers, shareTasksWith} from "../utils/api/api.flask";
import React, {useEffect, useState} from "react";
import {Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton} from "@chakra-ui/react";

function NavBar() {
    const [needToQuery, setNeedToQuery] = useState(true);
    const [usernames, setUsernames] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showOkStatus, setShowOkStatus] = useState(false);
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("access_token")
        navigate('/sign-in')
    }

    if (needToQuery) {
        const resp = getAllUsers()
        resp.then(response => {
            console.log(`successfully fetched users: ${response.data}`)
            let localUsernames = [];
            response.data.map((user) => {
                localUsernames.push(user.username);
            });
            setUsernames(localUsernames)
            setNeedToQuery(false)
        }).catch(error => {
            setShowAlert(true)
            console.error('get users error', error)
        });
    }

    function handleShare() {
        // it's bad cause it's pure js but i have no time to fix it
        const e = document.getElementById("inputGroupSelectUsername");
        const username = e.options[e.selectedIndex].text;
        if (username !== "Choose...") {
            console.log(username)
        }

        const resp = shareTasksWith({"toUsername": username})
        resp.then(response => {
            setShowOkStatus(true);
            console.log(`successfully shared tasks: ${response.data.msg}`);
        }).catch(error => {
            setShowAlert(true);
            console.error('share tasks error', error);
        });
    }

    return (
        <>
            {showOkStatus && (
                <Alert status='success'>
                    <AlertIcon />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>Tasks successfully shared!</AlertDescription>
                    <CloseButton onClick={() => setShowOkStatus(false)} position="absolute" right="8px" top="8px" />
                </Alert>
            )}

            {showAlert && (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>Some error...</AlertDescription>
                    <CloseButton onClick={() => setShowAlert(false)} position="absolute" right="8px" top="8px" />
                </Alert>
            )}

            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <nav className="navbar">
                            <text style={{color: "white"}} className="navbar-brand mb-0 h1">Scrum Board</text>
                        </nav>
                    </ul>

                    <div className="input-group">
                        <div className="input-group-append">
                            <button onClick={handleShare} style={{marginRight: "10px"}} className="btn btn-primary" type="button">Share tasks with</button>
                        </div>
                        <select className="custom-select" id="inputGroupSelectUsername">
                            <option selected>Choose...</option>
                            {
                                usernames.map((username, ind) => {
                                    return (
                                        <option value="{ind}">{username}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <button onClick={logoutHandler} type="button" className="btn btn-light">Logout</button>
                </div>
            </nav>
        </>
    )
}

export default NavBar;