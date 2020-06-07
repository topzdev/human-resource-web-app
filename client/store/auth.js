import types from "./types";
import employeeServices from "@/services/Employee";
import createFormData from "@/utils/createFormData";
import addressServices from "@/services/Address";

export const state = () => ({
  user: {
    id: "EMP-001"
  },
  loading: false,
  infoIds: {
    benifitsId: null,
    familyDetailsId: null,
    addressId: null,
    governmentIssuedId: null
  },
  workInfo: null,
  personalInfo: null,
  contactInfo: null,
  address: null,
  familyDetails: null,
  childrens: [],
  benifits: null,
  educationDetails: [],
  civilEligibility: [],
  workExperience: [],
  trainingPrograms: []
});

export const mutations = {
  [types.SET_PERSONAL_INFO](state, data) {
    const {
      id,
      emailAddress,
      landline,
      mobile,
      designation,
      firstName,
      middleName,
      lastName,
      joiningDate,
      extensionName,
      birthDate,
      birthPlace,
      citizenship,
      bloodType,
      height,
      weight,
      civilStatus,
      gender,
      photo,
      benifitsId,
      familyDetailsId,
      addressId,
      governmentIssuedId
    } = data;
    state.infoIds = {
      benifitsId,
      familyDetailsId,
      addressId,
      governmentIssuedId
    };
    state.workInfo = {
      id,
      designation,
      firstName,
      middleName,
      lastName,
      extensionName,
      joiningDate,
      photo
    };
    state.personalInfo = {
      firstName,
      middleName,
      lastName,
      extensionName,
      birthDate,
      birthPlace,
      citizenship,
      bloodType,
      height,
      weight,
      civilStatus,
      gender
    };
    state.contactInfo = { emailAddress, landline, mobile };
  },
  [types.UPDATE_PERSONAL_INFO](state, data) {
    state.personalInfo = data;
  },
  [types.SET_ADDRESS](state, data) {
    state.address = data;
  },
  [types.SET_LOADING](state, show) {
    state.loading = show;
  }
};

export const actions = {
  async fetchPersonalInfo({ commit, dispatch, state }) {
    try {
      if (state.personalInfo) return;
      commit(types.SET_LOADING, true);

      const result = await employeeServices.getOne(state.user.id, {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
        withPhoto: true,
        withDesignation: true
      });

      commit(types.SET_PERSONAL_INFO, result.data);
      commit(types.SET_LOADING, false);
    } catch ({ response: { data } }) {
      dispatch("utils/setNotifDefault", data, { root: true });
    }
  },
  async updatePersonalInfo({ commit, dispatch, state }, data) {
    try {
      commit(types.SET_LOADING, true);
      const result = await employeeServices.update(
        createFormData({
          id: state.user.id,
          ...data
        })
      );
      commit(types.SET_PERSONAL_INFO, {
        ...state.personalInfo,
        ...state.workInfo,
        ...state.infoIds,
        ...state.contactInfo,
        ...data
      });
      commit(types.SET_LOADING, false);
      dispatch("utils/setNotifDefault", result, { root: true });
    } catch ({ response: { data } }) {
      dispatch("utils/setNotifDefault", data, { root: true });
    }
  },

  async fetchAddressDetails({ commit, dispatch, state }) {
    try {
      if (state.address) return;
      commit(types.SET_LOADING, true);

      const result = await addressServices.getOne(state.infoIds.addressId);

      commit(types.SET_ADDRESS, result.data);
      commit(types.SET_LOADING, false);
    } catch ({ response: { data } }) {
      dispatch("utils/setNotifDefault", data, { root: true });
    }
  },

  async updateAddressDetails({ commit, dispatch, state }, data) {
    try {
      commit(types.SET_LOADING, true);

      const result = await addressServices.update(
        createFormData({
          id: state.infoIds.addressId,
          ...data
        })
      );

      commit(types.SET_ADDRESS, data);
      commit(types.SET_LOADING, false);
      dispatch("utils/setNotifDefault", result, { root: true });
    } catch ({ response: { data } }) {
      dispatch("utils/setNotifDefault", data, { root: true });
    }
  }
};