<template>
  <v-alert
    v-if="errorMessage"
    dense
    outlined
    type="error"
    style="font-size: 13px"
    v-html="errorMessage"
  />
</template>

<script>
export default {
  props: [
    'errorMessage',
  ],
};
</script>
