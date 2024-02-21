import axiosClient from "./axiosClient"

const userApi = {
    getAll: ({page = 1, limit, sort = { createdAt: -1 }, query = null}) => {
        const url = 'users/'
        return axiosClient.get(url, { params: {page, limit, sort, query}})
    },
    getById: (id) => {
        const url = `users/${id}`
        return axiosClient.get(url)
    },
    createStaff: (data) => {
        const url = `users/staff`
        return axiosClient.post(url, data)
    },
    updateById: (id, data) => {
        const url = `users/${id}`
        return axiosClient.put(url, data)
    },
    updateAvatar: (id, data) => {
        const url = `users/${id}/avatar`
        return axiosClient.put(url, data)
    },
    deleteById: (id, addressId) => {
        const url = `users/${id}/address/${addressId}`
        return axiosClient.delete(url)
    },

}

export default userApi