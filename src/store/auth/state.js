export default function () {
  return {
    token: "",
    refreshToken:"",
    user: {},
    isToken: false,
    errors: [],
    loading: false,
    cities: [],
    roles: ["customer", "employee", "expert", "visitor", "admin", "cityadmin"],
    // checkToken: false,
  }
}
