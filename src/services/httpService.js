import axios from "axios";

const getAll = async url => {
	const { data } = await axios.get(url)
	return data
}

const get = async (url, id) => {
	const { data } = await axios.get(`${url}/${id}`)
	return data
}

const remove = async (url, id) => {
	const data = await axios.delete(`${url}/${id}`)
	return data
}

const add = async (url, item) => {
	const { data } = await axios.post(url, item)
	return data
}

const update = async (url, item) => {
	const { data } = await axios.put(`${url}/${item.id}`, item)
	return data
}

export { getAll, remove, add, update }