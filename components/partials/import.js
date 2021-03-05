import CommonServices from '../../common_services/common';
import ErrorModal from './ErrorModal.vue';
import ImportErrorModal from './ImportErrorModal.vue';
import DragAndDropFile from './DragAndDropFile.vue';
import CustomTable from '~/components/customtable/table';

export default CustomTable.extend({
  data() {
    const self = this;
    return {
      file: null,
      urlApi: `${self.importProps.store}/getAllImport`, // set store name here to set/get pagination data and for access of actions/mutation via custom table
      filterModel: {
        model_name: [self.importProps.modelName],
      },
      headers: [
        { text: 'File', value: 'filename' },
        { text: 'Date', value: 'created_at' },
        { text: 'No.of Rows', value: 'no_of_rows' },
        { text: 'User', value: 'user_id' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      errorArr: [],
      importErrorArr: [],
      errorDialog: false,
      importErrorDialog: false,
    };
  },
  components: {
    CommonServices,
    ErrorModal,
    ImportErrorModal,
    DragAndDropFile,
  },
  props: ['value', 'importProps'],
  mixins: [CommonServices],
  methods: {
    /**
         * refresh Table Data
         */
    refreshImport() {
      this.refresh();
    },
    /**
         *View error detail
         * @param id
         */
    onView(id) {
      this.$store.commit(`${this.importProps.store}/setEditId`, id);
      this.$store.dispatch(`${this.importProps.store}/getByImportId`, id).then((response) => {
        if (response.error) {
          this.errorArr = response.data.error;
          this.errorDialog = true;
        } else {
          // Open import error modal
          this.importErrorArr = response.errors;
          this.importErrorDialog = true;
        }
      }, (error) => {
        this.errorArr = this.getModalAPIerrorMessage(error.response);
        this.errorDialog = true;
      });
    },
  },
  mounted() {
    this.errorMessage = '';
  },
});
