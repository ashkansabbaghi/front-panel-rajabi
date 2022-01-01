<template>
    <CRow>
        <CCol>
            <CCard class="text-center">
                <CCardHeader v-text="userInfo.username"></CCardHeader>
                <CCardBody>
                    <CCardTitle>Special title treatment</CCardTitle>
                    <CCardText>With supporting text below as a natural lead-in to additional content.</CCardText>
                    <CButton href="#">Go somewhere</CButton>
                </CCardBody>
                <CCardFooter class="text-muted">2 days ago</CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
import { mapActions, mapState } from "vuex"
import store from "@/store"
import axios from "axios"

export default {
    name: 'Info',
    components: {

    },
    data: () => ({
        token: store.state['login'].token,
        userInfo :store.state['login'].user,
    }),
    mounted() {
        store.dispatch('login/getUser', this.token)
    },
}
</script>