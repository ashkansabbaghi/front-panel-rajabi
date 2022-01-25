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
let URL_valid_last_pass = "auth/user/recovery/by-last-password/";
let URL_new_pass = "auth/user/recovery/new-password/";
let URL_set_answer = "auth/user/security-answer/";
let URL_getResume = "users/"; //go to function  users/:type/resume/


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
      // this.$router.push('/pages/Login')
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
      // console.log(response.data)
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
      // console.log(response.data.data)
      commit('getAddress', response.data.data)
    })
}

export const createAddress = async ({
  commit
}, info) => {
  console.log(info)
  const data = new FormData()
  if (info.address.name) data.append('name', info.address.name)
  if (info.address.stat) data.append('stat', info.address.stat)
  if (info.address.city) data.append('city', info.address.city)
  if (info.address.neighborhood) data.append('neighborhood', info.address.neighborhood)
  if (info.address.street) data.append('street', info.address.street)
  if (info.address.alley) data.append('alley', info.address.alley)
  if (info.address.house_number) data.append('house_number', info.address.house_number)

  await api.post(`${URL_Address}${info.role}/`, data, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data)
    })
}

export const editAddress = async ({
  commit
}, info) => {
  const data = new FormData()
  if (info.address.id) data.append('id', info.address.id)
  if (info.address.name) data.append('name', info.address.name)
  if (info.address.stat) data.append('stat', info.address.stat)
  if (info.address.city) data.append('city', info.address.city)
  if (info.address.neighborhood) data.append('neighborhood', info.address.neighborhood)
  if (info.address.street) data.append('street', info.address.street)
  if (info.address.alley) data.append('alley', info.address.alley)
  if (info.address.house_number) data.append('house_number', info.address.house_number)

  console.log(info)
  await api.patch(`${URL_Address}${info.role}/`, data, {
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
  // console.log(info)
  await api.get(`${URL_Company}${info.type}/`, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      // console.log(response.data.data)
      commit('getCompany', response.data.data)
    })
}
export const createCompany = async ({
  commit
}, info) => {
  const data = new FormData()
  if (info.company.name) data.append('name', info.company.name)
  if (info.company.economic_code) data.append('economic_code', info.company.economic_code)
  if (info.company.national_code) data.append('national_code', info.company.national_code)
  if (info.company.registeration_id) data.append('registeration_id', info.company.registeration_id)
  if (info.company.telephone_number) data.append('telephone_number', info.company.telephone_number)
  if (info.company.field_of_activity) data.append('field_of_activity', info.company.field_of_activity)

  console.log(info)
  await api.post(`${URL_Company}${info.role}/`, data, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data)
    })
}
export const editCompany = async ({
  commit
}, info) => {
  const data = new FormData()
  if (info.company.id) data.append('id', info.company.id)
  if (info.company.name) data.append('name', info.company.name)
  if (info.company.economic_code) data.append('economic_code', info.company.economic_code)
  if (info.company.national_code) data.append('national_code', info.company.national_code)
  if (info.company.registeration_id) data.append('registeration_id', info.company.registeration_id)
  if (info.company.telephone_number) data.append('telephone_number', info.company.telephone_number)
  if (info.company.field_of_activity) data.append('field_of_activity', info.company.field_of_activity)
  console.log(info)
  await api.patch(`${URL_Company}${info.role}/`, data, {
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
  // console.log(info)
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
  commit
}, info) => {
  console.log(info)
  const data = new FormData()

  data.append("facebook", info.facebook)
  if (info.twitter) data.append("twitter", info.twitter)
  if (info.linkedIn) data.append("linkedIn", info.linkedIn)
  if (info.youtube) data.append("youtube", info.youtube)
  if (info.telegram) data.append("telegram", info.telegram)
  if (info.instagram) data.append("instagram", info.instagram)
  if (info.aparat) data.append("aparat", info.aparat)

  console.log(data)

  await api.post(`${URL_Social}${info.role}/`,
      data, {
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
  // console.log(info)
  await api.get(`${URL_More_Info}${info.type}/`, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      // console.log(response.data.data)
      commit('getMoreInfo', response.data.data)
    })
}

export const editMoreInfo = async ({
  commit,
}, info) => {
  console.log(info)
  await api.post(`${URL_More_Info}${info.role}/`, {
      email: info.email,
      phone_number: (info.phone_number) ? info.phone_number : undefined,
      configurations: (info.configurations) ? info.configurations : undefined,
      name: (info.name) ? info.name : undefined,
      family_name: (info.family_name) ? info.family_name : undefined,
      birthday: (info.birthday) ? info.birthday : undefined,
      national_id: (info.national_id) ? info.national_id : undefined,
      gender: (info.gender) ? info.gender : undefined,
      job: (info.job) ? info.job : undefined,
      city: (info.city) ? info.city : undefined,
    }, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data)
    })
}

// valid pass (change pass)
export const setValidPass = async ({
  commit,
}, info) => {
  console.log(info)
  await api.post(URL_valid_last_pass, {
      username: info.username,
      last_password: (info.last_password) ? info.last_password : undefined,
    }, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data)
    })
}

export const newPass = async ({
  commit,
}, info) => {
  console.log(info)
  await api.post(URL_new_pass, {
      username: info.username,
      new_password: (info.new_password) ? info.new_password : undefined,
      security_question_id: (info.security_question_id) ? info.security_question_id : undefined,
      answer: (info.answer) ? info.answer : undefined,
    }, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data)
    })
}

export const setQuestion = async ({
  commit,
}, info) => {
  console.log(info)
  await api.post(URL_set_answer, {
      security_question_id: info.security_question_id,
      answer: (info.answer) ? info.answer : undefined,
    }, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response.data)
    })
}

// resume
export const getResume = async ({
  commit
}, info) => {
  // console.log(info)
  await api.get(`${URL_getResume}${info.type}/resume/`, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response)
      commit('getResume', response.data)
    })
}


export const setResume = async ({
  commit,
}, info) => {
  console.log(info)
  const data = new FormData()
  data.append('file', info.file)

  await api.post(`${URL_getResume}${info.type}/resume/`, data, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response)
      commit('getResume', response.data)
    })
}

export const updateResume = async ({
  commit,
}, info) => {
  console.log(info)
  const data = new FormData()
  data.append('file', info.file)

  await api.patch(`${URL_getResume}${info.type}/resume/`, data, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response)
      commit('getResume', response.data)
    })
}

export const deleteResume = async ({
  commit,
}, info) => {
  console.log(info)

  await api.delete(`${URL_getResume}${info.type}/resume/`, {
      headers: {
        'Authorization': `Bearer ${info.token}`,
      }
    })
    .then(response => {
      console.log(response)
      commit('getResume', null)
    })
}
