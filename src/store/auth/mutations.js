// export function someMutation( /* state */ ) {}

export const setToken = (state, token) => {
  console.log(token)
  localStorage.setItem('token', token.token)
  state.token = token.token
  state.refreshToken = token.refreshToken
  state.isToken = true
}
export const setRefToken = (state, token) => {
  console.log(token)
  localStorage.setItem('token', token.token)
  state.token = token.token
  state.refreshToken = token.refresh_token
  state.isToken = true
}

export const removeToken = (state) => {
  console.log('removing token')
  localStorage.clear()
  state.token = ''
  state.user = ''
  state.refreshToken = ''
  state.isToken = false
}

export const setError = (state, error) => {
  localStorage.removeItem("vuex");
  for (const e in error.response.data.non_field_errors) {
    const i = `${error.response.data.non_field_errors[e]}`;
    state.errors.push(i);
  }
}
export const setEmptyError = (state) => {
  state.errors = []
}
export const setUser = (state, user) => {
  state.user = user
}

export const getCities = (state, cities) => {
  state.cities = cities
}
export const setErrorNetwork = (state, bool) => {
  state.errorNetwork = bool
}

export const getAddress = (state, address) => {
  state.address = address
}

export const getCompany = (state, company) => {
  state.company = company
}
export const getSocial = (state, social) => {
  state.social = social
}
export const getMoreInfo = (state, moreInfo) => {
  state.moreInfo = moreInfo
}
export const setAlert = (state, info) => {
  state.alertX = {
    color: info.color,
    suc: info.suc,
    msg: info.msg
  }
}
export const getResume = (state, resume) => {
  state.resumes = resume
}
