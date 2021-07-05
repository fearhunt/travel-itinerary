export const state = () => ({
  itineraries: null,
  popularItineraries: null,
  reviewedItineraries: null,
  unreviewedItineraries: null,
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

  // TODO Set displayed itineraries as one state
  setReviewedItineraries(state, payload) {
    state.reviewedItineraries = payload;
  },

  setUnreviewedItineraries(state, payload) {
    state.unreviewedItineraries = payload;
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
  // TODO Centralized all API Response
  async createItinerary({ dispatch }, payload) {
    const qs = require("querystring");
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    await this.$axios.post("/itin/create", qs.stringify(payload.itin), config)
      .then(res => {
        if (res.data.status == "success") {
          dispatch("createItemPerDayItinerary", { itinId: res.data.itinId, itemPerDay: payload.itemPerDay });
        }
      }).catch(err => {
        console.error(err.response.data);
      })
  },

  async createItemPerDayItinerary({ commit }, payload) {
    const qs = require("querystring");
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    (payload.itemPerDay).forEach(async items => {
      items.forEach(async (item, index) => {
        const data = { 
          idItin: payload.itinId, 
          day: (index + 1), 
          destination: item.locationId,
          desc: item.desc,
          timeStart: item.timeStart.split(":")[0] + ":" + item.timeStart.split(":")[1],
          timeEnd: item.timeEnd.split(":")[0] + ":" + item.timeEnd.split(":")[1],
          price: parseInt(item.price)
        };

        await this.$axios.post("/item/create", qs.stringify(data), config)
          .then(res => {
            if (res.data.status == "success") {
              console.log(`Create item success on id ${payload.itinId}`);
            }
          }).catch(err => {
            console.error(err.response.data);
          });
      });  
    });
  },

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

  async getAllReviewedItineraries({ commit, state }) {
    function checkItinerary(itinerary) {
      return itinerary.isReviewed;
    };

    let data = (state.itineraries).filter(checkItinerary);

    commit("setReviewedItineraries", data);
  },
  
  async getAllUnreviewedItineraries({ commit, state }) {
    function checkItinerary(itinerary) {
      return itinerary.isReviewed == 0;
    };

    let data = (state.itineraries).filter(checkItinerary);

    commit("setUnreviewedItineraries", data);
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