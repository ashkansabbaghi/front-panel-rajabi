<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <!-- login -->
              <CCardBody v-if="isLogin">
                <CForm @submit.prevent="loginSubmit()">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <p v-if="errors.length" class="text-danger">
                    <template v-for="(e,i) in errors" :key="i">
                      <i>{{ e }}</i>
                    </template>
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
                      <CButton
                        @click.prevent="openForgetPass()"
                        color="link"
                        class="px-0"
                      >Forgot password?</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
              <!-- forget password -->
              <!-- <CCardBody v-else>
                <CForm @submit.prevent>
                  <h1>Forget password?</h1>
                  <p class="text-medium-emphasis">Sign In with Question (new password)</p>
                  <p v-if="errors.length" class="text-danger">
                    <template v-for="(e,i) in errors" :key="i">
                      <i>{{ e }}</i>
                    </template>
                  </p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      required
                      placeholder="Username"
                      autocomplete="username"
                      v-model="forgetPass.username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      required
                      type="test"
                      placeholder="new Password"
                      autocomplete="current-password"
                      v-model="forgetPass.new_password"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>#?</CInputGroupText>
                    <CFormSelect
                      aria-label="Default select example"
                      v-model="forgetPass.security_question_id"
                      required
                    >
                      <option value>choose Question</option>
                      <option
                        v-for="(item,index) in questions"
                        :key="index"
                        :value="item.id"
                      >{{ item.question }}</option>
                    </CFormSelect>
                  </CInputGroup>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      required
                      type="text"
                      placeholder="enter answer"
                      autocomplete="current-password"
                      v-model="forgetPass.answer"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4">New Password</CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton @click.prevent="isLogin = true" color="link" class="px-0">normal login</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody> -->
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
    // forgetPass: {
    //   username: "",
    //   new_password: "",
    //   security_question_id: "",
    //   answer: "",
    // },
    cities: '',
    errors: [],
    isLogin: true
  }),
  computed: {
    ...mapGetters('auth', ['roles', 'token', 'isToken', 'questions']),
  },
  mounted() {
    // first get city
    store.dispatch('auth/getCity')
  },
  methods: {
    ...mapActions('auth', ['login', 'getUser']),

    async loginSubmit() {
      this.loading = true
      this.errors = []
      // console.log(this.user)

      try {
        //check login
        await this.login(this.user)
      } catch (e) {
        console.log(e)
        console.log(e.response)
        if (e.response.status === 404) {
          this.errors.push(e.response.data.message)
        }
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
    },

    // openForgetPass() {
    //   console.log(this.forgetPass)
    //   this.isLogin = false;
    // }

  }
}
</script>
