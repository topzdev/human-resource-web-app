<template>
  <v-card :outlined="outlined" :flat="true">
    <form-card-header
      v-if="header"
      title="Address Details"
      description="Physical and residential address."
    ></form-card-header>

    <v-card-text>
      <div class="subtitle-2 mb-5">Permanent Address</div>
      <v-row class="mt-2 mb-5">
        <v-col class="py-0 pb-1" cols="12">
          <v-text-field
            label="House/Block/Lot No."
            :value="houseBlock"
            @input="$emit('update:houseBlock', $event)"
            outlined
          ></v-text-field>
        </v-col>
        <v-col class="py-0 pb-1" cols="6">
          <v-text-field
            label="Street"
            :value="street"
            @input="$emit('update:street', $event)"
            outlined
          ></v-text-field>
        </v-col>
        <v-col class="py-0 pb-1" cols="6">
          <v-text-field
            label="Subdivision/Village"
            :value="subdivision"
            @input="$emit('update:subdivision', $event)"
            outlined
          ></v-text-field>
        </v-col>
        <v-col class="py-0 pb-1" cols="6">
          <v-text-field
            label="Barangay"
            :value="barangay"
            @input="$emit('update:barangay', $event)"
            outlined
          ></v-text-field>
        </v-col>
        <v-col class="py-0 pb-1" cols="6">
          <v-text-field
            label="City/Municipality"
            :value="city"
            @input="$emit('update:city', $event)"
            outlined
          ></v-text-field>
        </v-col>
        <v-col class="py-0 pb-1" cols="6">
          <province-select
            :value="province"
            @input="$emit('update:province', $event)"
          ></province-select>
        </v-col>
        <v-col class="py-0 pb-1" cols="6">
          <v-text-field
            label="Zip Code"
            :value="zipcode"
            @input="$emit('update:zipcode', $event)"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- <v-divider class="my-5" /> -->
      <div class="subtitle-2 mb-5">Residential Address</div>
      <v-row class="mt-2 mb-5">
        <v-col class="py-0 pb-1" cols="12">
          <v-text-field
            label="House/Block/Lot No."
            :value="houseBlock2"
            @input="$emit('update:houseBlock2', $event)"
            outlined
          ></v-text-field>
        </v-col>
        <v-col class="py-0 pb-1" cols="6">
          <v-text-field
            label="Street"
            :value="street2"
            @input="$emit('update:street2', $event)"
            outlined
          ></v-text-field>
        </v-col>
        <v-col class="py-0 pb-1" cols="6">
          <v-text-field
            label="Subdivision/Village"
            :value="subdivision2"
            @input="$emit('update:subdivision2', $event)"
            outlined
          ></v-text-field>
        </v-col>
        <v-col class="py-0 pb-1" cols="6">
          <v-text-field
            label="Barangay"
            :value="barangay2"
            @input="$emit('update:barangay2', $event)"
            outlined
          ></v-text-field>
        </v-col>
        <v-col class="py-0 pb-1" cols="6">
          <v-text-field
            label="City/Municipality"
            :value="city2"
            @input="$emit('update:city2', $event)"
            outlined
          ></v-text-field>
        </v-col>
        <v-col class="py-0 pb-1" cols="6">
          <province-select
            :value="province2"
            @input="$emit('update:province2', $event)"
          ></province-select>
        </v-col>
        <v-col class="py-0 pb-1" cols="6">
          <v-text-field
            label="Zip Code"
            :value="zipcode2"
            @input="$emit('update:zipcode2', $event)"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import CardMixin from "@/mixins/CardMixin";
export default {
  mixins: [CardMixin],
  props: [
    "id",
    "houseBlock",
    "street",
    "subdivision",
    "barangay",
    "city",
    "province",
    "zipcode",
    "houseBlock2",
    "street2",
    "subdivision2",
    "barangay2",
    "city2",
    "province2",
    "zipcode2",
  ],
};
</script>

<style>
</style>