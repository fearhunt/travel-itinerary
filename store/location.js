export const state = () => ({
  locations: null,
  tempLocation: null
});

export const mutations = {
  setLocations(state, payload) {
    state.locations = payload;
  },

  setPopularLocations(state, payload) {
    state.popularLocations = payload;
  },

  setTempLocation(state, payload) {
    state.tempLocation = payload;
  }
};

export const actions = {
  async getAllLocations({ commit }) {
    await this.$axios.get("/destination/all")
      .then(res => {
        commit("setLocations", res.data.data);
      }).catch(err => {
        console.error(err.response.data);
      });
  },

  updateTempLocation({ commit }, data = null) {
    commit("setTempLocation", data);
  }  
};