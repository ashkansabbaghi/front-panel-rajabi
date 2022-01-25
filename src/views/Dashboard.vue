<template>
  <CRow>
    <InfoUser />
  </CRow>
</template>

<script>

import InfoUser from './layouts/InfoUser.vue'
import store from '@/store'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    InfoUser,

  },

  data: () => ({
    infoAddress: {
      token: "",
      type: ""
    }
  }),

  methods: {
    ...mapActions('auth', [
      'getUser',
      'logOut',
      'updateToken',
      'getAddress',
      'getCompany',
      'getSocial',
      'getMoreInfo']),
  },

  computed: {
    ...mapGetters('auth', ['user', 'token', 'isToken', 'refreshToken'])
  },
  //  wrong send refresh token for update token
  async created() {
    this.$store.commit('auth/setAlert', { color: '', suc: false, msg: '' })

    // get user
    try {
      await this.getUser(this.token)
      store.commit('auth/setErrorNetwork', false)
    } catch (e) {
      // console.log(e.response)
      if (!e.response) {
        console.log("net work error")
        store.commit('auth/setErrorNetwork', true)
      } else if (e.response.status === 500) {
        this.$router.push('/pages/500')
        console.log(e.response)
      } else {
        console.log(e.response)
      }
    }
    // get address
    try {
      this.infoAddress = { token: this.token, type: this.user.info.userable_type }
      // console.log(this.infoAddress)
      await this.getAddress(this.infoAddress)
    } catch (e) {
      console.log(e.response)
      if (!e.response.status === 404) {
        this.$dispatch('updateToken', this.refreshToken)
      } else {
        store.commit('auth/removeToken')
      }

    }
    // get company
    try {
      await this.getCompany(this.infoAddress)
      await this.getSocial(this.infoAddress)
    } catch (e) {
      console.log(e.response)
      if (!e.response.status === 404) {
        this.$dispatch('updateToken', this.refreshToken)
      } else {
        store.commit('auth/removeToken')
      }

    }

    try {
      await this.getMoreInfo(this.infoAddress)
    } catch (e) {
      console.log(e)
    }


  },

}
</script>