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
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
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
                      type="number"
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
                      <option value>city</option>
                      <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
                    </CFormSelect>
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
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import api from "axios"
import store from "@/store"

export default {
  name: 'Register',
  data: () => ({
    user: {
      username: '',
      password: '',
      email: '',
      phone_number: '',
      city: '',
      role: '',
    },
    errors: [],
    loading: false,
  }),

  computed: {
    ...mapGetters('auth', ['cities', 'roles', 'token', 'isToken']),
  },

  mounted() {
    store.dispatch('auth/getCity')
  },
  methods: {
    ...mapActions('auth', ['Register', 'getUser']),

    selectCity() {
      console.log("selectCity")
    },

    async registerSubmit() {
      console.log(this.isToken)
      console.log(this.token)
      this.loading = true;
      this.errors = [];
      // register
      try {
        await this.Register(this.user)
        this.loading = false;

      } catch (e) {
        console.log(e.response.data)
        this.errors.push(e.response.data.data)
        this.loading = false;
      }
      //getUser
      if (this.isToken) {
        try {
          await this.getUser(this.token)
          this.loading = false;
          this.$router.push('/')
        } catch (errors) {
          console.log(errors)
          this.loading = false;
        }
      }

      this.loading = false;


    },
  },
}
</script>
