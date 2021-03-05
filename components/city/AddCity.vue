<template>
  <v-dialog
    :value="value"
    :persistent="loading"
    content-class="modal-dialog"
    @click:outside="onCancel()"
    @keydown.esc="onCancel()"
  >
    <v-card>
      <v-card-title class="headline black-bg" primary-title>
        {{
          isEditMode ? this.$getConst("TXT_UPDATE") : this.$getConst("TXT_ADD")
        }}
        City
      </v-card-title>

      <v-card-text>
        <form
          method="POST"
          name="city-form"
          role="form"
          novalidate
          autocomplete="off"
          @submit.prevent="addAction"
        >
          <ErrorBlockServer :error-message="errorMessage" />
          <v-layout row wrap class="display-block m-0">
            <v-flex xs12>
              <v-text-field
                v-model="model.name"
                v-validate="'required|max:191'"
                label="City*"
                type="text"
                name="city"
                :error-messages="getErrorValue('city')"
                maxlength="191"
              />
            </v-flex>
            <v-flex xs12>
              <v-autocomplete
                v-model="model.state_id"
                v-validate="'required'"
                name="State"
                item-text="name"
                item-value="id"
                :items="setStateList"
                :error-messages="getErrorValue('state')"
                label="State*"
              />
            </v-flex>
            <v-flex xs12 class="mt-4">
              <v-btn class="btn btn-primary" type="submit" :loading="loading">
                {{ $getConst("BTN_SUBMIT") }}
              </v-btn>
              <v-btn
                :disabled="loading"
                class="btn btn-grey ml-3"
                @click.native="onCancel"
              >
                {{ $getConst("BTN_CANCEL") }}
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script src="./addcity.js"></script>
