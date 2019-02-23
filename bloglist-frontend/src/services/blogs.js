
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async NewObject  => {
  const config = {
    headers : {Authorization: token},
  }


  const response = await axios.post(baseUrl,NewObject,config)
  return response.data
}

const update = async (id,UpdatedObject) => {
 
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url,UpdatedObject)
  return response.data

}


const remove = async (id) => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers : {Authorization: token},
  }
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, setToken, update, remove }