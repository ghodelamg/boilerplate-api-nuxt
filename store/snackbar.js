const initialState = () => ({
    msg: '',
    snackbar: false,
})

export const state = initialState;

export const mutations = {
    setMsg(state, payload) {
        state.msg = payload;
        state.snackbar = true;
    },
    clearStore(state) {
        state.msg = '';
        state.snackbar = false;
    },
}