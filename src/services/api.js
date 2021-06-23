import axios from 'axios';


// >>>>>>>>>>>>>>>          LOGIN and USER          <<<<<<<<<<<<<<<

export const userLogin = async (data) => {
    try {
        return await axios.post(`${process.env.REACT_APP_API_URL}/api/login/`, data);
    } catch (err) {
        return (err.response)
    }
}

export const createUser = async (data) => {
    try {
        return await axios.post(`${process.env.REACT_APP_API_URL}/api/user/`, data);
    } catch (err) {
        return (err.response)
    }
}

// >>>>>>>>>>>>>>>          KID                     <<<<<<<<<<<<<<<

export const getKids = async () => {
    try {
         const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/kid/`, {
            headers: { token: localStorage.getItem('token') }
        });
        return data
    } catch (err) {
        return (err.response)
    }
} 

export const getKidById = async (id) => {
    try {
        return await axios.get(`${process.env.REACT_APP_API_URL}/api/kid/${id}`, {
            headers: { token: localStorage.getItem('token') }
        });
    } catch (err) {
        return (err.response)
    }
} 

export const createKid = async (data) => {
    try {
        return await axios.post(`${process.env.REACT_APP_API_URL}/api/kid/`, data, {
        headers: {'Content-Type': 'application/json'/* 'multipart/form-data' */, token: localStorage.getItem('token') }
    });
    } catch (err) {
        return (err.response)
    }
}

export const updateKid = async (id, data) => {
    try {
        return await axios.put(`${process.env.REACT_APP_API_URL}/api/kid/update/${id}`, data, {
        headers: {'Content-Type': 'application/json'/* 'multipart/form-data' */, token: localStorage.getItem('token') }
    });
    } catch (err) {
        return (err.response)
    }
}

// >>>>>>>>>>>>>>>          MEASURE                 <<<<<<<<<<<<<<<

export const getKidByMeasureId = async (id) => {
    try {
        return await axios.get(`${process.env.REACT_APP_API_URL}/api/kid/measure/${id}`, {
            headers: { token: localStorage.getItem('token') }
        });
    } catch (err) {
        return (err.response)
    }
}

export const updateMeasure = async (id, data) => {
    try {
        return await axios.put(`${process.env.REACT_APP_API_URL}/api/measure/update/${id}`, data, {
        headers: {'Content-Type': 'application/json', token: localStorage.getItem('token') }
    });
    } catch (err) {
        return (err.response)
    }
}

// >>>>>>>>>>>>>>>          VACCINE                 <<<<<<<<<<<<<<<

export const getKidByVaccineId = async (id) => {
    try {
        return await axios.get(`${process.env.REACT_APP_API_URL}/api/kid/vaccine/${id}`, {
            headers: { token: localStorage.getItem('token') }
        });
    } catch (err) {
        return (err.response)
    }
}

export const updateVaccine = async (id, data) => {
    try {
        return await axios.put(`${process.env.REACT_APP_API_URL}/api/vaccine/update/${id}`, data, {
        headers: {'Content-Type': 'application/json', token: localStorage.getItem('token') }
    });
    } catch (err) {
        return (err.response)
    }
}

export const newVaccine = async (data) => {
    try {
        return await axios.post(`${process.env.REACT_APP_API_URL}/api/vaccine/`, data, {
        headers: {'Content-Type': 'application/json', token: localStorage.getItem('token') }
    });
    } catch (err) {
        return (err.response)
    }
}

export const deleteVaccine = async (id) => {
    try {
        return await axios.delete(`${process.env.REACT_APP_API_URL}/api/vaccine/delete/${id}`, {
        headers: { token: localStorage.getItem('token') }
    });
    } catch (err) {
        return (err.response)
    }
}