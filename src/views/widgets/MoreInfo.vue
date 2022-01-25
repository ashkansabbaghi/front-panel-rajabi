<template >
    <CRow>
        <!-- MoreInfo  -->
        <CCol lg="6">
            <CCard class="mb-4">
                <CCardHeader>More Info</CCardHeader>
                <CCardBody style="max-height: 400px;overflow-y: auto;">
                    <CCardBody class="col-12">
                        <p class="fw-normal">
                            <small class="blockquote-footer">
                                <!-- <span>{{moreInfo}}</span> -->
                                <span>email :</span>
                                <strong v-text="moreInfo.email"></strong>
                            </small>
                            <br />
                            <small class="blockquote-footer">
                                <!-- <span>{{moreInfo}}</span> -->
                                <span>phone number :</span>
                                <strong v-text="moreInfo.phone_number"></strong>
                            </small>
                            <br />
                            <small class="blockquote-footer">
                                <!-- <span>{{moreInfo}}</span> -->
                                <span>configurations :</span>
                                <strong v-text="moreInfo.configurations"></strong>
                            </small>
                            <br />
                            <small class="blockquote-footer">
                                <!-- <span>{{moreInfo}}</span> -->
                                <span>full name :</span>
                                <strong>{{ moreInfo.name }} {{ moreInfo.family_name }}</strong>
                            </small>
                            <br />
                            <small class="blockquote-footer">
                                <!-- <span>{{moreInfo}}</span> -->
                                <span>birthday :</span>
                                <strong v-text="moreInfo.birthday"></strong>
                            </small>
                            <br />
                            <small class="blockquote-footer">
                                <!-- <span>{{moreInfo}}</span> -->
                                <span>gender :</span>
                                <strong v-text="moreInfo.gender"></strong>
                            </small>
                            <br />
                            <small class="blockquote-footer">
                                <!-- <span>{{moreInfo}}</span> -->
                                <span>job :</span>
                                <strong v-text="moreInfo.job"></strong>
                            </small>
                            <br />
                            <small class="blockquote-footer">
                                <!-- <span>{{moreInfo}}</span> -->
                                <span>City :</span>
                                <strong v-text="moreInfo.city"></strong>
                            </small>
                        </p>
                    </CCardBody>
                </CCardBody>
            </CCard>
        </CCol>

        <!-- update MoreInfo -->
        <CCol lg="6">
            <CCard class="mb-4">
                <CCardHeader>More Info</CCardHeader>

                <CCardBody>
                    <CForm
                        class="row g-3 needs-validation"
                        novalidation
                        @submit.prevent="subEditMoreInfo()"
                    >
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="email">email</CFormLabel>
                            <CFormInput
                                type="email"
                                id="email"
                                placeholder="enter email"
                                v-model="upMoreInfo.email"
                                required
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="up_phone_number">phone number</CFormLabel>
                            <CFormInput
                                type="text"
                                id="up_phone_number"
                                v-model="upMoreInfo.phone_number"
                                placeholder="enter phone number"
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="configurations">configurations</CFormLabel>
                            <CFormInput
                                type="text"
                                id="configurations"
                                placeholder="enter configurations"
                                v-model="upMoreInfo.configurations"
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upJob">Job</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upJob"
                                placeholder="enter job"
                                v-model="upMoreInfo.job"
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upName">name</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upName"
                                placeholder="enter name"
                                v-model="upMoreInfo.name"
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upMoreInfoFamily_name">family_name</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upMoreInfoFamily_name"
                                placeholder="enter family_name"
                                v-model="upMoreInfo.family_name"
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upBirthday">birthday</CFormLabel>
                            <CFormInput
                                type="date"
                                id="upBirthday"
                                placeholder="enter birthday"
                                v-model="upMoreInfo.birthday"
                            />
                        </CCol>

                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upNational_id">national_id</CFormLabel>
                            <CFormInput
                                type="number"
                                id="upNational_id"
                                placeholder="national_id"
                                v-model="upMoreInfo.national_id"
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upCity">city</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upCity"
                                placeholder="City"
                                v-model="upMoreInfo.city"
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upGender">gender</CFormLabel>
                            <CRow>
                                <CCol lg="6" class>
                                    <input
                                        type="radio"
                                        name="exampleRadios"
                                        id="male"
                                        value="male"
                                        v-model="upMoreInfo.gender"
                                        checked
                                    />
                                    <label for="male" class="ms-1">male</label>
                                </CCol>
                                <CCol lg="6" class>
                                    <input
                                        type="radio"
                                        name="exampleRadios"
                                        id="female"
                                        value="female"
                                        v-model="upMoreInfo.gender"
                                    />
                                    <label for="female" class="ms-1">female</label>
                                </CCol>
                            </CRow>
                        </CCol>

                        <CCol xs="12" class="position-relative">
                            <CButton color="primary" type="submit">Update More info</CButton>
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
    name: 'moreInfo',
    component: {

    },
    data: () => ({
        upMoreInfo: {
            email: "",
            phone_number: "",
            configurations: "",
            name: "",
            family_name: "",
            birthday: "",
            national_id: "",
            gender: "",
            job: "",
            stat: "",
            city: "",
        },
        gender: "",

    }),
    computed: {
        ...mapGetters('auth', ['token', 'user', 'moreInfo']),

        // setInfo() {
        //     this.upMoreInfo = {
        //         email: this.moreInfo.email,
        //         phone_number: this.moreInfo.phone_number,
        //         configurations: this.moreInfo.configurations,
        //         name: this.moreInfo.name,
        //         family_name: this.moreInfo.family_name,
        //         birthday: this.moreInfo.birthday,
        //         national_id: this.moreInfo.national_id,
        //         gender: this.moreInfo.gender,
        //         job: this.moreInfo.job,
        //         city: this.moreInfo.city,
        //     }
        // }
    },
    methods: {
        ...mapActions('auth', ['getMoreInfo', 'editMoreInfo']),

        async subEditMoreInfo() {
            console.log(this.upMoreInfo)
            try {
                await this.editMoreInfo(this.upMoreInfo)
                this.$store.commit('auth/setAlert', { color: 'success', suc: true, msg: 'Update MoreInfo' })

            } catch (e) {
                console.log(e.response)
                this.$store.commit('auth/setAlert', { color: 'danger', suc: true, msg: 'Error Update MoreInfo' })
            }
            //again get moreInfo
            try {
                const info = { token: this.token, type: this.user.info.userable_type }
                await this.getMoreInfo(info)

            } catch (e) {
                console.log(e)
            }
            setTimeout(() => this.$store.commit('auth/setAlert', { color: '', suc: false, msg: '' }), 4500)

        },

    },
    mounted() {
        console.log(this.moreInfo)
        this.upMoreInfo = {
            email: this.moreInfo.email,
            phone_number: this.moreInfo.phone_number,
            configurations: this.moreInfo.configurations,
            name: this.moreInfo.name,
            family_name: this.moreInfo.family_name,
            birthday: this.moreInfo.birthday,
            national_id: this.moreInfo.national_id,
            gender: this.moreInfo.gender,
            job: this.moreInfo.job,
            city: this.moreInfo.city,

            role: this.user.info.userable_type,
            token: this.token
        }

    }
}

</script>