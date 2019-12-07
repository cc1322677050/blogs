const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  email:state => state.user.email,
  registrationTime:state=>state.user.registrationTime,
  birthday:state=>state.user.birthday,
  age:state=>state.user.age,
  telephoneNumber:state=>state.user.telephoneNumber,
  nickname:state=>state.user.nickname,
  roles: state => state.user.roles
}
export default getters
