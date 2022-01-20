import api from 'axios'
import FormData from 'form-data'

let URL_login = "auth/login/username/"
let URL_logOut = 'auth/logout/'
let URL_city = "city/"
let URL_getUser = 'auth/my_info/user/'
let URL_register = "auth/register/";
let URL_update_refresh = "auth/update-token/";
let URL_update_user = "auth/my_info/update/";
let URL_remove = "auth/delete_my_account/";
let URL_Address = "auth/my/address/";
let URL_Company = "auth/my/company/";
let URL_Social = "auth/my/social-media/";
let URL_More_Info = "auth/my/info/";


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

export const UpdateUser = async ({
  commit
}, user) => {
  console.log(user)
  await api.post(`${URL_update_user}${user.role}/`, {
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
    }, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    })
    .then((response) => {
      console.log(response.data)
      if (response.data.status) {
        console.log(response.data.status)
      } else {
        console.log(response.data.status)
        throw new TypeError(response.data.message, "actions.js", 74)
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

export const removeUser = async ({
  commit
}, info) => {
  // let data = new FormData()
  // data.append('password', info.password)
  console.log(info)

  await api.delete(URL_remove, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
        'Content-Type': 'application/json'
      },
      data: {
        password: info.password
      }

    })
    .then(response => {
      console.log(response)
      commit("removeToken")
      this.$router.push('/pages/Login')
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
  commit,
  dispatch,
  state
}, token) => {
  // console.log(token)
  await api.post(URL_getUser, token, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      console.log(response.data)
      // console.log(state.refreshToken)

      if (response.data.status) {
        commit("setUser", response.data.data)
      } else {
        console.log("not get user -- refreshToken")
        dispatch('updateToken', state.refreshToken)
      }
    })
}


export const updateToken = async ({
  commit
}, refreshToken) => {
  // console.log(refreshToken)
  await api.post(URL_update_refresh, {
      refresh_token: refreshToken
    })
    .then(response => {
      // console.log(response.data.data)
      if (response.status) {
        commit('setRefToken', response.data.data)
      } else {
        commit('removeToken')
      }
    })
}

// Address
export const getAddress = async ({
  commit,
  dispatch,
  state
}, info) => {
  // console.log(token)
  await api.get(`${URL_Address}${info.type}/`, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data.data)
      commit('getAddress', response.data.data)
    })
}

export const createAddress = async ({
  commit,
  dispatch,
  state
}, info) => {
  console.log(info)
  await api.post(`${URL_Address}${info.role}/`, {
      name: info.name,
      stat: info.stat,
      city: info.city,
      neighborhood: info.neighborhood,
      street: info.street,
      alley: info.alley,
      house_number: info.house_number,
    }, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data)
    })
}

export const editAddress = async ({
  commit,
  dispatch,
  state
}, info) => {
  console.log(info)
  await api.patch(`${URL_Address}${info.role}/`, {
      id: info.id,
      name: info.name,
      stat: info.stat,
      city: info.city,
      neighborhood: info.neighborhood,
      street: info.street,
      alley: info.alley,
      house_number: info.house_number,
    }, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data)
    })
}

// company
export const getCompany = async ({
  commit
}, info) => {
  console.log(info)
  await api.get(`${URL_Company}${info.type}/`, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data.data)
      commit('getCompany', response.data.data)
    })
}
export const createCompany = async ({
  commit
}, info) => {
  console.log(info)
  await api.post(`${URL_Company}${info.role}/`, {
      name: info.name,
      economic_code: info.economic_code,
      national_code: info.national_code,
      registeration_id: info.registeration_id,
      telephone_number: info.telephone_number,
      field_of_activity: info.field_of_activity,
    }, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data)
    })
}
export const editCompany = async ({
  commit,
  dispatch,
  state
}, info) => {
  console.log(info)
  await api.patch(`${URL_Company}${info.role}/`, {
      id: info.id,
      name: info.name,
      economic_code: info.economic_code,
      national_code: info.national_code,
      registeration_id: info.registeration_id,
      telephone_number: info.telephone_number,
      field_of_activity: info.field_of_activity,
    }, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data)
    })
}

// social media
export const getSocial = async ({
  commit
}, info) => {
  console.log(info)
  await api.get(`${URL_Social}${info.type}/`, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data.data)
      commit('getSocial', response.data.data)
    })
}

export const editSocial = async ({
  commit,
  dispatch,
  state
}, info) => {
  console.log(info)
  await api.post(`${URL_Social}${info.role}/`, {
      // id: info.id,
      facebook: info.facebook,
      twitter: info.twitter,
      linkedIn: info.linkedIn,
      telegram: info.telegram,
      youtube: info.youtube,
      instagram: info.instagram,
      aparat: info.aparat,
      // orders: null
    }, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data)
    })
}

// more info
export const getMoreInfo = async ({
  commit
}, info) => {
  console.log(info)
  await api.get(`${URL_More_Info}${info.type}/`, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data.data)
      commit('getMoreInfo', response.data.data)
    })
}

export const editMoreInfo = async ({
  commit,
  dispatch,
  state
}, info) => {
  console.log(info)
  await api.post(`${URL_More_Info}${info.role}/`, {
      // id: info.id,
      email: info.email,
      phone_number: info.phone_number,
      configurations: info.configurations,
      name: info.name,
      family_name: info.family_name,
      birthday: info.birthday,
      national_id: info.national_id,
      gender: info.gender,
      job: info.job,
      stat: info.stat,
      city: info.city,

    }, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data)
    })
}