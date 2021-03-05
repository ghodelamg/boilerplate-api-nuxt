<template>
  <span>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="warning" class="mb-2 mr-2" v-on="on"
          ><v-icon small>{{ icons.mdiExport }}</v-icon></v-btn
        >
      </template>
      <span>Export</span>
    </v-tooltip>
    <error-modal v-model="errorDialog" :error-arr="errorArr" />
  </span>
</template>

<script>
import CommonServices from "../../common_services/common";
import ErrorModal from "./ErrorModal.vue";

export default {
  components: {
    ErrorModal,
  },
  mixins: [CommonServices],
  props: ["value", "exportProps"],
  data() {
    return {
      errorArr: [],
      errorDialog: false,
    };
  },
  mounted() {
    this.errorMessage = "";
  },
  methods: {
    exportToCSV() {
      if (this.exportProps.ids.length > 0) {
        // eslint-disable-next-line max-len
        this.exportProps.pagination.filter = this.convetFiltertoBase64({
          id: this.exportProps.ids,
        });
      }
      this.$store
        .dispatch(
          `${this.exportProps.store}/export`,
          this.exportProps.pagination
        )
        .then(
          (response) => {
            if (response.error) {
              this.errorArr = response.data.error;
              this.errorDialog = true;
            } else {
              this.convertToCSV(this.exportProps.fileName, response.data);
            }
          },
          (error) => {
            this.errorArr = this.getModalAPIerrorMessage(error);
            this.errorDialog = true;
          }
        );
    },
  },
};
</script>
