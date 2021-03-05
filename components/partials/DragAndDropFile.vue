<template>
  <form
    method="POST"
    name="import-csv-form"
    class="import-csv-form"
    role="form"
    novalidate
    autocomplete="off"
  >
    <v-layout row wrap class="flex-center">
      <div class="example-drag">
        <div class="upload">
          <div v-if="files.length" class="mb-5 text-center">
            <div v-for="file in files" :key="file.id">
              <div class="mb-1"><b>File Name:</b> {{ file.name }}</div>
              <div class="mb-1">
                <b>File Size:</b> {{ getFileSize(file.size) }}
              </div>
              <div v-if="file.error" class="mb-1">
                <b>Error:</b> {{ file.error }}
              </div>
              <div v-else-if="file.success" class="mb-1">success</div>
              <div v-else-if="file.active" class="mb-1">active</div>
              <div v-else />
            </div>
          </div>
          <div v-else>
            <div>
              <div class="text-center p-5">
                <img
                  src="~/assets/images/drag-and-drop-icon.png"
                  class="img-responsive drag-drop-icon mb-4 mt-4"
                />
                <h4 class="mb-6">
                  {{ $getConst("FILE_UPLOAD_MSG") }}
                </h4>
                <div class="position-relative">
                  <span class="position-absolute or-txt">or</span>
                  <v-divider />
                </div>
              </div>
            </div>
          </div>

          <div
            v-show="$refs.upload && $refs.upload.dropActive"
            class="drop-active"
          >
            <h3>{{ $getConst("DRAG_AND_DROP_MSG") }}</h3>
          </div>

          <div class="example-btn">
            <file-upload
              ref="upload"
              v-model="files"
              class="btn btn-grey font-weight-bold font-size-3 w100"
              :multiple="importProps.multiple"
              :drop="true"
              :drop-directory="true"
            >
              <i class="fa fa-plus" />
              {{ $getConst("SELECT_FILE_LABEL") }}
            </file-upload>
          </div>
          <div class="flex-center">
            <button
              icon
              type="button"
              class="btn btn-primary font-weight-bold font-size-3 w100 mt-4"
              :disabled="files.length == 0"
              @click.prevent="uploadCsv"
            >
              <v-icon class="fa fa-upload" />
              {{ $getConst("BTN_SUBMIT") }}
            </button>
          </div>
          <div class="text-center mt-4 mb-5">
            <a class="font-size-5" @click="downloadSampleFile()"
              >Download sample</a
            >
          </div>
        </div>
      </div>
    </v-layout>
    <error-modal v-model="errorDialog" :error-arr="errorArr" />
    <import-error-modal
      v-model="importErrorDialog"
      :import-error-arr="importErrorArr"
    />
  </form>
</template>

<script>
/**
 * sample csv import file
 */
import FileUpload from "vue-upload-component/dist/vue-upload-component.part.js";
// import userCSV from "../../assets/samples/user.csv";
// import stateCSV from "../../assets/samples/state.csv";
// import cityCSV from "../../assets/samples/city.csv";
// import countryCSV from "../../assets/samples/country.csv";
// import hobbyCSV from "../../assets/samples/hobby.csv";
/**
 * end of sample csv import file
 */
import CommonServices from "../../common_services/common";
import ErrorModal from "./ErrorModal.vue";
import ImportErrorModal from "./ImportErrorModal.vue";

export default {
  name: "DragAndDropFile",
  components: {
    ErrorModal,
    ImportErrorModal,
    FileUpload,
  },
  mixins: [CommonServices],
  props: ["importProps"],
  data() {
    return {
      errorArr: [],
      errorDialog: false,
      files: [],
      importErrorArr: [],
      importErrorDialog: false,
    };
  },
  methods: {
    /**
     * Download csv
     */
    downloadSampleFile() {
      let fileUrl = "";
      // if (this.importProps.modelName == "user") {
      //   fileUrl = userCSV;
      // }
      // if (this.importProps.modelName == "state") {
      //   fileUrl = stateCSV;
      // }
      // if (this.importProps.modelName == "city") {
      //   fileUrl = cityCSV;
      // }
      // if (this.importProps.modelName == "country") {
      //   fileUrl = countryCSV;
      // }
      // if (this.importProps.modelName == "hobby") {
      //   fileUrl = hobbyCSV;
      // }

      if (fileUrl) {
        this.downloadFile(fileUrl, "DOWNLOAD_SAMPLE_CSV");
      }
    },
    /**
     * upload csv
     */
    uploadCsv() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          const apiName = "import";
          const formData = new FormData();

          if (this.importProps.multiple == false) {
            if (this.files[0].file instanceof File) {
              formData.append("file", this.files[0].file);
            }
          } else {
            for (const index in this.files) {
              if (this.files[index].file instanceof File) {
                formData.append(
                  `file[${parseInt(index, 10)}]`,
                  this.files[index].file
                );
              }
            }
          }
          this.$store
            .dispatch(`${this.importProps.store}/${apiName}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(
              (response) => {
                if (response.error) {
                  this.loading = false;
                  this.errorArr = response.data.error;
                  this.errorDialog = true;
                  this.$parent.$parent.getData();
                } else {
                  // if no error this code will execute
                  this.loading = false;
                  this.$store.commit(
                    "snackbarStore/setMsg",
                    this.$getConst("FILE_UPLOADED")
                  );
                  this.files = [];
                  this.$parent.$parent.getData();
                }
              },
              (error) => {
                this.loading = false;
                if (
                  error.response.data.errors &&
                  error.response.data.errors.length > 0
                ) {
                  this.importErrorArr = error.response.data.errors;
                  this.importErrorDialog = true;
                } else {
                  this.errorArr = this.getAPIErrorMessage(error.response);
                  this.errorDialog = true;
                }
                this.files = [];
                this.$parent.$parent.getData();
              }
            );
        }
      });
    },
  },
};
</script>
