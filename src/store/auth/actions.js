import api from 'axios'

let URL_login = "auth/login/username/"
let URL_logOut = 'auth/logout/'
let URL_city = "city/"
let URL_getUser = 'auth/my_info/user/'
let URL_register = "auth/register/";
let URL_update_refresh = "auth/update-token/";


export const login = async ({
  commit
}, user) => {
  // console.log(user)
  api.defaults.headers.common["Authorization"] = "";
  commit('removeToken')
  // axios
  await api.post(`${URL_login}${user.role}/`, {
      username: user.username,
      password: user.password,
    })
    .then((response) => {
      if (response.data.data) {
        console.log(response.data.data)
        commit("setToken", response.data.data)
        api.defaults.headers.common.Authorization = "Bearer " + response.data.data.token
      }
    });
}

export const Register = async ({
  commit
}, user) => {
  api.defaults.headers.common["Authorization"] = "";
  localStorage.clear();
  // axios
  await api
    .post(`${URL_register}${user.role}/`, {
      username: user.username,
      password: user.password,
      email: user.email,
      phone_number: user.phone_number,
      city: user.city,
    })
    .then((response) => {
      if (response.status) {
        commit("setToken", response.data.data);
      }
    })
}

export const logOut = async ({
  commit
}, info) => {
  await api.post(`${URL_logOut}${info.userInfo}/`, {}, {
    headers: {
      'Authorization': `Bearer ${info.token}`
    }
  }).then(response => {
    console.log(response)
    commit("removeToken")
  })
}

export const getCity = async ({
  commit
}) => {
  await api.get(URL_city).then(response => {
    commit("getCities", response.data.results)
  })
}

export const getUser = async ({
  commit
}, token) => {
  // console.log(token)
  await api.post(URL_getUser, token, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      console.log(response.data)

      if (response.data.status) {
        commit("setUser", response.data.data)
      } else {
        console.log("false")
        commit("removeToken")
      }
    })
}


export const updateToken = async ({
  commit
}, refreshToken) => {
  console.log(refreshToken)
  await api.post(URL_update_refresh, {
    refresh_token: refreshToken
  })
    .then(response => {
      console.log(response.data.data)
      if (response.status) {
        commit('setToken', response.data.data)
      } else {
        commit('removeToken')
      }
    })
}
