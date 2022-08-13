import axios from "axios";

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://flashcards-backend-tkassabian.glitch.me'

const axiosInstance = axios.create({ baseURL: BASE_URL })

const getAll = async url => {
	const { data } = await axiosInstance.get(url)
	return data
}

const get = async url => {
	const { data } = await axiosInstance.get(url)
	return data
}

const remove = async (url) => {
	const data = await axiosInstance.delete(url)
	return data
}

const add = async (url, item) => {
	const { data } = await axiosInstance.post(url, item)
	return data
}

const update = async (url, item) => {
	const { data } = await axiosInstance.put(url, item)
	return data
}

export { getAll, remove, add, update, get }