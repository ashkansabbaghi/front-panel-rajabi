<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="loginSubmit()">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <p v-if="errors.length" class="text-danger">
                    <small>{{ errors }}</small>
                  </p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      required
                      placeholder="Username"
                      autocomplete="username"
                      v-model="user.username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      required
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="user.password"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormSelect aria-label="Default select example" v-model="user.role" required>
                      <option value>role</option>
                      <option v-for="(item,index) in roles" :key="index" :value="item">{{ item }}</option>
                    </CFormSelect>
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4">Login</CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>You must be registered to enter</p>
                  <router-link to="/pages/register">
                    <CButton color="light" variant="outline" class="mt-3">Register Now!</CButton>
                  </router-link>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import store from "@/store"

export default {
  name: 'Login',
  data: () => ({
    user: {
      username: '',
      password: '',
      role: '',
    },
    cities: '',

    errors: [],
  }),
  computed: {
    ...mapGetters('auth', ['roles', 'token', 'isToken']),
  },
  mounted() {
    store.dispatch('auth/getCity')
  },
  methods: {
    ...mapActions('auth', ['login', 'getUser']),
    async loginSubmit() {
      this.loading = true
      // console.log(this.user)

      try {
        //check login
        await this.login(this.user)
      } catch (e) {
        console.log(e)
        console.log(e.response.data.data)
        this.errors.push(e.response.data.data)
        this.loading = false;
      }

      //getUser
      if (this.isToken) {
        try {
          await this.getUser(this.token)
          this.$router.push('/')
        } catch (er) {
          console.log(er)
          this.loading = false;

        }
      }

      this.loading = false;
    }
  }
}
</script>
