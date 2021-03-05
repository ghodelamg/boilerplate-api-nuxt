<template>
  <span v-show="errorList.has(validationField)" class="help-block">
    <span v-for="item in validatonArray" :key="item.key">
      <span
        v-if="getErrorRule(validationField) == item.key"
        style="color: red"
        >{{ item.value }}</span
      >
    </span>
  </span>
</template>

<script>
import CommonServices from "../../common_services/common";

export default {
  mixins: [CommonServices],
  props: ["validationField", "errorList", "validatonArray"],
};
</script>
