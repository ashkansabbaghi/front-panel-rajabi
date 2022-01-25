<template>
    <CRow>
        <CCard class="mb-4">
            <CCardBody>
                <!-- valid pass-->
                <CForm @submit.prevent="subValidPass()" v-if="checkForm == 'valid'">
                    <h1>valid last password</h1>
                    <p class="text-medium-emphasis">Valid last password</p>
                    <p v-if="errors.length" class="text-danger">
                        <template v-for="(e, i) in errors" :key="i">
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
                            v-model="valid.username"
                        />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-lock-locked" />
                        </CInputGroupText>
                        <CFormInput
                            required
                            type="text"
                            placeholder="Password"
                            autocomplete="current-password"
                            v-model="valid.last_password"
                        />
                    </CInputGroup>

                    <CRow>
                        <CCol :xs="6">
                            <CButton
                                color="primary"
                                class="px-4"
                                :disabled="isLoading"
                            >valid Password</CButton>
                        </CCol>
                    </CRow>
                </CForm>

                <!-- change password -->
                <CForm @submit.prevent="subChangePass()" v-else-if="checkForm == 'change'">
                    <h1>change password</h1>
                    <p class="text-medium-emphasis">Sign In with Question (new password)</p>
                    <p v-if="errors.length" class="text-danger">
                        <template v-for="(e, i) in errors" :key="i">
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
                            v-model="changePass.username"
                        />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-lock-locked" />
                        </CInputGroupText>
                        <CFormInput
                            required
                            type="text"
                            placeholder="new Password"
                            autocomplete="current-password"
                            v-model="changePass.new_password"
                        />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>#?</CInputGroupText>
                        <CFormSelect
                            aria-label="Default select example"
                            v-model="changePass.security_question_id"
                            required
                        >
                            <option value>choose Question</option>
                            <option
                                v-for="(item, index) in questions"
                                :key="index"
                                :value="qCode"
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
                            v-model="changePass.answer"
                        />
                    </CInputGroup>
                    <CRow>
                        <CCol :xs="6">
                            <CButton color="primary" class="px-4">New Password</CButton>
                        </CCol>
                    </CRow>
                </CForm>
            </CCardBody>
        </CCard>
        <CCard >
            <CCardBody>
                <!-- set question-->
                <CForm @submit.prevent="subSetQuestion()">
                    <h1>setQuestion</h1>
                    <p class="text-medium-emphasis">setQuestion password</p>
                    <p v-if="errors.length" class="text-danger">
                        <template v-for="(e, i) in errors" :key="i">
                            <i>{{ e }}</i>
                        </template>
                    </p>

                    <CInputGroup class="mb-3">
                        <CInputGroupText>-?-</CInputGroupText>
                        <CFormSelect
                            aria-label="Default select example"
                            v-model="setQu.security_question_id"
                            required
                        >
                            <option value>choose Question</option>
                            <option
                                v-for="(item, index) in questions"
                                :key="index"
                                :value="qCode"
                            >{{ item.question }}</option>
                        </CFormSelect>
                    </CInputGroup>

                    <CInputGroup class="mb-3">
                        <CInputGroupText>-*-</CInputGroupText>
                        <CFormInput
                            required
                            type="text"
                            placeholder="answer"
                            autocomplete="current-password"
                            v-model="setQu.answer"
                        />
                    </CInputGroup>

                    <CRow>
                        <CCol :xs="6">
                            <CButton
                                color="primary"
                                class="px-4"
                                :disabled="isLoading"
                            >valid Password</CButton>
                        </CCol>
                    </CRow>
                </CForm>
            </CCardBody>
        </CCard>
    </CRow>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'security',
    component: {

    },
    data: () => ({
        changePass: {
            username: "",
            new_password: "",
            security_question_id: "",
            answer: "",
        },
        setQu: {
            security_question_id: "",
            answer: "",
        },
        valid: {
            username: "",
            last_password: "",
        },
        errors: [],
        checkForm: 'valid',
        isLoading: false,
        qCode: "b9fe4228-d736-465a-b868-1f567b7e0b35",
    }),

    computed: {
        ...mapGetters('auth', ['questions', 'token']),

    },
    mounted() {

    },
    methods: {
        ...mapActions('auth', ['setValidPass', 'newPass', 'setQuestion']),


        async subValidPass() {
            this.errors = []
            this.isLoading = true

            const info = {
                username: this.valid.username,
                last_password: this.valid.last_password,
                token: this.token
            }
            console.log(info)
            try {
                await this.setValidPass(info)
                this.$store.commit('auth/setAlert', { color: 'success', suc: true, msg: 'Validation Password' })

                this.isLoading = false
                this.checkForm = 'change'
                this.changePass.username = info.username

            } catch (e) {
                console.log(e.response.status)
                if (e.response.status === 404) {
                    this.errors.push(e.response.data.message)

                } else if (e.response.status === 403) {
                    this.$router.push('/')
                }
                this.isLoading = false
            }
            setTimeout(() => this.$store.commit('auth/setAlert', { color: '', suc: false, msg: '' }), 4500)

        },

        async subChangePass() {
            const info = {
                username: this.changePass.username,
                new_password: this.changePass.new_password,
                security_question_id: this.changePass.security_question_id,
                answer: this.changePass.answer,
                token: this.token
            }
            console.log(info)
            try {
                await this.newPass(info)
                this.$store.commit('auth/setAlert', { color: 'success', suc: true, msg: 'Changed Password' })
                setTimeout(() => this.$store.commit('auth/setAlert', { color: '', suc: false, msg: '' }), 4500)

            } catch (e) {
                console.log(e.response)
                if (e.response.status === 404) {
                    this.errors.push(e.response.data.message)
                } else if (e.response.status === 403) {
                    this.$router.push('/')
                }
                this.isLoading = false
            }
        },

        async subSetQuestion() {
            const info = {
                security_question_id: this.setQu.security_question_id,
                answer: this.setQu.answer,
                token: this.token
            }
            console.log(info)
            try {
                await this.setQuestion(info)
                this.$store.state['auth'].isQuestion = false
                this.$store.commit('auth/setAlert', { color: 'success', suc: true, msg: 'set Question , Thanks' })

            } catch (e) {
                console.log(e)
                this.$store.commit('auth/setAlert', { color: 'danger', suc: true, msg: 'Not set Question' })

            }
            setTimeout(() => this.$store.commit('auth/setAlert', { color: '', suc: false, msg: '' }), 4500)

        }
    }
}
</script>