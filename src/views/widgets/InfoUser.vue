<template>
    <CRow>
        <CCol>
            <CCard class="text-center">
                <CCardHeader v-text="user.username"></CCardHeader>

                <CCardBody>
                    <CCardTitle  v-text="user.phone_number"></CCardTitle>
                    <!-- <CCardText v-text="user.info.userable_type" ></CCardText> -->
                    <CButton href="#" color="success" variant="ghost">edit profile</CButton>
                </CCardBody>
                <CCardFooter class="text-muted">2 days ago</CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
import store from "@/store"

export default {
    name: 'Info',
    components: {

    },
    props: ["user"],
    data: () => ({
        token: store.state['login'].token,
        userType: "",

    }),

    // computed: {
    //     count:()=> (this.$store.state['login'].user)
    // },
    mounted() {
        console.log(this.user);
        // this.userType = this.user.info.userable_type
        // store.dispatch('login/getUser', this.token)
        // this.token = store.state['login'].token
        // this.user = store.state['login'].user
    }
}
</script>