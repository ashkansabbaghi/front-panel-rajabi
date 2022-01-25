<template >
    <CRow>
        <!-- address  -->
        <CCol lg="6">
            <CCard class="mb-4">
                <CCardHeader>Address</CCardHeader>
                <CCardBody style="max-height: 400px;overflow-y: auto;">
                    <CButton
                        class="mb-4"
                        color="info"
                        variant="ghost"
                        @click.prevent="openCreateAddress"
                    >+ create NEW Address</CButton>
                    <template v-for="(ad, index) in address" :key="index">
                        <CListGroup class="mb-4">
                            <CListGroupItem color="dark">
                                #{{ index + 1 }}
                                <b v-text="ad.name"></b>
                            </CListGroupItem>
                            <CListGroupItem>
                                <i v-text="ad.stat"></i> -
                                <i v-text="ad.city"></i> -
                                <i v-text="ad.neighborhood"></i> -
                                <i v-text="ad.street"></i> -
                                <i v-text="ad.alley"></i> -
                                <i v-text="ad.house_number"></i>
                                <a href="#" @click.prevent="openEditAddress(ad)">
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

        <!-- update address -->
        <CCol lg="6">
            <CCard class="mb-4">
                <!-- if Create Address -->
                <CCardHeader v-if="!eAddress.isOpen">
                    Create
                    <b class="text-danger">New</b> Address
                </CCardHeader>
                <!-- if Edit Address -->
                <CCardHeader v-else>
                    Edit
                    <b class="text-danger" v-text="eAddress.name"></b> Address
                </CCardHeader>

                <CCardBody>
                    <CForm
                        class="row g-3 needs-validation"
                        novalidation
                        @submit.prevent="!eAddress.isOpen ? subCreateAddress() : subEditAddress()"
                    >
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upAddressName">
                                name
                                <!-- <span class="text-danger">*</span> -->
                            </CFormLabel>
                            <CFormInput
                                type="text"
                                id="upAddressName"
                                placeholder="enter name"
                                v-model="upAddress.name"

                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upAddressStat">
                                stat
                                <!-- <span class="text-danger">*</span> -->
                            </CFormLabel>
                            <CFormInput
                                type="text"
                                id="upAddressStat"
                                v-model="upAddress.stat"
                                placeholder="enter stat"

                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upAddressCity">
                                city
                                <!-- <span class="text-danger">*</span> -->
                            </CFormLabel>
                            <CFormInput
                                type="text"
                                id="upAddressCity"
                                placeholder="enter city"
                                v-model="upAddress.city"

                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upAddressNeighborhood">neighborhood</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upAddressNeighborhood"
                                placeholder="enter neighborhood"
                                v-model="upAddress.neighborhood"

                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upAddressStreet">street</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upAddressStreet"
                                placeholder="enter street"
                                v-model="upAddress.street"

                            />
                        </CCol>
                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upAddressAlley">alley</CFormLabel>
                            <CFormInput
                                type="text"
                                id="upAddressAlley"
                                placeholder="enter alley"
                                v-model="upAddress.alley"

                            />
                        </CCol>

                        <CCol lg="4" class="position-relative">
                            <CFormLabel for="upAddressHouseNumber">house number</CFormLabel>
                            <CInputGroup class="has-validation">
                                <!-- <CInputGroupText id="inputGroupPrepend">@</CInputGroupText> -->
                                <CFormInput
                                    type="number"
                                    id="upAddressHouseNumber"
                                    placeholder="999 999 999 9"
                                    v-model="upAddress.house_number"
                                    aria-describedby="inputGroupPrepend"

                                />
                            </CInputGroup>
                        </CCol>
                        <CCol xs="12" class="position-relative" v-if="!eAddress.isOpen">
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
        //address
        upAddress: {
            name: '',
            stat: '',
            city: '',
            neighborhood: '',
            street: '',
            alley: '',
            house_number: '',
            others: {},
            id: '',
            token: '',
            role: '',
        },
        eAddress: {
            isOpen: false,
            name: ''
        },

    }),
    computed: {
        ...mapGetters('auth', ['address', 'token', 'user']),

        setInfo() {
            this.upAddress = {
                name: this.address.name,
                stat: this.address.stat,
                city: this.address.city,
                neighborhood: this.address.neighborhood,
                street: this.address.street,
                alley: this.address.alley,
                house_number: this.address.house_number,
                token: this.token,
                role: this.user.info.userable_type,
            }
        }


    },
    methods: {
        ...mapActions('auth', ['getAddress', 'createAddress', 'editAddress',]),

        //  address
        async subCreateAddress() {
            const info = { address: this.upAddress, token: this.token, role: this.user.info.userable_type }
            console.log(info)
            try {
                await this.createAddress(info)

                this.$store.commit('auth/setAlert', { color: 'success', suc: true, msg: 'Created Address' })
                setTimeout(() => this.$store.commit('auth/setAlert', { color: '', suc: false, msg: '' }), 4500)

                this.upAddress = {
                    name: "",
                    stat: "",
                    city: "",
                    neighborhood: "",
                    street: "",
                    alley: "",
                    house_number: "",
                }
            } catch (e) {
                console.log(e.response)
                console.log(e)

                this.$store.commit('auth/setAlert', { color: 'danger', suc: true, msg: 'error' })
                setTimeout(() => this.$store.commit('auth/setAlert', { color: '', suc: false, msg: '' }), 4500)

            }
            //again get address
            try {
                const info = { token: this.token, type: this.user.info.userable_type }
                await this.getAddress(info)
            } catch (e) {
                console.log(e)
            }

        },

        async subEditAddress() {
            const info = { address: this.upAddress, token: this.token, role: this.user.info.userable_type }

            console.log(info)
            try {
                await this.editAddress(info)
                this.$store.commit('auth/setAlert', { color: 'success', suc: true, msg: 'Update Address' })

            } catch (e) {
                console.log(e)
                this.$store.commit('auth/setAlert', { color: 'danger', suc: true, msg: 'Error Address' })
            }
            //again get address
            try {
                const info = { token: this.token, type: this.user.info.userable_type }
                // console.log(info)
                await this.getAddress(info)
            } catch (e) {
                console.log(e)
            }
            setTimeout(() => this.$store.commit('auth/setAlert', { color: '', suc: false, msg: '' }), 4500)

        },

        openEditAddress(ad) {
            console.log(ad.id)
            this.eAddress = { isOpen: true, name: ad.name }
            this.upAddress = {
                id: ad.id,
                name: ad.name,
                stat: ad.stat,
                city: ad.city,
                neighborhood: ad.neighborhood,
                street: ad.street,
                alley: ad.alley,
                house_number: ad.house_number,
                token: this.token,
                role: this.user.info.userable_type,
            }
        },

        openCreateAddress() {
            console.log("create address")
            this.eAddress.isOpen = false
            this.upAddress = {
                name: "",
                stat: "",
                city: "",
                neighborhood: "",
                street: "",
                alley: "",
                house_number: "",
            }

        },


    },
    mounted() {
        // console.log(this.address)
        this.upAddress = {
            name: this.address.name,
            stat: this.address.stat,
            city: this.address.city,
            neighborhood: this.address.neighborhood,
            street: this.address.street,
            alley: this.address.alley,
            house_number: this.address.house_number,
            role: this.user.info.userable_type,
            token: this.token
        }

    }
}

</script>