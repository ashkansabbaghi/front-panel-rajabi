<template>
    <CRow>
        <CCol>
            <CCard class="text-center">
                <CCardHeader v-text="user.username"></CCardHeader>

                <CCardBody>
                    <CCardTitle v-text="user.phone_number"></CCardTitle>
                    <CCardText v-text="user.info.userable_type" ></CCardText>
                    <CButton href="#" color="success" variant="ghost">edit profile</CButton>
                </CCardBody>
                <CCardFooter class="text-muted">2 days ago</CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
import store from "@/store"
import { mapGetters } from 'vuex'

export default {
    name: 'Info',
    components: {

    },
    data: () => ({

    }),

    computed: {
        ...mapGetters('auth', ['user'])
    },
    mounted() {
        // console.log(this.user)
    }
}
</script>