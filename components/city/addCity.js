import { mapState } from 'vuex';
import CommonServices from '../../common_services/common';
import ErrorBlockServer from '~/components/partials/ErrorBlockServer.vue';

export default {
    data() {
        return {
            errorMessage: '',
            validationMessages: {
                city: [{ key: 'required', value: 'City required' }, { key: 'max', value: 'Maximum length should be 191' }],
                state: [{ key: 'required', value: 'State required' }],
            },
            loading: false,
        };
    },
    components: {
        CommonServices,
        ErrorBlockServer,
    },
    props: ['value'],
    mixins: [CommonServices],
    computed: {
        ...mapState({
            setStateList: (state) => state.states.stateList,
            model: (state) => JSON.parse(JSON.stringify(state.city.model)),
            isEditMode: (state) => state.city.editId > 0,
        }),
    },
    methods: {
        /*
            * Submit action of form */
        addAction() {
            this.$validator.validate().then((valid) => {
                if (valid) {
                    // loader enable
                    this.loading = true;
                    // apiName is method to call the from the store
                    let apiName = 'add';
                    let editId = '';
                    let msgType = this.$getConst('CREATE_ACTION');
                    if (this.$store.state.city.editId > 0) {
                        apiName = 'edit';
                        editId = this.$store.state.city.editId;
                        msgType = this.$getConst('UPDATE_ACTION');
                    }
                    const sendData = {
                        state_id: this.model.state_id,
                        name: this.model.name,
                    };
                    this.$store.dispatch(`city/${apiName}`, { model: sendData, editId }).then((response) => {
                        if (response.error) {
                            // loader disable if any error and display the error
                            this.loading = false;
                            this.errorMessage = response.error;
                        } else {
                            // if no error this code wiil execute
                            this.$store.commit('snackbar/setMsg', msgType);
                            this.onCancel();
                            this.$parent.getData();
                            this.loading = false;
                        }
                    }, (error) => {
                        // loader disable if any error and display the error
                        this.loading = false;
                        this.errorMessage = this.getAPIErrorMessage(error.response);
                    });
                }
            });
        },
        onCancel() {
            // clear model
            this.onModalClear('city', 'clearStore');
        },
    },
    mounted() {
        // clear errorMessage
        this.errorMessage = '';
    },
};
