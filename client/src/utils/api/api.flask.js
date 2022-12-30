import {serverURI} from "../../config/api.config";
import axios, {AxiosRequestConfig} from "axios";

const buildResponse = (statusCode, body) => {
    return {
        statusCode : statusCode,
        headers : {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
        },
        body : JSON.stringify(body)
    }
}

export const userRegister = ({username, email, password} : {username: any, email: any, password: any}): Promise<any> => {
    const request = {
        username: username,
        email: email,
        password: password
    };
    return axios.post(serverURI + "/signup", request)
}

export const userLogin = ({email, password} : {email: any, password: any}): Promise<any> => {
    const request = {
        email: email,
        password: password
    };
    return axios.post(serverURI + "/signin", request)
}

export const getAllTasks = (): Promise<any> => {
    const options: { headers: { Authorization: string; "Content-Type": string }; method: string; url: string } = {
        url: serverURI + "/tasks",
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
    };
    return axios(options)
}

export const createNewTask = ({title, description, status}: {title: any, description: any, status: any}): Promise<any> => {
    const options: { headers: { Authorization: string; "Content-Type": string }; method: string; data: { description: any; title: any; status: any }; url: string } = {
        url: serverURI + "/tasks",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
            title: title,
            description: description,
            status: status,
        },
    };
    return axios(options)
}

export const updateTask = ({title, description, status, taskId}: {title: any, description: any, status: any, taskId: any}): Promise<any> => {
    const options: { headers: { Authorization: string; "Content-Type": string }; method: string; data: { description: any; title: any; status: any }; url: string } = {
        url: serverURI + "/tasks/" + taskId,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
            title: title,
            description: description,
            status: status,
        },
    };
    return axios(options)
}

export const removeTask = ({taskId}: {taskId: any}): Promise<any> => {
    const options: { headers: { Authorization: string; "Content-Type": string }; method: string; url: string } = {
        url: serverURI + "/tasks/" + taskId,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
    };
    return axios(options)
}

export const shareTasksWith = ({toUsername}: {toUsername: any}): Promise<any> => {
    const options: { headers: { Authorization: string; "Content-Type": string }; method: string; data: { to_username: any }; url: string } = {
        url: serverURI + "/tasks/share",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
            to_username: toUsername,
        },
    };
    return axios(options)
}

export const getAllUsers = (): Promise<any> => {
    const options: { headers: { Authorization: string; "Content-Type": string }; method: string; url: string } = {
        url: serverURI + "/users",
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
    };
    return axios(options)
}