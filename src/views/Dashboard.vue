<template>
  <div>
    <InfoUser />
  </div>
</template>

<script>

import InfoUser from './widgets/InfoUser.vue'
import store from '@/store'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    InfoUser,
  },

  data: () => ({

  }),

  computed: {
    ...mapGetters('auth', ['user', 'token', 'isToken', 'refreshToken'])
  },
//  wrong send refresh token for update token
  async mounted() {
    // await this.getUser(this.token)
    // if (this.isToken) {
    //   try {
    //     await this.updateToken(this.refreshToken)
    //   } catch (e) {
    //     console.log(e.response)
    //   }
    // }

  },
  methods: {
    ...mapActions('auth', ['getUser', 'logOut', 'updateToken']),
  }
}
</script>