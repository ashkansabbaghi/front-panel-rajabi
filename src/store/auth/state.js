export default function () {
  return {
    token: "",
    refreshToken: "",
    user: {},
    isToken: false,
    errors: [],
    loading: false,
    cities: [],
    roles: ["customer", "employee", "expert", "visitor", "cityadmin"],
    errorNetwork: false,
    address: {},
    company: {},
    social: {},
    moreInfo: {},
    q: [{
      id: 1,
      question: "where are you?"
    }, {
      id: 2,
      question: "What year is your birthday?"
    }, {
      id: 3,
      question: "Who is your best friend?"
    }],
    isQuestion: true,
    alertX: {
      suc: false,
      msg: "vuex",
      color :"success"
    },
    resumes:''

  }
}
