<template>
  <a-input-group compact>
    <a-select v-model="type" style="width:130px" @change="handleTypeChange">
      <a-select-option value="alipay">支付宝</a-select-option>
      <a-select-option value="bank">银行</a-select-option>
    </a-select>
    <a-input
      style="width: calc(100% - 130px)"
      v-model="number"
      @change="handleNumbereChange"
    />
  </a-input-group>
</template>

<script>
/*封装自动校验的表单
  自定义表单校验遵循的条件：
  提供受控属性 value 或其它与 valuePropName-参数) 的值同名的属性。
  提供 onChange 事件或 trigger-参数) 的值同名的事件。
  不能是函数式组件。
*/
export default {
  props: {
    value: {
      type: Object
    }
  },
  watch: {
    value(val) {
      //Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象
      Object.assign(this, val);
    }
  },
  data() {
    const { type, number } = this.value || {};
    return {
      type: type || "alipay",
      number: number || ""
    };
  },
  methods: {
    handleTypeChange(val) {
      this.$emit("change", { ...this.value, type: val });
    },
    handleNumbereChange(e) {
      this.$emit("change", { ...this.value, number: e.target.value });
    }
  }
};
</script>
