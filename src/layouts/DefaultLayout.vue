<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <router-view />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  </div>
</template>
<script>
import { CContainer } from '@coreui/vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

import store from "@/store"
export default {
  name: 'DefaultLayout',
  components: {
    AppFooter,
    AppHeader,
    AppSidebar,
    CContainer,
  },
  data: () => ({
    token: store.state['login'].token,
    user: "",
  }),
  // provide: () => ({
  //   user: "ashkan joon"
  // }),
  async created() {
    // console.log('Created defult layout')
    // await store.dispatch('login/getUser', this.token)
    // console.log(store.state['login'].user)
    // this.user = store.state['login'].user
  },
}
</script>
