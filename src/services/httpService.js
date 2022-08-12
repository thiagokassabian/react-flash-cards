import axios from "axios";

const get = async url => {
	const { data } = await axios.get(url)
	return data
}

const remove = async (url, id) => {
	const data = await axios.delete(`${url}/${id}`)
	return data
}

export { get, remove }