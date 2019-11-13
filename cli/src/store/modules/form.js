import router from "../../router";
import request from "../../utils/request";

//VUEX中的一些参数，并在上方的index.js加载
const state = {
  step: {
    payAccount: "123456",
    receiverAccount: {
      type: "alipay",
      number: ""
    }
  }
};

const actions = {
  async submitStepForm({ commit }, { payload }) {
    //模拟向后台发送数据u，正常启动会被mock拦截
    await request({
      url: "/api/form",
      method: "POST",
      data: payload
    });
    //调用mutations，中的方法
    commit("saveStepFormData", { payload });
    router.push("/form/step-form/result");
  }
};

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload
    };
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
