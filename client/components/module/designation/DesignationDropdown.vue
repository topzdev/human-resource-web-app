<template>
  <v-autocomplete
    :value="value"
    @input="$emit('input', $event)"
    :items="list"
    item-text="name"
    item-value="id"
    :no-data-text="noDataText"
    label="Select Designation"
    outlined
    :readonly="readonly"
    :disabled="disabled"
    :required="required"
    :rules="rules"
  >
    <template v-slot:selection="data">{{ data.item.name }}</template>
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title>{{ data.item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{
          postFixed(data.item.department.name)
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import InputMixin from "@/mixins/InputMixin";

export default {
  mixins: [InputMixin],
  props: {
    departmentId: {
      type: Number,
      default: null,
    },
  },
  computed: {
    list() {
      const rawList = this.$store.state.designation.dropdown;
      return rawList && this.departmentId
        ? rawList.filter((item) => item.departmentId === this.departmentId)
        : rawList;
    },
    noDataText() {
      return !this.departmentId ? "Please select department first. " : "";
    },
  },
  methods: {
    postFixed(text) {
      if (text)
        return text.toLowerCase().includes("Department")
          ? text
          : text + " Department";
    },
  },
  watch: {
    departmentId() {
      console.log(this.departmentId);
      // TODO: fix this when fetching the data the designation id remove when fetching data and mutate the current employee data
      // this.$emit("input", null);
    },
  },
};
</script>

<style>
</style>