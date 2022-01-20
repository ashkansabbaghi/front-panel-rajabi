<template>
    <CRow>
        <CAlert
            class="text-center"
            style="z-index : 2;position: fixed; bottom: 2%; width: auto;right: 3%;"
            :color="alert.color"
            dismissible
            v-if="alert.suc"
        >
            <b v-text="alert.msg"></b>
            - {{ user.username }}
        </CAlert>

        <!--  information -->
        <CCol lg="6">
            <CCard class="mb-4">
                <CCardHeader>information</CCardHeader>

                    <CCardBody class="col-6">
                        <p class="fw-normal">
                            <small>
                                username :
                                <strong v-text="user.username"></strong>
                            </small>
                        </p>
                        <p class="fw-normal">
                            <small>
                                email :
                                <strong v-text="user.email"></strong>
                            </small>
                        </p>
                        <p class="fw-normal">
                            <small>
                                phone :
                                <strong v-text="user.phone_number"></strong>
                            </small>
                        </p>
                    </CCardBody>

            </CCard>
        </CCol>

        <!-- update user -->
        <CCol lg="6">
            <CCard class="mb-4">
                <CCardHeader>
                    Edit
                    <span v-text="user.info.userable_type"></span>
                </CCardHeader>

                <CCardBody>
                    <CForm
                        class="row g-3 needs-validation"
                        novalidation
                        @submit.prevent="validationForm()"
                    >
                        <CCol md="4" class="position-relative">
                            <CFormLabel
                                :class="{ 'text-danger': !v.username }"
                                for="validationTooltip01"
                            >Username</CFormLabel>
                            <CFormInput
                                type="text"
                                id="validationTooltip01"
                                v-model="upUser.username"
                                required
                            />
                        </CCol>
                        <CCol md="4" class="position-relative">
                            <CFormLabel
                                :class="{ 'text-danger': !v.email }"
                                for="validationTooltip02"
                            >Email</CFormLabel>
                            <CFormInput
                                placeholder="test@gmail.com"
                                type="email"
                                id="validationTooltip02"
                                v-model="upUser.email"
                                required
                            />
                        </CCol>
                        <CCol md="4" class="position-relative">
                            <CFormLabel
                                :class="{ 'text-danger': !v.phone }"
                                for="validationTooltipUsername"
                            >phone</CFormLabel>
                            <CInputGroup class="has-validation">
                                <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
                                <CFormInput
                                    type="number"
                                    id="validationTooltipUsername"
                                    v-model="upUser.phone_number"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                />
                            </CInputGroup>
                        </CCol>
                        <!-- <CCol md="3" class="position-relative">
                            <CFormLabel for="validationTooltip01">birthday</CFormLabel>
                            <date-picker
                                class="date-picker"
                                id="validationTooltip01"
                                v-model="iiUser.birthday"
                                required
                            ></date-picker>
                            <CFormFeedback tooltip valid>Looks good!</CFormFeedback>
                        </CCol>
                        <CCol md="3" class="position-relative">
                            <CFormLabel for="validationTooltip04">City</CFormLabel>
                            <CFormSelect
                                aria-label="Default select example"
                                v-model="city"
                                required
                            >
                                <option v-if="iiUser.city" value>{{ city }}</option>
                                <option v-else value>choose</option>
                                <option
                                    v-for="city in cities"
                                    :key="city.id"
                                    :value="city.id"
                                >{{ city.name }}</option>
                            </CFormSelect>
                            <CFormFeedback tooltip invalid>Please provide a valid city.</CFormFeedback>
                        </CCol>-->
                        <CCol xs="12" class="position-relative">
                            <CButton color="primary" type="submit">Submit</CButton>
                        </CCol>
                    </CForm>
                </CCardBody>
                <!-- <CCardFooter class="text-muted">2 days ago</CCardFooter> -->
            </CCard>
        </CCol>

        <!-- Address component -->
        <CCol lg="12" class="mb-4">
            <Address />
        </CCol>

        <!-- Company component -->
        <CCol lg="12" class="mb-4">
            <Company />
        </CCol>

        <!-- social component -->
        <CCol lg="12" class="mb-4">
            <Social />
        </CCol>

        <!-- delete user -->
        <CCol xs="12" class="position-relative">
            <CCard class="mb-8">
                <CCardHeader>delete user</CCardHeader>
                <CCardBody>
                    <button
                        id="show-modal"
                        @click="showModal = true"
                        type="button"
                        class="btn btn-ghost-danger"
                    >Enter for delete user</button>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

    <!-- modal -->
    <ModalDeleteUser
        :user="user.username"
        v-if="showModal"
        @close="showModal = false"
        @send="subRemoveUser"
    />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DatePicker from 'vue3-persian-datetime-picker'
import ModalDeleteUser from '@/views/modals/ModalDeleteUser'
import Social from '@/views/widgets/Social'
import Address from '@/views/widgets/Address'
import Company from '@/views/widgets/Company'

export default {
    name: 'Info',
    components: {
        DatePicker,
        ModalDeleteUser,
        Social,
        Address,
        Company,
    },
    data: () => ({
        upUser: {
            username: "",
            email: "",
            phone_number: "",
            role: '',
            token: "",
        },
        alert: {
            color: 'success',
            suc: false,
            msg: ''
        },
        v: {
            email: true,
            username: true,
            phone: true
        },
        showModal: false,
        infoDelete: {
            password: "",
            token: ""
        },
    }),

    computed: {
        ...mapGetters('auth', ['user', 'cities', 'token', 'company', 'moreInfo']),
        setInfo() {
            this.upUser = {
                username: this.user.username,
                email: this.user.email,
                phone_number: this.user.phone_number,
                role: this.user.info.userable_type
            }
        }

    },
    mounted() {
        this.upUser = {
            username: this.user.username,
            email: this.user.email,
            phone_number: this.user.phone_number,
            role: this.user.info.userable_type,
            token: this.token
        }
    },
    methods: {

        ...mapActions('auth',
            [
                'UpdateUser',
                'getUser',
                'removeUser',
                'editMoreInfo',
            ]
        ),


        validationForm() {
            if (this.upUser.username !== this.user.username ||
                this.upUser.email !== this.user.email ||
                this.upUser.phone_number !== this.user.phone_number) {

                if ((this.upUser.username).length > 3) {
                    console.log("true username")
                    this.v.username = true
                    if (this.upUser.email) {
                        if (this.upUser.phone_number) {
                            this.updateUserSubmit()

                        } else {
                            console.log("false phone number")
                        }
                    } else {
                        console.log("false email")
                    }
                } else {
                    console.log("false username")
                    this.v.username = false
                }
            } else {
                console.log("not update === update")
            }

        },

        async updateUserSubmit() {
            try {
                console.log(this.upUser)
                await this.UpdateUser(this.upUser)
                this.alert = { color: 'success', suc: true, msg: 'updated' }
            } catch (e) {
                console.log(e.response)
                console.log(e.message)
                this.alert = { color: 'danger', suc: true, msg: e.message }
            }
            try {
                await this.getUser(this.token)
            } catch (error) {
                console.log(error.response)
            }
            setTimeout(() => this.alert.suc = false, 4500)
        },

        async subRemoveUser(p) {

            this.infoDelete = { password: p, token: this.token }

            console.log(this.infoDelete)
            try {
                await this.removeUser(this.infoDelete)

            } catch (e) {
                console.log(e.response)
            }
        },

        // more info
    }
}
</script>


<style scoped>
.vpd-input-group {
    height: 40px;
    border: 1px solid #bbc0c9;
    border-radius: 5px;
}
</style>