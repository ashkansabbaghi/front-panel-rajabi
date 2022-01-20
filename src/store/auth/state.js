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
    company : {},
    social :{},
    moreInfo : {},

  }
}
