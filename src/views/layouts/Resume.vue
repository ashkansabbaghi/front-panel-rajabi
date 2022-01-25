<template>
    <CRow>
        <!-- list resume -->
        <CCol lg="6" class="position-relative">
            <CCard class="mb-4">
                <CCardHeader v-text="titleList"></CCardHeader>
                <CCardBody>
                    <template v-if="resumes">
                        <CListGroup flush>
                            <CListGroupItem v-text="resumes.file" component="button"></CListGroupItem>
                        </CListGroup>
                    </template>
                </CCardBody>
                <CCardFooter v-if="resumes">
                    <CButton
                        color="secondary"
                        variant="ghost"
                        @click.prevent="isUpload = false"
                    >edit resume</CButton>
                    <CButton
                        color="danger"
                        variant="ghost"
                        @click.prevent="subDeleteResume()"
                    >delete</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <!-- upload resume file -->
        <CCol lg="6" class="position-relative" v-if="isUpload">
            <CCard class="mb-4">
                <CCardHeader>Upload resume file</CCardHeader>
                <CCardBody>
                    <CForm @submit.prevent="subUploadResume()">
                        <!-- <h3>Resume</h3> -->
                        <!-- <p class="text-medium-emphasis">Upload file resume</p> -->
                        <p v-if="errors.length" class="text-danger">
                            <template v-for="(e, i) in errors" :key="i">
                                <i>{{ e }}</i>
                            </template>
                        </p>
                        <div class="mb-3">
                            <input
                                type="file"
                                id="formFileMultiple"
                                ref="file"
                                @change="fileUpload()"
                            />
                        </div>

                        <CRow>
                            <CCol :xs="6">
                                <CButton
                                    color="primary"
                                    class="px-4"
                                    :disabled="isLoading"
                                >upload file</CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>

        <!-- update resume -->
        <CCol lg="6" class="position-relative" v-else>
            <CCard class="mb-4">
                <CCardHeader>Update resume</CCardHeader>
                <CCardBody>
                    <CForm @submit.prevent="subUpdateResume()">
                        <!-- <h3>Resume</h3> -->
                        <!-- <p class="text-medium-emphasis">Upload file resume</p> -->
                        <p v-if="errors.length" class="text-danger">
                            <template v-for="(e, i) in errors" :key="i">
                                <i>{{ e }}</i>
                            </template>
                        </p>
                        <div class="mb-3">
                            <input
                                type="file"
                                id="formFileMultiple"
                                ref="file"
                                @change="fileUpload()"
                            />
                        </div>

                        <CRow>
                            <CCol :xs="6">
                                <CButton
                                    color="primary"
                                    class="px-4"
                                    :disabled="isLoading"
                                >upload file</CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "resume",
    component: {},
    data: () => ({
        isLoading: false,
        errors: [],
        titleList: "Resume",
        file: "",
        isUpload: true,
    }),
    computed: {
        ...mapGetters("auth", ["resumes", "token", "user"]),
    },
    async mounted() {
        try {
            const info = { token: this.token, type: "employee" };
            console.log(info);
            await this.getResume(info);
            this.isUpload = false;
        }
        catch (e) {
            console.log(e.response.statusText);
            if (e.response.statusText) {
                this.titleList = "empty Resume";
                this.isUpload = true;
                this.$store.state['auth'].resumes = "";
            }
        }
    },
    methods: {
        ...mapActions("auth", ["getResume", "setResume", "deleteResume"]),
        fileUpload() {
            this.file = this.$refs.file.files[0];
            console.log(this.file);
        },
        async subUploadResume() {
            try {
                const info = { token: this.token, type: "employee", file: this.file };
                await this.setResume(info);
                this.isUpload = false;
                this.$store.commit('auth/setAlert', { color: 'success', suc: true, msg: 'Upload resume' })
            }
            catch (e) {
                console.log(e.response);
                if (e.response.status === 400) {
                    console.log(e.response.status)
                } else {
                    this.$store.commit('auth/setAlert', { color: 'danger', suc: true, msg: 'error resume' })
                }
            }

            setTimeout(() => this.$store.commit('auth/setAlert', { color: '', suc: false, msg: '' }), 4500)

        },
        async subUpdateResume() {
            try {
                const info = { token: this.token, type: "employee", file: this.file };
                await this.setResume(info);
                this.$store.commit('auth/setAlert', { color: 'success', suc: true, msg: 'Update resume' })
            }
            catch (e) {
                console.log(e.response);
                this.$store.commit('auth/setAlert', { color: 'danger', suc: true, msg: 'Not Update resume' })
            }
            setTimeout(() => this.$store.commit('auth/setAlert', { color: '', suc: false, msg: '' }), 4500)
        },
        async subDeleteResume() {
            try {
                const info = { token: this.token, type: "employee" }
                this.deleteResume(info)
                this.$store.commit('auth/setAlert', { color: 'success', suc: true, msg: 'delete resume' })
                this.isUpload = true
            } catch (e) {
                console.log(e.response)
                this.$store.commit('auth/setAlert', { color: 'dabger', suc: true, msg: 'error delete resume' })
            }


            setTimeout(() => this.$store.commit('auth/setAlert', { color: '', suc: false, msg: '' }), 4500)
        }
    },
}
</script>