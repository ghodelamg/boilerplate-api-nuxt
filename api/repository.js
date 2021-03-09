// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default $axios => () => ({
    index(url, param) {
        return $axios.$get(`${url}?page=${param.page ? param.page : 1}&per_page=${param.limit ? param.limit : ''}&filter=${param.filter ? param.filter : ''}&search=${param.query ? param.query : ''}&is_light=${param.isLight ? param.isLight : ''}&sort=${param.orderBy ? param.orderBy : ''}&order_by=${param.ascending == 1 ? 'asc' : 'desc'}`)
    },

    show(url, id) {
        return $axios.$get(`${url}/${id}`)
    },

    create(url, param) {
        return $axios.$post(`${url}`, param.model)
    },

    update(url, param) {
        return $axios.$put(`${url}/${param.editId}`, param.model)
    },

    delete(url, id) {
        return $axios.$delete(`${url}/${id}`)
    },

    multiDelete(url, param) {
        return $axios.$post(`${url}`, param)
    },

    import(url, param) {
        return $axios.$post(`${url}`, param)
    },

    getAllImport(url, param) {
        return $axios.$get(`${url}`, param)
    },

    export(url, param) {
        return $axios.$get(`${url}?page=${param.page ? param.page : 1}&filter=${param.filter ? param.filter : ''}&search=${param.query ? param.query : ''}&sort=${param.orderBy ? param.orderBy : ''}&order_by=${param.ascending == 1 ? 'asc' : 'desc'}`)
    }
})
