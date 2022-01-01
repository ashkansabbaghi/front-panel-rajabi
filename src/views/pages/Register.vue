<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.passive="registerSubmit()">
                  <h1>Register</h1>
                  <p class="text-medium-emphasis">Create your account</p>
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
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      required
                      placeholder="Email"
                      autocomplete="email"
                      v-model="user.email"
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
                      autocomplete="new-password"
                      v-model="user.password"
                    />
                  </CInputGroup>
                  <!-- <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      required
                      type="password"
                      placeholder="Repeat password"
                      autocomplete="new-password"
                      v-model="user.repassword"
                    />
                  </CInputGroup>-->
                  <CInputGroup class="mb-3">
                    <CInputGroupText>&</CInputGroupText>
                    <CFormInput
                      placeholder="Phone"
                      autocomplete="phone"
                      v-model="user.phone_number"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-location-pin" />
                    </CInputGroupText>
                    <CFormSelect aria-label="Default select example" v-model="user.city" required>
                      <option value="">city</option>
                      <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
                    </CFormSelect>
                  </CInputGroup>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormSelect aria-label="Default select example" v-model="role" required>
                      <option value="">role</option>
                      <option v-for="(item,index) in roles" :key="index" :value="item">{{ item }}</option>
                    </CFormSelect>
                  </CInputGroup>
                  <div class="d-grid">
                    <CButton color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-success py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Register</h2>
                  <p>If you have already registered, login</p>
                  <router-link to="/pages/login">
                    <CButton color="light" variant="outline" class="mt-3">login Now!</CButton>
                  </router-link>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
        <!-- register -->
        <!-- <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-medium-emphasis">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput placeholder="Username" autocomplete="username" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput placeholder="Email" autocomplete="email" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton color="success">Create Account</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>-->
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import axios from "axios"
let URL_register = "auth/register/";

export default {
  name: 'Register',
  data: () => ({
    user: {
      username: '',
      password: '',
      // repassword: '',
      email: '',
      phone_number: '',
      city: '',
    },
    cities: '',
    roles: '',
    role: '',
  }),

  mounted() {

    this.$store.dispatch('login/getCity')
    this.cities = this.$store.state.login.cities
    this.roles = this.$store.state.login.roles

  },
  methods: {

    async registerSubmit() {
      // this.loading = true;
      // this.errors = [];
      axios.defaults.headers.common["Authorization"] = "";
      // localStorage.removeItem("token");
      this.$store.commit('login/removeToken')

      await axios
        .post(`${URL_register}${this.role}/`, {
          username: this.user.username,
          password: this.user.password,
          email: this.user.email,
          phone_number: this.user.phone_number,
          city: this.user.city,
        })
        .then((response) => {
          console.log(response);
          if (response.status) {
            const token = response.data.data.token;
            const refToken = response.data.data.refreshToken;
            // const user = response.data.data.wallet.name;
            console.log(token, refToken, user)
            this.$store.commit("login/setToken", token);
            //save token
            // localStorage.setItem("token", token);
            // this.$store.commit("login/setUser", user);
            // loading
            // this.loading = false;
            // change direction
            window.setTimeout(function () {
              location.replace("/");
            }, 300);
          }
        })
        .catch((error) => {
          console.log(error.response);
          // loading
          // this.loading = false;
          // if (error.response) {
          //   localStorage.removeItem("token");
          //   for (const e in error.response.data.non_field_errors) {
          //     const i = `${error.response.data.non_field_errors[e]}`;
          //     this.errors.push(i);
          //   }
          // } else if (error.message) {
          //   console.log(error.message);
          // } else {
          //   console.log(error);
          // }
        });
    },
  },
}
</script>
