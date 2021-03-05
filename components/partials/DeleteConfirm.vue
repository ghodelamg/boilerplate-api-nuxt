<template>
  <v-dialog
    :value="value"
    content-class="modal-dialog"
    @click:outside="$emit('input')"
    @keydown.esc="$emit('input')"
  >
    <v-card>
      <v-card-title
        class="headline black-bg"
        primary-title
      >
        {{ this.$getConst('DELETE_TITLE') }}
      </v-card-title>

      <v-card-text>
        <v-layout
          row
          wrap
          class="display-block m-0"
        >
          <v-flex xs12>
            <p>{{ $getConst('DELETE_WARNING') }}</p>
          </v-flex>
        </v-layout>

        <v-layout
          row
          wrap
          class="display-block m-0"
        >
          <v-flex xs12>
            <v-btn
              class="btn btn-black m-b-10 m-t-10"
              @click.native="deleteAction"
            >
              {{ $getConst('BTN_DELETE') }}
            </v-btn>
            <v-btn
              class="btn btn-grey m-b-10 ml-3 m-t-10"
              @click.native="$emit('input')"
            >
              {{ $getConst('BTN_CANCEL') }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: ['value', 'paramProps'],
  methods: {
    deleteAction() {
      this.$emit('delete', this.paramProps);
      this.$emit('input');
    },
  },
};
</script>
