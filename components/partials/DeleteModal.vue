<template>
  <v-dialog :value="value" content-class="modal-dialog" @input="$emit('input')">
    <v-card>
      <v-card-title class="headline black-bg" primary-title>
        {{
          confirmation.title
            ? confirmation.title
            : this.$getConst("DELETE_TITLE")
        }}
      </v-card-title>

      <v-card-text>
        <ErrorBlockServer :error-message="errorMessage" />
        <v-layout row wrap class="display-block m-0">
          <v-flex xs12>
            <p>
              {{
                confirmation.description
                  ? confirmation.description
                  : this.$getConst("WARNING")
              }}
            </p>
          </v-flex>
        </v-layout>

        <v-layout row wrap class="display-block m-0">
          <v-flex xs12>
            <v-btn
              class="btn btn-black m-b-10 m-t-10"
              @click.native="deleteAction"
            >
              {{ this.$getConst("BTN_DELETE") }}
            </v-btn>
            <v-btn
              class="btn btn-grey m-b-10 ml-3 m-t-10"
              @click.native="onCancel"
            >
              {{
                confirmation.btnCancelText
                  ? confirmation.btnCancelText
                  : this.$getConst("BTN_CANCEL")
              }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CommonServices from "../../common_services/common";
import ErrorBlockServer from "./ErrorBlockServer.vue";

export default {
  components: {
    ErrorBlockServer,
  },
  mixins: [CommonServices],
  props: ["value", "paramProps", "confirmation"],
  data() {
    return {
      errorMessage: "",
      mainOrigin: this.mainorigin,
    };
  },
  mounted() {
    this.errorMessage = "";
  },
  methods: {
    deleteAction() {
      this.$store
        .dispatch(
          `${this.paramProps.storeProps}/delete`,
          this.paramProps.idProps
        )
        .then(
          (response) => {
            if (response.error) {
              this.errorMessage = response.error;
            } else {
              this.$store.commit(
                "snackbarStore/setMsg",
                this.$getConst("DELETE_ACTION")
              );
              this.$emit("delete-success");
              this.onCancel();
              this.$parent.getData();
            }
          },
          (error) => {
            this.errorMessage = this.getAPIErrorMessage(error.response);
          }
        );
    },
    onCancel() {
      this.$emit("input");
      this.errorMessage = "";
    },
  },
};
</script>
