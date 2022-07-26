const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  target: state => state.target.target,
  data: state => state.school.data,
  jurisdiction: state => state.target.jurisdiction
}
export default getters
