import axios from '../../axios.js'

export const state = {
  currentUser: localStorage.getItem('auth.currentUser'),
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    console.log('SET_CURRENT_USER', newValue)
    saveState('auth.currentUser', newValue)
  },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser
  },
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  // eslint-disable-next-line no-unused-vars
  init({ state, dispatch }) {
    dispatch('validate')
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, { email, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')
    console.log("login", email, password);
    return axios.post("api/login", { email: email, password: password }).then((res) => {
      console.log("login", res.data.user.role);
      const user = res.data.user
      commit('SET_CURRENT_USER', user)
      return user
    });
  },

  // Logs out the current user.
  logOut({ commit }) {
    // eslint-disable-next-line no-unused-vars
    commit('SET_CURRENT_USER', null)
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      axios.get("api/logout").then((response) => {
        resolve(true);
      }).catch((error) => {
        reject(this._handleError(error));
      })
    })
  },

  // register the user
  // eslint-disable-next-line no-unused-vars
  register({ commit, dispatch, getters }, { fullname, email, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')
  },

  // register the user
  // eslint-disable-next-line no-unused-vars
  resetPassword({ commit, dispatch, getters }, { email } = {}) {
    if (getters.loggedIn) return dispatch('validate')
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  // eslint-disable-next-line no-unused-vars
  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null)
    return axios.get("api/login").then((res) => {
      console.log(res.data);
      const user = res.data.user
      commit('SET_CURRENT_USER', user)
      return user
    });
  },
}

// ===
// Private helpers
// ===

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}
