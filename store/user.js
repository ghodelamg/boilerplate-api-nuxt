const loginUrl = '/api/v1/login';
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
    roleList: [],
    currentUserData: {},

    model: {
        name: '',
        email: '',
        password: '',
        mobile_no: '',
        role_id: '',
        profile: '',
        profile_upload: null,
        gender: '',
        dob: '',
        address: '',
        country_id: '',
        state_id: '',
        city_id: '',
        gallery: [],
        hobby: [],
    },
    editId: 0,
    galleryList: [],
})

export const state = initialState;

export const mutations = {
    setPagination(state, payload) {
        state.pagination = payload;
    },
    setTableData(state, payload) {
        state.tableData = payload;
    },
    removeAuthorization(state, payload) {
        state.currentUserData.authorization = payload;
    },
    clearUserData(state) {
        state.currentUserData = {};
    },
    setCurrentUserData(state, payload) {
        state.currentUserData = payload;
    },

    setEditId(state, payload) {
        state.editId = payload;
    },
    setModel(state, param) {
        state.model = param.model;
        state.model.name = param.model.name;
        state.model.email = param.model.email;
        state.model.mobile_no = param.model.mobile_no;
        state.model.role_id = param.model.role_id;
        state.model.profile = param.model.profile;
        state.model.profile_upload = null;
        state.model.gender = param.model.gender;
        state.model.dob = param.model.dob;
        state.model.address = param.model.address;
        state.model.country_id = param.model.country_id;
        state.model.state_id = param.model.state_id;
        state.model.city_id = param.model.city_id;
        state.galleryList = state.model.gallery;
        state.model.gallery = [];
        state.model.hobbies = param.model.hobby;
        state.model.hobby = [];
        for (let i = 0; i < param.model.hobbies.length; i++) {
            state.model.hobby[i] = param.model.hobbies[i].id;
        }
    },
    setGalleryImageList(state, payload) {
        state.galleryList = payload;
    },
    clearStore(state) {
        const s = initialState();
        state.model = s.model;
        state.editId = s.editId;
    },
    clearModel(state) {
        const s = initialState();
        state.model = s.model;
    },
}

export const actions = {
    // eslint-disable-next-line no-unused-vars
    login({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$post(loginUrl, param.loginDetail).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },
    userLogout() {
        return new Promise((resolve, reject) => {
            this.$axios.$get(`${baseUrl}logout`).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },
    logoff({ commit }, param) {
        commit('removeAuthorization', param);
    },

    /**
         * Used to get all user
         * @param commit
         * @param param
         */
    // eslint-disable-next-line no-unused-vars
    getAll({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$get(`${baseUrl}users?page=${param.page ? param.page : 1}&per_page=${param.limit ? param.limit : ''}&search=${param.query ? param.query : ''}&filter=${param.filter ? param.filter : ''}&sort=${param.orderBy ? param.orderBy : ''}&order_by=${param.ascending == 1 ? 'asc' : 'desc'}`).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
         * Used for registration
         * @param commit
         * @param param
         */
    // eslint-disable-next-line no-unused-vars
    register({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$post(`${baseUrl}register`, param.model).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },
    /**
         * Used for user create ()
         * @param commit
         * @param param
         */
    // eslint-disable-next-line no-unused-vars
    create({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$post(`${baseUrl}users`, param.model).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },
    /**
         * Used to get a particular user record
         * @param commit
         * @param state - used for edit Id
         */
    getById({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.$get(`${baseUrl}users/${state.editId}`).then((response) => {
                commit('setModel', { model: response.data.data });
                resolve(response.data);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
         * Used for edit user
         * @param commit
         * @param param
         */
    // eslint-disable-next-line no-unused-vars
    edit({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$post(`${baseUrl}users/${param.editId}`, param.model).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
         * Used for delete user
         * @param commit
         * @param param
         */
    // eslint-disable-next-line no-unused-vars
    delete({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$delete(`${baseUrl}users/${param}`).then((response) => {
                resolve(response.data);
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
            this.$axios.$post(`${baseUrl}users-delete-multiple`, param).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
         * Used for delete gallery image
         * @param commit
         * @param param
         */
    // eslint-disable-next-line no-unused-vars
    deleteImage({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$delete(`${baseUrl}gallery/${param}`).then((response) => {
                resolve(response);
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
            this.$axios.$get(`${baseUrl}users-export?page=${param.page ? param.page : 1}&filter=${param.filter ? param.filter : ''}&search=${param.query ? param.query : ''}&sort=${param.orderBy ? param.orderBy : ''}&order_by=${param.ascending == 1 ? 'asc' : 'desc'}`).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },
    /**
         * Used for import functionality (upload file)
         * @param commit
         * @param param
         */
    // eslint-disable-next-line no-unused-vars
    import({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$post(`${baseUrl}users-import-bulk`, param).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
         * Used to display import history
         * @param commit
         * @param param
         */
    // eslint-disable-next-line no-unused-vars
    getAllImport({ commit }, param) {
        return new Promise((resolve, reject) => {
            this.$axios.$get(`${baseUrl}import-csv-log?page=${param.page}&per_page=${param.limit}&search=${param.query}&filter=${param.filter}&sort=${param.orderBy}&order_by=${param.ascending == 1 ? 'asc' : 'desc'}`).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
         * Used for display particular import history
         * @param commit
         * @param state
         */
    // eslint-disable-next-line no-unused-vars
    getByImportId({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.$get(`${baseUrl}import-csv-log/${state.editId}`).then((response) => {
                resolve(response.data);
            }).catch((e) => {
                reject(e);
            });
        });
    },
}

export const getters = {}