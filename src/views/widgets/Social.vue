<template >
    <CRow>
        <CCol class="col-6">
            <CCard>
                <CCardHeader>social media</CCardHeader>
                <CCardBody>
                    <CCardText>
                        <CIcon icon="cib-facebook" height="20" class="pl-1" />
                        <spam class="p-2">facebook :</spam>
                        <b v-text="social.facebook"></b>
                    </CCardText>
                    <CCardText>
                        <CIcon icon="cib-twitter" height="20" class="pl-1" />
                        <spam class="p-2">twitter :</spam>
                        <b v-text="social.twitter"></b>
                    </CCardText>
                    <CCardText>
                        <CIcon icon="cib-youtube" height="20" class="pl-1" />
                        <spam class="p-2">youtube :</spam>
                        <b v-text="social.youtube"></b>
                    </CCardText>
                    <CCardText>
                        <CIcon icon="cib-linkedin" height="20" class="pl-1" />
                        <spam class="p-2">linkedIn :</spam>
                        <b v-text="social.linkedIn"></b>
                    </CCardText>
                    <CCardText>
                        <CIcon icon="cib-instagram" height="20" class="pl-1" />
                        <spam class="p-2">instagram :</spam>
                        <b v-text="social.instagram"></b>
                    </CCardText>
                    <CCardText>
                        <!-- <CIcon icon="cib-telegram-plane" height="20" class="pl-1" /> -->
                        #
                        <spam class="p-2">telegram :</spam>
                        <b v-text="social.telegram"></b>
                    </CCardText>
                    <CCardText>
                        <!-- <CIcon icon="cib-instagram" height="20" class="" /> -->
                        #
                        <spam class="p-2">aparat :</spam>
                        <b v-text="social.aparat"></b>
                    </CCardText>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol class="col-6">
            <CCard>
                <CCardBody>
                    <CForm
                        class="row g-3 needs-validation"
                        novalidation
                        @submit.prevent="subEditSocial()"
                    >
                        <CCol lg="6" class="position-relative">
                            <CFormLabel for="upSocialFacebook">
                                Facebook
                                <!-- <span class="text-danger">*</span> -->
                            </CFormLabel>
                            <CFormInput
                                type="text"
                                id="upSocialFacebook"
                                placeholder="URL address Facebook"
                                v-model="upSocial.facebook"
                                required
                            />
                        </CCol>
                        <CCol lg="6" class="position-relative">
                            <CFormLabel for="upSocialTwitter">twitter</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upSocialTwitter"
                                v-model="upSocial.twitter"
                                placeholder="URL address twitter"
                            />
                        </CCol>
                        <CCol lg="6" class="position-relative">
                            <CFormLabel for="upSocialYoutube">youtube</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upSocialYoutube"
                                v-model="upSocial.youtube"
                                placeholder="URL address youtube"
                            />
                        </CCol>
                        <CCol lg="6" class="position-relative">
                            <CFormLabel for="upSocialLinkedIn">Linkedin</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upSocialLinkedIn"
                                v-model="upSocial.linkedIn"
                                placeholder="URL address Linkedin"
                            />
                        </CCol>
                        <CCol lg="6" class="position-relative">
                            <CFormLabel for="upSocialInstagram">Instagram</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upSocialInstagram"
                                v-model="upSocial.instagram"
                                placeholder="URL address Instagram"
                            />
                        </CCol>
                        <CCol lg="6" class="position-relative">
                            <CFormLabel for="upSocialTelegram">Telegram</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upSocialTelegram"
                                v-model="upSocial.telegram"
                                placeholder="URL address telegram"
                            />
                        </CCol>
                        <CCol lg="6" class="position-relative">
                            <CFormLabel for="upSocialAparat">Aparat</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upSocialAparat"
                                v-model="upSocial.aparat"
                                placeholder="URL address aparat"
                            />
                        </CCol>

                        <CCol xs="12" class="position-relative">
                            <CButton color="primary" type="submit">Update</CButton>
                        </CCol>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Widgets',
    data: () => ({
        upSocial: {
            id: "",
            facebook: "",
            twitter: "",
            youtube: "",
            linkedIn: "",
            instagram: "",
            telegram: "",
            aparat: "",
            orders: {},
            role: '',
            token: "",
        }
    }),
    computed: {
        ...mapGetters('auth', ['social', 'token']),
        setInfo() {
            this.upSocial = {
                id: this.social.id,
                facebook: this.social.facebook,
                twitter: this.social.twitter,
                youtube: this.social.youtube,
                linkedIn: this.social.linkedIn,
                instagram: this.social.instagram,
                telegram: this.social.telegram,
                aparat: this.social.aparat,
                orders: this.social.orders,
            }
        }

    },
    methods: {
        ...mapActions('auth', ['getSocial', 'editSocial']),


        async subEditSocial() {
            const info = { token: this.token, type: this.upSocial.role }
            console.log(info)
            try {
                await this.editSocial(this.upSocial)
                try {
                    await this.getSocial(info)
                } catch (e) {
                    console.log(e.response)
                }
            } catch (e) {
                console.log(e.response)
                this.$router.push('/')
            }


        }
    },
    mounted() {
        this.upSocial = {
            id: this.social.id,
            facebook: this.social.facebook,
            twitter: this.social.twitter,
            youtube: this.social.youtube,
            linkedIn: this.social.linkedIn,
            instagram: this.social.instagram,
            telegram: this.social.telegram,
            aparat: this.social.aparat,
            role: this.social.userable_type,
            orders: this.social.orders,
            token: this.token
        }
    }
}

</script>