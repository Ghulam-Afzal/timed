import axios from 'axios'; 

const baseUrl = 'http://localhost:8080/api/tasks'

let token = null 


const setToken = newToken => {
    token = `bearer ${newToken}`
}


const getAll = async () => { 
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (title, taskTime, userId) => {
    const config = {
        headers: { authorization: token}
    }
    const object = { title, taskTime, userId }
    const response = await axios.post(baseUrl, object, config)
    return response.data
}


export default { 
    getAll,
    createNew, 
    setToken
}