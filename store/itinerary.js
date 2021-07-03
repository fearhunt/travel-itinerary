export const state = () => ({
  itineraries: null,
  popularItineraries: null,
  itineraryDetail: null
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
  }
};

export const actions = {
  async getAllItineraries({ commit }) {
    await this.$axios.get("/")
      .then(res => {
        commit("setItineraries", res.data);
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
    await this.$axios.get(`api/itineraries/get/${id}`)
      .then(res => {
        commit("setItineraryDetail", res.data);
      }).catch(err => {
        console.error(err.response.data);
      });
  }
};