<template >
    <CRow>
        <!-- company  -->
        <CCol lg="6">
            <CCard class="mb-4">
                <CCardHeader>Company</CCardHeader>
                <CCardBody style="max-height: 400px;overflow-y: auto;">
                    <CButton
                        class="mb-4"
                        color="info"
                        variant="ghost"
                        @click.prevent="openCreateCompany"
                    >+ create NEW Company</CButton>
                    <template v-for="(co , index) in company" :key="index">
                        <CListGroup class="mb-4">
                            <CListGroupItem color="dark">
                                #{{ index + 1 }}
                                <b v-text="co.name"></b>
                            </CListGroupItem>
                            <CListGroupItem>
                                <i v-text="co.economic_code"></i> -
                                <i v-text="co.national_code"></i> -
                                <i v-text="co.registeration_id"></i> -
                                <i v-text="co.telephone_number"></i> -
                                <i v-text="co.field_of_activity"></i>
                                -
                                <a
                                    href="#"
                                    @click.prevent="openEditCompany(co)"
                                >
                                    <CIcon
                                        content="cilPencil"
                                        size="lg"
                                        style="position: absolute; right: 5%;"
                                    />
                                </a>
                            </CListGroupItem>
                        </CListGroup>
                    </template>
                </CCardBody>
            </CCard>
        </CCol>

        <!-- update company -->
        <CCol lg="6">
            <CCard class="mb-4">
                <!-- if Create company -->
                <CCardHeader v-if="!eCompany.isOpen">
                    Create
                    <b class="text-danger">New</b> Company
                </CCardHeader>
                <!-- if Edit Company -->
                <CCardHeader v-else>
                    Edit
                    <b class="text-danger" v-text="eCompany.name"></b> Company
                </CCardHeader>

                <CCardBody>
                    <CForm
                        class="row g-3 needs-validation"
                        novalidation
                        @submit.prevent="!eCompany.isOpen ? subCreateCompany() : subEditCompany()"
                    >
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upCompanyName">
                                name
                                <!-- <span class="text-danger">*</span> -->
                            </CFormLabel>
                            <CFormInput
                                type="text"
                                id="upCompanyName"
                                placeholder="enter name"
                                v-model="upCompany.name"
                                required
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upCompanyeconomic_code">economic_code</CFormLabel>
                            <CFormInput
                                type="number"
                                id="upCompanyeconomic_code"
                                v-model="upCompany.economic_code"
                                placeholder="enter economic_code"
                                :required="eCompany.isOpen"
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upCompanynational_code">national_code</CFormLabel>
                            <CFormInput
                                type="number"
                                id="upCompanynational_code"
                                placeholder="enter national_code"
                                v-model="upCompany.national_code"
                                :required="eCompany.isOpen"
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upCompanyregisteration_id">registeration_id</CFormLabel>
                            <CFormInput
                                type="number"
                                id="upCompanyregisteration_id"
                                placeholder="enter registeration_id"
                                v-model="upCompany.registeration_id"
                                :required="eCompany.isOpen"
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upCompanytelephone_number">telephone_number</CFormLabel>
                            <CFormInput
                                type="number"
                                id="upCompanytelephone_number"
                                placeholder="enter telephone_number"
                                v-model="upCompany.telephone_number"
                                :required="eCompany.isOpen"
                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upCompanyfield_of_activity">field_of_activity</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upCompanyfield_of_activity"
                                placeholder="enter field_of_activity"
                                v-model="upCompany.field_of_activity"
                                :required="eCompany.isOpen"
                            />
                        </CCol>

                        <CCol xs="12" class="position-relative" v-if="!eCompany.isOpen">
                            <CButton color="primary" type="submit">Create</CButton>
                        </CCol>
                        <CCol xs="12" class="position-relative" v-else>
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
    name: 'Address',
    data: () => ({
        //company
        upCompany: {
            id: '',
            userable_type: '',

            name: '',
            economic_code: '',
            national_code: '',
            registeration_id: '',
            telephone_number: '',
            field_of_activity: '',
        },
        eCompany: {
            isOpen: false,
            name: ''
        },
    }),
    computed: {
        ...mapGetters('auth', ['company', 'token', 'user']),

        setInfo() {
            this.upCompany = {
                userable_type: this.company.userable_type,
                name: this.company.name,
                economic_code: this.company.economic_code,
                national_code: this.national_code,
                registeration_id: this.company.registeration_id,
                telephone_number: this.company.telephone_number,
                field_of_activity: this.company.field_of_activity,
            }
        }


    },
    methods: {
        ...mapActions('auth', ['getCompany', 'createCompany', 'editCompany',]),

        // company
        async subCreateCompany() {
            console.log(this.upCompany)
            try {
                await this.createCompany(this.upCompany)
                this.alert = { color: 'success', suc: true, msg: 'Created Company' }
                this.upCompany = {
                    name: "",
                    economic_code: "",
                    national_code: "",
                    registeration_id: "",
                    telephone_number: "",
                    field_of_activity: "",
                }
            } catch (e) {
                console.log(e.response)
                this.alert = { color: 'danger', suc: true, msg: 'error' }
            }
            //again get company
            try {
                const info = { token: this.token, type: this.user.info.userable_type }
                // console.log(info)
                await this.getCompany(info)
            } catch (e) {
                console.log(e)
            }

        },

        async subEditCompany() {
            // upCompany in openEditCompany() change
            console.log(this.upCompany)
            try {
                await this.editCompany(this.upCompany)
            } catch (e) {
                console.log(e)
            }
            //again get Company
            try {
                const info = { token: this.token, type: this.user.info.userable_type }
                // console.log(info)
                await this.getCompany(info)
            } catch (e) {
                console.log(e)
            }
        },

        openEditCompany(co) {
            console.log(co.id)
            this.eCompany = { isOpen: true, name: co.name }
            this.upCompany = {
                id: co.id,
                name: co.name,
                economic_code: co.economic_code,
                national_code: co.national_code,
                registeration_id: co.registeration_id,
                telephone_number: co.telephone_number,
                field_of_activity: co.field_of_activity,

                token: this.token,
                role: co.userable_type,
            }
        },
        openCreateCompany() {
            console.log("create Company")
            this.eCompany.isOpen = false
            this.upCompany = {
                name: "",
                economic_code: "",
                national_code: "",
                registeration_id: "",
                telephone_number: "",
                field_of_activity: "",
            }

        },


    },
    mounted() {

        this.upCompany = {
            name: this.company.name,
            economic_code: this.company.economic_code,
            national_code: this.national_code,
            registeration_id: this.company.registeration_id,
            telephone_number: this.company.telephone_number,
            field_of_activity: this.company.field_of_activity,
            role: this.user.info.userable_type,
            token: this.token
        }
    }
}

</script>