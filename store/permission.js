const baseUrl = '/api/v1/';
const initialState = () => ({
    permissions: [],
    userPermissions: [],
    permissionDialog: false,
})
export const state = initialState;

export const mutations = {
    setPermissions(state, param) {
        state.permissions = param;
    },
    clearPermissions(state) {
        state.permissions = [];
    },
    setUserPermissions(state, param) {
        state.userPermissions = param;
    },
    setPermissionDialog(state, payload) {
        state.permissionDialog = payload;
    },
    /** Update specific user permission when receive channel event
     * @param state
     * @param payload
     */
    updatePermission(state, payload) {
        let permissionList = JSON.parse(JSON.stringify(state.userPermissions));
        let index = permissionList.findIndex(x => x.id == payload[0].id);
        permissionList[index] = payload[0];
        if (index != -1) {
            state.userPermissions = permissionList;
            state.permissions = permissionList;
        }
    },
}
export const actions = {
    /**
          * Used for set/unset permission
          * @param commit
          * @param param
          */
    // eslint-disable-next-line no-unused-vars
    edit({ commit }, param) {
        return new Promise((resolve, reject) => {
            HTTP.post(`${baseUrl}set_unset_permission_to_role`, param).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
     * Used to get role by permission
     * @param commit
     * @param state - used for edit Id
     * @param param
     */
    getById({ commit }, param) {
        return new Promise((resolve, reject) => {
            HTTP.get(`${baseUrl}get_role_by_permissions/${param}`).then((response) => {
                commit('setPermissions', response.data.data);
                resolve(response.data);
            }).catch((e) => {
                reject(e);
            });
        });
    },

}
export const getters = {

}