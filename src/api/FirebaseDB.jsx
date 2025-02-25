import axios from "axios";

const api = axios.create({
    // baseURL: 'https://task-management-vinn-default-rtdb.firebaseio.com'
    baseURL: 'https://task-manager-clone-default-rtdb.firebaseio.com/'
})


// create data into firebase -- done
export const postApi = (taskData) =>{   
    return api.post('/task-manager.json', taskData)
}

// get / read data from firebase
export const getApi = () =>{
    return api.get('/task-manager.json')
}

// delete data from firebase
export const deleteApi = (id) =>{
    return api.delete(`/task-manager/${id}.json`)
}

// multiple delete data from firebase
export const multiDeleteApi = (ids) =>{
    return ids.map((id) => api.delete(`/task-manager/${id}.json`))
}

//edit / update data from firebase
export const putApi = (id, value) =>{
    return api.put(`/task-manager/${id}.json`, value)
}