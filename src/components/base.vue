<template>

</template>

<script>
import axios from "axios";

export default {
  components: {
    
  },
  filters: {
    prefix: function(key) {
      return "" + key;
    }
  },
  data: () => ({
    testField: ""
  }),
  computed: {
    testComputedValue() {
      return "";
    }
  },
  watch: {
    testField: {
      deep: true,
      handler() {}
    }
  },
  created() {},
  methods: {
    getdata() {
      var url = "";
      axios.get(`${url}`).then(resp => {});
      axios
        .get(`${url}`, {
          params: {
            ID: 12345
          }
        })
        .then(resp => {})
        .catch(function(error) {
          console.log(error);
        })
        .finally(function() {
          // always executed
        });

      axios.post(`${url}`, {}).then(resp => {});
    }
  }
};
</script>
<style>
</style>
