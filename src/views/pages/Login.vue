<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="loginSubmit">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <p v-if="!errors.status" class="text-danger">
                    <small>{{ errors.msg }}</small>
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
import { mapState } from "vuex"
import axios from "axios"
import store from "@/store"
let URL_login = "auth/login/username/";

export default {
  name: 'Login',
  data: () => ({
    user: {
      username: '',
      password: '',
      role: '',
    },
    cities: '',
    roles: '',

    errors: {
      status: '',
      msg: ''
    },
  }),
  mounted() {

    this.$store.dispatch('login/getCity')
    this.cities = this.$store.state.login.cities
    this.roles = this.$store.state.login.roles

  },
  methods: {
    // loginSubmit() {
    //   store.dispatch('login/loginSubmit', this.user)
    // }
    async loginSubmit() {
      axios.defaults.headers.common['Authorization'] = ''
      // localStorage.removeItem('token')
      this.$store.commit('login/removeToken')

      await axios.post(`${URL_login}${this.user.role}/`, {
        username: this.user.username,
        password: this.user.password,

      }).then((response) => {
        if (response.status) {
          const token = response.data.data.token;
          const refToken = response.data.data.refreshToken;
          // const user = response.data.data.wallet.name;

          //save token
          store.commit("login/setToken", token)
          // get user vuex
          // let user = store.dispatch('login/getUser', token)
          // console.log(user)

          // loading
          // this.loading = false;
          // change direction
          window.setTimeout(function () {
            location.replace("/");
          }, 100);
        }
      }).catch((error) => {
        // loading
        // this.loading = false;
        console.log(error.response)
        if (!error.response.data.data.status) {
          this.errors.status = error.response.data.data.status
          this.errors.msg = error.response.data.data.message
        }
      })
    }
  }
}
</script>
