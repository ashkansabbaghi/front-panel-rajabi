import axios from "axios"
const state = {
  item: 0,
  itemLogin: 2, //test in ./pages/login

  user: {},
  token: "",
  isToken: false,
  cities: [],
  roles: ["customer", "employee", "expert", "visitor", "admin", "cityadmin"],
  errors: "",
}

let URL_logOut = 'auth/logout/'
let URL_getUser = 'auth/my_info/user/'
let URL_getAdmin = 'auth/my_info/admin/'
let URL_city = "city/";
let URL_login = "auth/login/username/";

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
    localStorage.clear()
  },
  setUser(state, user) {
    console.log(user)
    state.user = user
  },
  setCities(state, cities) {
    state.cities = cities
  },
  setError(state, error) {
    console.log(error)
    state.error = error
  }
}

const actions = {

  //     async getUser({
  //       commit
  //     }, token) {
  //       console.log(token)
  //       return await axios.post(URL_getUser, token, {
  //         headers: {
  //           "Authorization": `Bearer ${token}`,
  //         }
  //       });
  //       console.log(res)
  //       // .then(response => {
  //       //   console.log(response.data)
  //       //   if (response.data.status) {
  //       //     console.log(response.data.status)
  //       //     commit("setUser", response.data.data)
  //       //   } else {
  //       //     console.log("false")
  //       //     commit("removeToken")
  //       //   }

  //   //   })
  //   // .catch(err => {
  //   //   console.log(err.response)
  //   // })
  // },

  // async loginSubmit({
  //   commit,
  //   dispatch
  // }, user) {
  //   console.log(user);
  //   axios.defaults.headers.common['Authorization'] = ''
  //   // localStorage.removeItem('token')
  //   commit('removeToken')
  //   // login
  //   await axios.post(`${URL_login}${user.role}/`, {
  //     username: user.username,
  //     password: user.password,

  //   }).then((response) => {
  //     if (response.status) {
  //       const token = response.data.data.token;
  //       const refToken = response.data.data.refreshToken;
  //       // const user = response.data.data.wallet.name;

  //       //save token
  //       commit("setToken", token)

  //       // loading
  //       // this.loading = false;
  //       // change direction
  //       // window.setTimeout(function () {
  //       //   location.replace("/");
  //       // }, 100);
  //     }
  //   }).catch((error) => {
  //     // loading
  //     // this.loading = false;
  //     console.log(error.response)
  //     if (!error.response) {
  //       commit("setError", error.response.data)
  //     }
  //   })
  //   //get user

  // },

  async getUser({
    commit
  }, token) {
    console.log(token)
    await axios.post(URL_getUser, token, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      .then(response => {
        console.log(response.data.data)
        if (response.data.status) {
          console.log(response.data.status)
          commit("setUser", response.data.data)
        } else {
          console.log("false")
          commit("removeToken")
        }

      })
      .catch(err => {
        console.log(err.response)
      })
  },

  async logOutUser({
    commit
  }, info) {
    console.log(info)
    axios.post(`${URL_logOut}${info.userInfo}/`, {
      //...data
    }, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    }).then(response => {
      console.log(response);
      commit("removeToken")
      // localStorage.removeItem('token')
      localStorage.removeItem('vuex')
      window.setTimeout(function () {
        location.replace('/')
      }, 0)
    }).catch(err => {
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
