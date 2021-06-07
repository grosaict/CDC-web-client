import axios from 'axios';

// >>>>>>>>>>>>>>>          KID                     <<<<<<<<<<<<<<<


export const getKids = async () => {
    try {
         const { data } = await axios.get('http://localhost:5000/api/kid/', {
            headers: { token: localStorage.getItem('token') }
        });
        return data
    } catch (err) {
        return (err.response)
    }
} 

export const getKidById = async (id) => {
    try {
        return await axios.get(`http://localhost:5000/api/kid/${id}`, {
            headers: { token: localStorage.getItem('token') }
        });
    } catch (err) {
        return (err.response)
    }
} 

export const createKid = async (data) => {
    try {
        return await axios.post('http://localhost:5000/api/kid/', data, {
        headers: {'Content-Type': 'application/json'/* 'multipart/form-data' */, token: localStorage.getItem('token') }
    });
    } catch (err) {
        return (err.response)
    }
}

export const updateKid = async (id, data) => {
    try {
        return await axios.put(`http://localhost:5000/api/item/edit/${id}`, data, {
        headers: {'Content-Type': 'multipart/form-data', token: localStorage.getItem('token') }
    });
    } catch (err) {
        return (err.response)
    }
}

export const getKidByMeasureId = async (id) => {
    try {
        return await axios.get(`http://localhost:5000/api/kid/measure/${id}`, {
            headers: { token: localStorage.getItem('token') }
        });
    } catch (err) {
        return (err.response)
    }
} 

// >>>>>>>>>>>>>>>          MEASURE                 <<<<<<<<<<<<<<<

// >>>>>>>>>>>>>>>          LOGIN and USER          <<<<<<<<<<<<<<<

export const userLogin = async (data) => {
    try {
        return await axios.post(`http://localhost:5000/api/login/`, data);
    } catch (err) {
        return (err.response)
    }
}

export const createUser = async (data) => {
    try {
        return await axios.post(`http://localhost:5000/api/user/`, data);
    } catch (err) {
        return (err.response)
    }
}