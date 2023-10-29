//modularize all axios calls
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  //request holds promise object returned by axios.__()
  const request = axios.get(baseUrl)
  //upon successful request, return response's data field only
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  //implementation of specific url done here
  //(based on which 'make important' button in map.notes() is pressed)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }
