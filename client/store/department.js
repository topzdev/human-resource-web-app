import types from "./types";
import setNotifError from "@/utils/setNotifError";
import DepartmentAPI from "@/services/Department";

export const state = () => ({
  loading: false,
  list: {
    rows: [],
    count: 0
  },
  dropdown: [],
  current: null
});

export const mutations = {
  [types.SET_DEPARTMENTS](state, list) {
    state.list = list;
  },
  [types.SET_DROPDOWN](state, list) {
    state.dropdown = list;
  },

  [types.SET_CURRENT](state, current) {
    state.current = current;
  },

  [types.ADD_DEPARTMENT](state, data) {
    state.list = [...state.list.rows, data];
  },
  [types.UPDATE_DEPARTMENT](state, data) {
    if (state.list.length)
      state.list = state.list.rows.map(item =>
        item.id === data.id ? data : item
      );
  }
};

export const actions = {
  fetchOneDepartment: async function(
    { dispatch, commit },
    { id, query: { include, exclude } }
  ) {
    try {
      const result = await DepartmentAPI.getOne(id, {
        include,
        exclude,
        withDeptHead: true
      });
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
  fetchDepartments: async function(
    { dispatch, commit, state },
    { searchBy, searchText, limit, offset }
  ) {
    try {
      // if (state.list.rows.length) return;

      const result = await DepartmentAPI.getAll({
        searchBy,
        searchText,
        limit,
        offset,
        withDeptHead: true
      });
      commit(types.SET_DEPARTMENTS, result.data);
    } catch (error) {
      console.error(error);
      dispatch(
        "utils/setNotifDefault",
        "Something went wrong, Please check your console",
        { root: true }
      );
    }
  },
  createDepartment: async function({ dispatch, commit }, data) {
    try {
      const result = await DepartmentAPI.create(data);
      dispatch("utils/setNotifDefault", result, { root: true });
      console.log(result, data);
      commit(types.ADD_DEPARTMENT, { ...data, id: result.data });
    } catch (error) {
      console.error(error);
      dispatch(
        "utils/setNotifDefault",
        "Something went wrong, Please check your console",
        { root: true }
      );
    } finally {
      this.app.router.push("/department");
    }
  },
  updateDepartment: async function({ dispatch, commit }, data) {
    try {
      const result = await DepartmentAPI.update(data);
      console.log("...updating", result);
      dispatch("utils/setNotifDefault", result, { root: true });
      commit(types.UPDATE_DEPARTMENT, data);
    } catch (error) {
      console.error(error);
      dispatch(
        "utils/setNotifDefault",
        "Something went wrong, Please check your console",
        { root: true }
      );
    } finally {
      this.app.router.push("/department");
    }
  },
  async fetchDropdown({ dispatch, commit }) {
    try {
      const result = await DepartmentAPI.getAll({
        include: ["id", "name"],
        withDeptHead: true
      });

      commit(types.SET_DROPDOWN, result.data.rows);
    } catch (error) {
      dispatch("utils/setNotifDefault", data, { root: true });
    }
  }
};
