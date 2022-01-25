<template>
  <!-- <CCol> -->
  <CAlert
    class="text-center"
    style="z-index : 2;position: fixed; bottom: 2%; width: auto;right: 3%;"
    :color="alertX.color"
    dismissible
    v-if="alertX.suc"
  >
    <b v-text="alertX.msg"></b>
  </CAlert>
  <!-- </CCol> -->
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppAlert',

  data: () => ({
    alert: {
      color: 'success',
      suc: false,
      msg: 'test app alert'
    },
  }),
  props: ['color', 'suc', 'msg'],
  computed: {
    ...mapGetters('auth', ['alertX']),

  },
  mounted() {
    // this.$store.commit('auth/setAlert', this.alert);
  }
}
</script>
