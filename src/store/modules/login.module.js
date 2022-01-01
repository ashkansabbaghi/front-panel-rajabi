import axios from "axios"
const state = {
  item: 0,
  itemLogin: 2, //test in ./pages/login

  user: {},
  token: "",
  isToken: false,
  cities: [],
  roles: ["customer", "employee", "expert", "visitor", "admin", "cityadmin"],
}

let URL_logOut = 'auth/logout/'
let URL_getUser = 'auth/my_info/user/'
let URL_getAdmin = 'auth/my_info/admin/'
let URL_city = "city/";

const mutations = {
  initializeStore(state) {
    if (localStorage.getItem('token')) {
      state.token = localStorage.getItem('token');
      state.isToken = true;
    } else {
      state.token = "";
      state.isToken = false;
    }
  },
  setToken(state, token) {
    console.log("setToken" + token)
    state.token = token;
    state.isToken = true;
  },
  removeToken(state) {
    console.log("removeToken")
    state.token = "";
    state.isToken = false;
  },
  setUser(state, user) {
    console.log(user)
    state.user = user
  },
  setCities(state, cities) {
    state.cities = cities
  }
}

const actions = {
  async logOutUser({}, token) {
    axios.post(URL_logOut, {
      //...data
    }, {
      headers: {
        'Authorization': `token ${token}`,
      }
    }).then(response => {
      console.log(response);
      localStorage.removeItem('token')
      localStorage.removeItem('vuex')
      window.setTimeout(function () {
        location.replace('/login')
      }, 300)
    }).catch(err => {
      console.log(err.status)
    })
  },

  async getUser({commit}, token) {
    // console.log(token)
    await axios.post(URL_getUser, token, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      .then(response => (commit("setUser",response.data.data)))
      .catch(err => {
        console.log(err.response)
      })
  },

  async getCity({
    commit
  }) {
    axios
      .get(URL_city)
      .then(response => (commit("setCities", response.data.results)))
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
