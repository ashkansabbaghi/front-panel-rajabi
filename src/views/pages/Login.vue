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
                    <small>{{errors.msg}}</small>
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
                  <!-- <CInputGroup class="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput required placeholder="Email" autocomplete="email" v-model="user.email" />
                  </CInputGroup>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>&</CInputGroupText>
                    <CFormInput required placeholder="Phone" autocomplete="phone" v-model="user.phone" />
                  </CInputGroup>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-location-pin" />
                    </CInputGroupText>
                    <CFormSelect aria-label="Default select example" v-model="user.city" required>
                      <option value="">city</option>
                      <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
                    </CFormSelect>
                  </CInputGroup>-->
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormSelect aria-label="Default select example" v-model="role" required>
                      <option value="">role</option>
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
let URL_login = "auth/login/username/";

export default {
  name: 'Login',
  data: () => ({
    user: {
      username: '',
      password: '',
      email: '',
      phone: '',
      city: '',
    },
    cities: '',
    roles: '',
    role: '',
    errors: {
      status: '',
      msg: ''
    },
  }),
  computed: {
    // ...mapState('login', ['itemLogin'])
  },
  mounted() {

    this.$store.dispatch('login/getCity')
    this.cities = this.$store.state.login.cities
    this.roles = this.$store.state.login.roles

  },
  methods: {
    loginSubmit() {
      axios.defaults.headers.common['Authorization'] = ''
      // localStorage.removeItem('token')
      this.$store.commit('login/removeToken')

      axios.post(`${URL_login}${this.role}/`, {
        username: this.user.username,
        password: this.user.password,

      }).then((response) => {
        if (response.status) {
          const token = response.data.data.token;
          const refToken = response.data.data.refreshToken;
          // const user = response.data.data.wallet.name;

          this.$store.commit("login/setToken", token);
          //save token
          // localStorage.setItem("token", token);
          // this.$store.commit("login/setUser", user);
          // loading
          // this.loading = false;
          // change direction
          window.setTimeout(function () {
            location.replace("/");
          }, 0);
        }
      }).catch((error) => {
        // loading
        // this.loading = false;

        if (!error.response.data.status) {
          this.errors.status = error.response.data.status
          this.errors.msg = error.response.data.message
        }
      })
    }
  }
}
</script>
