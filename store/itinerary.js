export const state = () => ({
  itineraries: null,
  popularItineraries: null,
  itineraryDetail: null,
  tempItinerary: null
});

export const mutations = {
  setItineraries(state, payload) {
    state.itineraries = payload;
  },

  setPopularItineraries(state, payload) {
    state.popularItineraries = payload;
  },

  setItineraryDetail(state, payload) {
    state.itineraryDetail = payload;
  },

  setTempItinerary(state, payload) {
    state.tempItinerary = payload;
  }
};

export const actions = {
  async getAllItineraries({ commit }) {
    await this.$axios.get("/itin/all")
      .then(res => {
        commit("setItineraries", res.data.data);
      }).catch(err => {
        console.error(err.response.data);
      });
  },

  async getAllPopularItineraries({ commit, state }) {
    function checkPopularItinerary(itinerary) {
      return itinerary.isPopular == 0;
    };

    let data = (state.itineraries).filter(checkPopularItinerary);

    commit("setPopularItineraries", data);
  },

  async getItineraryDetail({ commit }, id) {
    await this.$axios.get(`itin/${id}`)
      .then(res => {
        commit("setItineraryDetail", res.data.data);
      }).catch(err => {
        console.error(err.response.data);
      });
  },

  updateTempItinerary({ commit }, data = null) {
    commit("setTempItinerary", data);
  }  
};