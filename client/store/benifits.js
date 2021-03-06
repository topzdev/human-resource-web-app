import types from "./types";
import benifitsServices from "~/services/Benifits";
export const state = () => ({
  current: null
});

export const mutations = {
  [types.SET_CURRENT](state, data) {
    state.current = data;
  }
};

export const actions = {
  async fetchBenifits({ rootState, state, commit, dispatch }) {
    try {
      const id = rootState.personal.infoIds.benifitsId;
      if (!id) return;

      const result = await benifitsServices.getOne(id);

      commit(types.SET_CURRENT, result.data);
    } catch (error) {
      console.error(error);
      dispatch(
        "utils/setNotifDefault",
        "Something went wrong, Please check your console",
        { root: true }
      );
    }
  },
  async updateBenifits({ rootState, commit, dispatch }, data) {
    try {
      const id = rootState.personal.infoIds.benifitsId;
      if (!id) return;

      const result = await benifitsServices.update({
        id,
        ...data
      });

      commit(types.SET_CURRENT, data);
      dispatch("utils/setNotifDefault", result, { root: true });
    } catch (error) {
      console.error(error);
      dispatch(
        "utils/setNotifDefault",
        "Something went wrong, Please check your console",
        { root: true }
      );
    }
  }
};
