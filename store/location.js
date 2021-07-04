export const state = () => ({
  locations: null,
  locationDetail: null
});

export const mutations = {
  setLocations(state, payload) {
    state.locations = payload;
  },

  setPopularLocations(state, payload) {
    state.popularLocations = payload;
  },

  setLocationDetail(state, payload) {
    state.locationDetail = payload;
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

  async getLocationDetail({ commit }, id) {
    await this.$axios.get(`api/locations/get/${id}`)
      .then(res => {
        commit("setLocationDetail", res.data);
      }).catch(err => {
        console.error(err.response.data);
      });
  }
};