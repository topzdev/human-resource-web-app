import types from "./types";
import educDetailsServices from "~/services/EducDetails";
export const state = () => ({
  current: null,
  list: []
});

export const mutations = {
  [types.SET_CURRENT](state, data) {
    state.current = data;
  },
  [types.SET_EDUC_DETAILS](state, list) {
    state.list = list;
  },
  [types.ADD_EDUC_DETAILS](state, data) {
    state.list = [...state.list, data];
  },
  [types.DELETE_EDUC_DETAILS](state, id) {
    state.list = state.list.filter(item => item.id !== id);
  }
};

export const actions = {
  async fetchEducDetails({ rootState, state, commit, dispatch }) {
    try {
      const employeeId = rootState.auth.user.employeeId;
      if (!employeeId || state.list.length) return;

      console.log("EMP", employeeId);
      const result = await educDetailsServices.getAll(employeeId);

      commit(types.SET_EDUC_DETAILS, result.data);
    } catch (error) {
      console.error(error);
      dispatch(
        "utils/setNotifDefault",
        "Something went wrong, Please check your console",
        { root: true }
      );
    }
  },

  async fetchSingleEducDetails({ rootState, state, commit, dispatch }, id) {
    try {
      const employeeId = rootState.auth.user.employeeId;
      if (!employeeId) return;

      const result = await educDetailsServices.getOne(id);

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
  async addEducDetails({ rootState, commit, dispatch }, data) {
    try {
      const employeeId = rootState.auth.user.employeeId;
      if (!employeeId) return;

      const result = await educDetailsServices.create({
        employeeId,
        ...data
      });

      commit(types.ADD_EDUC_DETAILS, {
        ...data,
        id: result.data
      });
      dispatch("utils/setNotifDefault", result, { root: true });
    } catch (error) {
      console.error(error);
      dispatch(
        "utils/setNotifDefault",
        "Something went wrong, Please check your console",
        { root: true }
      );
    }
  },

  async deleteEducDetails({ commit, dispatch }, id) {
    try {
      const result = await educDetailsServices.delete(id);

      commit(types.DELETE_EDUC_DETAILS, id);
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
