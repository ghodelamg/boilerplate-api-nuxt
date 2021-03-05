<template>
  <v-dialog
    :value="value"
    content-class="modal-dialog"
  >
    <v-card>
      <v-card-title
        class="headline black-bg"
        primary-title
      >
        Error
      </v-card-title>

      <v-card-text>
        <form
          method="POST"
          name=""
          role="form"
        >
          <v-layout
            row
            wrap
            class="display-block m-0 "
          >
            <v-flex
              v-if="Array.isArray(errorArr)"
              xs12
            >
              <p
                v-for="(err,index) in errorArr"
                :key="index"
              >
                {{ err.name }} : {{ err.message }}
              </p>
            </v-flex>
            <v-flex
              v-else
              xs12
            >
              <p v-html="errorArr" />
            </v-flex>
          </v-layout>

          <v-layout
            row
            wrap
            class="display-block m-0 "
          >
            <v-flex xs12>
              <v-btn
                class="btn btn-black m-b-10 m-t-10"
                @click.native="$emit('input')"
              >
                Ok
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ErrorModal',
  props: ['value', 'errorArr'],
};
</script>
