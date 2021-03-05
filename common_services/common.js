import { mapGetters, mapState } from 'vuex';
import commonDateMethods from './common-date-methods';
import commonErrorMethods from './common-error-methods';

export default {
    data() {
        return {
            rules: [
                (value) => !value || value.size < 4000000 || 'File size should be less than 4 MB!',
            ],
            multipleFileRules: [
                (value) => !value.length || value.reduce((size, file) => size + file.size, 0) < 4000000 || 'File size should be less than 4 MB!',
            ],
            emailRules: [
                (value) => !!value || 'E-mail is required',
                (value) => /.+@.+\..+/.test(value.email) || /.+@.+\..+/.test(value) || 'E-mail must be valid',
            ],
        };
    },
    mixins: [commonDateMethods, commonErrorMethods],
    computed: {
        ...mapState({

        }),
        ...mapGetters({}),
    },
    methods: {
        /**
             * clear object Method
             * @param object
             */
        clearObject(object) {
            Object.keys(object).forEach((key) => {
                delete object[key];
            });
        },
        /**
             * Modal clear functionality
             * @param storeName
             * @param stateName
             * @param isOpen - want to open modal or not (true, false)
             */
        onModalClear(storeName, stateName, isOpen) {
            if (!stateName) {
                stateName = 'clearStore';
            }
            this.$validator.reset();
            this.isSubmitting = false;
            this.errorMessage = '';
            this.$store.commit(`${storeName}/${stateName}`);
            if (!isOpen) {
                this.$emit('input'); // Close Pop-up
            }
        },
        /**
             * Page reset scrolling
             */
        pageReset(storeName, variableName) {
            this.$store.commit(`${storeName}${variableName}`, 2);
        },
        /**
             * @objectData Object of data from which we need to filter
             * @param Object of filter condition {key : value}
             * @returns {Array list of filtered items}
             */
        filter(objectData, param) {
            const filterData = [];
            Object.keys(param).forEach((key) => {
                objectData.filter((item) => {
                    if (item[key] == param[key]) {
                        filterData.push(item);
                    }
                    return item;
                });
            });
            return filterData;
        },
        /**
             * Used for convert to CSV format
             * @param filename - name of file
             * @param data - response data
             * @param type - type of CSV
             * @param extension - extension of CSV
             */
        convertToCSV(filename, data, type = 'text/csv;charset=utf-8;', extension = '.csv') {
            const exportedFilename = `${filename}${new Date().toISOString().slice(0, 10)}${extension}`;
            const blob = new Blob([data], { type });
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, exportedFilename);
            } else {
                const link = document.createElement('a');
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    const url = URL.createObjectURL(blob);
                    link.setAttribute('href', url);
                    link.setAttribute('download', exportedFilename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        },
        /**
             * Use for download a file from its url
             * @param url - url of file which needs to be downloaded
             * @param msg - msg to be displayed in toast
             */
        downloadFile(url, msg) {
            const link = document.createElement('a');
            const filename = url.substring(url.lastIndexOf(`/${1}`));
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.$store.commit('snackbar/setMsg', this.$getConst(msg));
        },

        /**
           * file size conversion to display
           * @param sizeInBytes
           * @returns {string}
           */
        getFileSize(sizeInBytes) {
            let sizeInMB = '';
            let postfix = '';
            if (sizeInBytes / (1024 * 1024) >= 1) {
                sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
                postfix = 'MB';
            } else {
                sizeInMB = (sizeInBytes / (1024)).toFixed(2);
                postfix = 'KB';
            }
            return sizeInMB + postfix;
        },
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
        /**
           *  Logout
           */
        logout() {
            this.$store.dispatch('userStore/userLogout').then((response) => {
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = false;
                } else {
                    localStorage.clear();
                    this.$store.commit('userStore/clearUserData');
                    this.$router.push('/');
                }
            }, function (error) {
                this.errorArr = this.getAPIErrorMessage(error.response);
                this.errorDialog = false;
            });
        },
    },
    beforeCreate() {
        // reset snackbar
        // this.$store.commit('snackbar/clearStore');
    },
    created() { },
    filters: {
        /**
             * Truncate no of character from the text
             * @param value - text
             * @param limit - no of chars which need to remove
             * @returns {string} - Truncated text
             */
        truncateText(value, limit) {
            if (value.length > limit) {
                value = `${value.substring(0, (limit - 3))}...`; // Here subrtracting 3 from text becoz we added 3 dots
            }
            return value;
        },
    },
};
