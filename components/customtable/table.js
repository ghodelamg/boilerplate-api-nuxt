import Vue from 'vue';
import _debounce from 'lodash.debounce';

export default Vue.extend({
    name: 'CustomTable',
    // mixins: [CommonServices],
    data() {
        return {
            loading: false,
            singleSelect: false,
            selected: [],
            stateName: '',
            urlApi: '',
            searchModel: '',
            filterModel: {},
            headers: [],
            options: { mustSort: true },
            footerProps: {
                'items-per-page-options': [10, 20, 30, 50, 100],
            },
        };
    },
    computed: {
        /**
             * return current statename/storename
             * need to be pass from js
             * @returns {*}
             */
        state: function state() {
            const urlArray = this.urlApi != '' ? this.urlApi.split('/') : '';
            // eslint-disable-next-line prefer-destructuring,vue/no-side-effects-in-computed-properties
            this.stateName = urlArray[0];
            return this.$store.state[this.stateName];
        },
        /**
             * return array of objects for table data
             * @returns {*}
             */
        tableData: function tableData() {
            return this.state.tableData.data;
        },
        /**
             * return number of current page
             * @returns {*}
             */
        currentPage: function currentPage() {
            return this.state.tableData.current_page;
        },
        /**
             * return limit/per page value for data table
             * @returns {*}
             */
        limit: function limit() {
            return this.state.pagination.limit;
        },
        /**
             * return total number of items on server for table pagination
             * @returns {number}
             */
        pageCount: function pageCount() {
            return this.state.tableData && this.state.tableData.total ? this.state.tableData.total : 0;
        },
        onUpdateOptions() {
            return _debounce(this.updateTable, 100);
        },
        onSearch() {
            return _debounce(this.updateTable, 500);
        },
    },
    methods: {
        /**
     * Used for converting object to base64 format
     * @param param - param that we want to convert
     */
        convetFiltertoBase64(filter) {
            if (filter && (Object.keys(filter).length > 0 && filter.constructor === Object)) {
                const base64Filter = btoa(unescape(encodeURIComponent(JSON.stringify(filter))));
                return base64Filter;
            }
            return '';
        },
        onSelectColumnAll(checked) {
            const list = this.$refs.tableData.data;
            const rowIds = [];
            if (checked) {
                list.forEach((element, index) => {
                    rowIds[index] = element.id;
                });
                this.selected = rowIds;
            } else {
                this.selected = [];
            }
        },
        resetMarkedRows() {
            this.selected = [];
        },
        /**
             * set table's current options to store and call api to get data
             * @param options - table's current options
             */
        updateTable() {
            this.$store.commit(`${this.stateName}/setPagination`, {
                query: this.searchModel,
                page: this.options.page,
                limit: this.options.itemsPerPage,
                orderBy: this.options.sortBy.length > 0 ? this.options.sortBy[0] : '',
                ascending: this.options.sortDesc.length > 0 ? this.options.sortDesc[0] : '',
                filter: this.filterModel != '' && this.filterModel != undefined ? this.convetFiltertoBase64(this.filterModel) : '',
            });
            this.getData();
        },
        /**
             * reset pagination data but except filter
             */
        resetPagination() {
            this.$store.commit(`${this.stateName}/setPagination`, {
                query: this.searchModel,
                page: 1,
                limit: this.state.pagination.limit,
                orderBy: this.state.pagination.orderBy,
                ascending: this.state.pagination.ascending,
                filter: this.filterModel != '' && this.filterModel != undefined ? this.convetFiltertoBase64(this.filterModel) : '',
            });
        },
        setData(response) {
            this.$store.commit(`${this.stateName}/setTableData`, response);
        },
        /**
             * call api to get data
             */
        // eslint-disable-next-line consistent-return
        getData(promiseOnly) {
            if (this.urlApi && this.urlApi != '') {
                return new Promise((resolve, reject) => {
                    this.$store.dispatch(this.urlApi, this.state.pagination).then((response) => {
                        if (response.error) {
                            this.setData([]);
                            reject(response.error);
                        } else {
                            if (promiseOnly) {
                                // if parse promiseOnly then resolve response data else set data directly in table
                                resolve(response);
                            } else {
                                this.setData(response);
                            }
                        }
                    }, (error) => {
                        this.setData([]);
                        reject(error);
                    });
                });
            }
        },
        /**
             * reset pagination data but except filter and get data
             */
        refresh() {
            if (this.urlApi && this.urlApi != '') {
                this.resetPagination();
                this.getData();
            }
        },
    },
});
