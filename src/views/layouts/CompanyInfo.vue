<template>
    <CRow>
        <!-- list resume -->
        <CCol lg="6" class="position-relative">
            <CCard class="mb-4">
                <CCardHeader>CompanyInfo</CCardHeader>
                <CCardBody></CCardBody>
                <CCardFooter>footer</CCardFooter>
            </CCard>
        </CCol>

    </CRow>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "companyInfo",
    component: {},
    data: () => ({

    }),
    computed: {
        ...mapGetters("auth", ["resumes", "token", "user"]),
    },
    async mounted() {

    },
    methods: {
        ...mapActions("auth", ["getResume", "setResume", "deleteResume"]),

    },
}
</script>