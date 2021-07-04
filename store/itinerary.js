export const state = () => ({
  itineraries: null,
  popularItineraries: null,
  itineraryDetail: null,
  tempItinerary: null,
  tempItineraryItem: null,
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
  },

  setTempItineraryItem(state, payload) {
    state.tempItineraryItem = payload;
  }
};

export const actions = {
  async getAllItineraries({ commit }) {
    await this.$axios.get("/itin/all")
      .then(res => {
        // * Debugging
        console.log(res.data.data);
        // * Debugging
        commit("setItineraries", res.data.data);
      }).catch(err => {
        console.error(err.response.data);
      });
  },

  async getAllPopularItineraries({ commit, state }) {
    function checkPopularItinerary(itinerary) {
      return itinerary.isPopular;
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
  },

  updateTempItineraryItem({ commit }, data = null) {
    commit("setTempItineraryItem", data);
  }
};