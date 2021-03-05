import CustomTable from '~/components/customtable/table';
import { mapState } from 'vuex';
// import DeleteModal from '../../../partials/DeleteModal.vue';
// import ExportBtn from '../../../partials/ExportBtn.vue';
// import MultiDelete from '../../../partials/MultiDelete.vue';
// import AddCity from './AddCity.vue';
import CommonServices from '../../common_services/common';
// import Import from '../../../partials/Import.vue';
// import ErrorModal from '../../../partials/ErrorModal.vue';

export default CustomTable.extend({
    name: 'City',
    data() {
        const self = this;
        return {
            tab: 'tab1',
            files: [],
            modalOpen: false,
            addCityModal: false,
            isImportLoaded: false,
            urlApi: 'city/getAll', // set store name here to set/get pagination data and for access of actions/mutation via custom table
            headers: [
                { text: 'City', value: 'name' },
                { text: 'State', value: 'state_id' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            paramProps: {
                idProps: '',
                storeProps: '',
            },
            confirmation: {
                title: '',
                description: '',
                btnCancelText: self.$getConst('BTN_CANCEL'),
                btnConfirmationText: self.$getConst('BTN_OK'),
            },
            deleteProps: {
                ids: '',
                store: '',
            },
            exportProps: {
                id: '',
                store: '',
                fileName: '',
                pagination: '',
            },
            importProps: {
                store: 'city',
                modelName: 'city',
                multiple: false,
            },
            state_id: '',
            filterMenu: false,
            errorArr: [],
            errorDialog: false,
        };
    },
    mixins: [CommonServices],
    components: {
        // DeleteModal,
        // AddCity,
        // ExportBtn,
        // MultiDelete,
        // Import,
        // ErrorModal,
    },
    computed: {
        ...mapState({
            setStateList: (state) => state.states.stateList,
            pagination: (state) => state.city.pagination,
        }),
    },
    watch: {
    },
    created() {


    },
    methods: {
        /**
             * Export data in CSV file
             */
        setExport() {
            const rowIds = [];
            this.selected.forEach((element, index) => {
                rowIds[index] = element.id;
            });

            this.exportProps.ids = rowIds;
            this.exportProps.store = 'city';
            this.exportProps.fileName = 'City';
            this.exportProps.pagination = JSON.parse(JSON.stringify(this.pagination));
            this.$refs.exportbtn.exportToCSV();
        },
        /*
            * Add City Modal method
            * */
        addCity() {
            this.addCityModal = true;
        },
        /*
            * Edit city Modal
            * */
        editItem(id) {
            // this.$store.dispatch(ADD_BODY_CLASSNAME, 'page-loading');
            // set the edit id in store
            this.$store.commit('city/setEditId', id);
            // get by id to open and edit the role of particular id
            this.$store.dispatch('city/getById', id).then((response) => {
                // this.$store.dispatch(REMOVE_BODY_CLASSNAME, 'page-loading');
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = true;
                } else {
                    this.addCityModal = true;
                }
            }, (error) => {
                // this.$store.dispatch(REMOVE_BODY_CLASSNAME, 'page-loading');
                this.errorArr = this.getModalAPIerrorMessage(error);
                this.errorDialog = true;
            });
        },
        /**
             * Delete Data from row
             * @param id
             */
        deleteItem(id) {
            this.paramProps.idProps = id;
            this.paramProps.storeProps = 'city';
            this.confirmation.title = this.$getConst('DELETE_TITLE');
            this.confirmation.description = this.$getConst('WARNING');
            this.modalOpen = true;
        },
        /**
             * Multiple Delete
             */
        multipleDelete() {
            const rowIds = [];
            this.selected.forEach((element, index) => {
                rowIds[index] = element.id;
            });

            this.deleteProps.ids = rowIds;
            this.deleteProps.store = 'city';
            this.$refs.multipleDeleteBtn.deleteMulti();
        },
        /**
             * Filter
             */
        changeFilter() {
            const filter = {};
            if (this.state_id != '') {
                filter.state_id = [this.state_id];
            }
            this.filterModel = filter;
            this.refresh();
            this.filterMenu = false;
        },
        /**
             * Reset Filter
             */
        resetFilter() {
            this.state_id = '';
            this.changeFilter();
        },
        /**
             *Refresh data on tab Click
             */
        refreshData() {
            // const self = this;
            // setTimeout(function () {
            //     if (self.tab == 'tab1') {
            //         self.refresh();
            //     } else if (self.tab == 'tab2' && self.$refs.importdata) {
            //         if (this.isImportLoaded) {
            //             self.$refs.importdata.refreshImport();
            //         }
            //         this.isImportLoaded = true;
            //     }
            // }, 100);
        },
    },
    mounted() {
        this.$store.commit('city/clearStore');
        this.isImportLoaded = false;
        this.$store.dispatch('states/getAll', { isLight: 1 }).then((response) => {
            if (response.error) {
                this.errorArr = response.data.error;
                this.errorDialog = true;
            } else {
                this.$store.commit('states/setStateList', response.data);
            }
        }, (error) => {
            this.errorArr = this.getModalAPIerrorMessage(error);
            this.errorDialog = true;
        });
        // Listening events in city public channel
        // window.Echo.channel('manage-city').listen('ManageCity', (e) => {
        //     this.refresh();
        // });
    },
    beforeDestroy() {
        this.$store.commit('city/clearStore');
    },
});
