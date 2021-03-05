const baseUrl = '/api/v1/';

const initialState = () => ({
    pagination: {
        query: '',
        page: 1,
        limit: 10,
        orderBy: '',
        ascending: true,
        filter: '',
    },
    tableData: [],
    list: [],
    cityList: [],
    model: {
        state_id: '',
        name: '',
        remark: '',
    },
    editId: 0,
})
export const state = initialState;

export const mutations = {
    setPagination(state, payload) {
        state.pagination = payload;
    },
    setTableData(state, payload) {
        state.tableData = payload;
    },
    setList(state, payload) {
        state.list = payload;
    },
    setEditId(state, payload) {
        state.editId = payload;
    },
    setModel(state, param) {
        state.model = param.model;
    },
    setCityList(state, payload) {
        state.cityList = payload;
    },
    clearStore(state) {
        state.model = {
            name: '',
            remark: '',
        };
        state.editId = 0;
    },
}
export const actions = {
    /**
     * Used for add city
     * @param commit
     * @param param
     */
    // eslint-disable-next-line no-unused-vars
    add({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$post(`${baseUrl}cities`, param.model).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
     * Used for edit city
     * @param commit
     * @param param
     */
    // eslint-disable-next-line no-unused-vars
    edit({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$put(`${baseUrl}cities/${param.editId}`, param.model).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
     * Used to get all city
     * @param commit
     * @param param
     */
    // eslint-disable-next-line no-unused-vars
    getAll({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$get(`${baseUrl}cities?page=${param.page ? param.page : 1}&per_page=${param.limit ? param.limit : ''}&filter=${param.filter ? param.filter : ''}&search=${param.query ? param.query : ''}&is_light=${param.isLight ? param.isLight : ''}&sort=${param.orderBy ? param.orderBy : ''}&order_by=${param.ascending == 1 ? 'asc' : 'desc'}`).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
     * Used for delete city
     * @param commit
     * @param param
     */
    // eslint-disable-next-line no-unused-vars
    delete({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$delete(`${baseUrl}cities/${param}`).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
     * Used for multiple delete
     * @param commit
     * @param param
     */
    // eslint-disable-next-line no-unused-vars
    multiDelete({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$post(`${baseUrl}cities-delete-multiple`, param).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
     * Used to get a particular city record
     * @param commit
     * @param state - used for edit Id
     */
    getById({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.$get(`${baseUrl}cities/${state.editId}`).then((response) => {
                commit('setModel', { model: response.data.data });
                resolve(response.data);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
     * Used for export functionality
     * @param commit
     * @param param
     */
    // eslint-disable-next-line no-unused-vars
    export({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$get(`${baseUrl}cities-export?page=${param.page ? param.page : 1}&filter=${param.filter ? param.filter : ''}&search=${param.query ? param.query : ''}&sort=${param.orderBy ? param.orderBy : ''}&order_by=${param.ascending == 1 ? 'asc' : 'desc'}`).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

}
export const getters = {

}