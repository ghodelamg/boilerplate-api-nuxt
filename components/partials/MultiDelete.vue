<template>
  <span>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="error" class="mb-2 mr-2" v-on="on"
          ><v-icon small>{{ icons.mdiDelete }}</v-icon>
        </v-btn>
      </template>
      <span>Multiple Delete</span>
    </v-tooltip>
    <error-modal v-model="errorDialog" :error-arr="errorArr" />

    <v-dialog
      :value="deleteModal"
      content-class="modal-dialog"
      @input="onCancel"
    >
      <v-card>
        <v-card-title class="headline black-bg" primary-title
          >{{ this.$getConst("DELETE_TITLE") }}
        </v-card-title>

        <v-card-text>
          <v-layout row wrap class="display-block m-0">
            <v-flex xs12>
              <p>
                {{
                  $getConst("MULTIPLE_DELETE_WARNING_START") +
                  deleteProps.ids.length +
                  $getConst("MULTIPLE_DELETE_WARNING_END")
                }}
              </p>
            </v-flex>
          </v-layout>

          <v-layout row wrap class="display-block m-0">
            <v-flex xs12>
              <v-btn
                class="btn btn-black m-b-10 m-t-10"
                :loading="loading"
                @click.native="deleteAction"
                >{{ this.$getConst("BTN_DELETE") }}</v-btn
              >
              <v-btn
                class="btn btn-grey m-b-10 ml-3 m-t-10"
                @click.native="onCancel"
                >{{ this.$getConst("BTN_CANCEL") }}</v-btn
              >
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
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
  props: ["value", "deleteProps"],
  data() {
    return {
      errorArr: [],
      errorDialog: false,
      deleteModal: false,
      loading: false,
    };
  },
  mounted() {
    this.errorMessage = "";
  },
  methods: {
    deleteMulti() {
      this.deleteModal = true;
    },
    deleteAction() {
      this.loading = true;
      this.$store
        .dispatch(`${this.deleteProps.store}/multiDelete`, {
          id: this.deleteProps.ids,
        })
        .then(
          (response) => {
            this.loading = false;
            if (response.error) {
              this.errorArr = response.data.error;
              this.errorDialog = true;
            } else {
              // if no error this code will execute
              this.$store.commit(
                "snackbarStore/setMsg",
                this.$getConst("DELETE_ACTION")
              );
              this.$emit("multiDelete");
              this.onCancel();
            }
          },
          (error) => {
            this.loading = false;
            this.errorArr = this.getModalAPIerrorMessage(error);
            this.errorDialog = true;
          }
        );
    },
    onCancel() {
      this.deleteModal = false;
      this.$emit("input");
    },
  },
};
</script>
