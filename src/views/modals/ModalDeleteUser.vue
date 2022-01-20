<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <CCard textColor="dark" class="text-center">
                    <CCardHeader>REMOVE</CCardHeader>
                    <CCardBody>
                        <CCardBody>
                            <CForm>
                                <div class="mb-3">
                                    <CFormLabel class="mb-4" for="exampleFormControlInput1">
                                        {{ user }} <br> in the box to delete your account
                                        Enter your
                                        <b>password</b>
                                        in the box to delete your account
                                    </CFormLabel>
                                    <CFormInput
                                        :class="{ danger: notMatch }"
                                        v-model="formUser"
                                        type="password"
                                        id="exampleFormControlInput1"
                                        placeholder="Enter your username"
                                    />
                                </div>
                            </CForm>
                        </CCardBody>

                        <CButton color="secondary" variant="ghost" @click="$emit('close')">Close</CButton>
                        <CButton color="danger" variant="ghost" @click="send()">Send</CButton>
                    </CCardBody>
                </CCard>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "modalDeleteUser",
    props: ['user'],
    data: () => ({
        formUser: '',
        notMatch: false,
    }),
    methods: {
        send() {
            // if (this.formUser === this.user) {
            //     console.log("send emit send")
            //     this.notMatch = false
            this.$emit('send', this.formUser)
            // } else {
            //     console.log("not match")
            //     this.notMatch = true
            // }
        }
    }
}
</script>


<style lang="scss" scoped>
#app {
    padding: 1rem;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.281);
    display: table;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 35%;
    margin: 0px auto;
    // padding: 20px 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgb(0 0 0 / 25%);
    font-family: Helvetica, Arial, sans-serif;
}

.danger {
    border-color: #ffaeae;
    background: #fff1f1;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    display: block;
    margin-top: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>