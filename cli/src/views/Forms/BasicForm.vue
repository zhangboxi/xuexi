<template>
  <div>
    <!--自动校验，添加form-->
    <a-form :layout="formLayout" :form="form">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">
            Horizontal
          </a-radio-button>
          <a-radio-button value="vertical">
            Vertical
          </a-radio-button>
          <a-radio-button value="inline">
            Inline
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <!-- 手动校验的方法<a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        :validateStatus="fieldAStatus"
        :help="fieldAHelp"
      > -->
      <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <!--手动校验 <a-input v-model="fieldA" placeholder="input placeholder" /> -->
        <!--v-decorator 这个是自动校验的实例-->
        <a-input
          v-decorator="[
            'fieldA', //名称
            {
              initialValue: fieldA, //初始值，和data中的对应
              rules: [{ required: true, min: 6, message: '必须大于5个字符' }] //规则
            }
          ]"
          placeholder="input placeholder"
        />
      </a-form-item>
      <a-form-item
        label="Field B"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handelSubmit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    //自动校验，添加form，其中的$form，是在main.js中挂载的
    this.form = this.$form.createForm(this);
    return {
      formLayout: "horizontal",
      fieldA: "hello",
      fieldB: ""
      //屏蔽手动校验
      // fieldAStatus: "",
      // fieldAHelp: ""
    };
  },
  //手动校验
  // watch: {
  //   fieldA(val) {
  //     if (val.length <= 5) {
  //       this.fieldAStatus = "error";
  //       this.fieldAHelp = "必须大于5个字符";
  //     } else {
  //       this.fieldAStatus = "";
  //       this.fieldAHelp = "";
  //     }
  //   }
  // },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    }
  },
  mounted() {
    setTimeout(() => {
      //模拟更改数值，动态改变
      this.form.setFieldsValue({ fieldA: "hello world" });
    }, 3000);
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handelSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);

          //将值，同步到this中的FieldA,FieldB
          Object.assign(this, values);
        }
      });
      //屏蔽手动校验
      // if (this.fieldA.length <= 5) {
      //   this.fieldAStatus = "error";
      //   this.fieldAHelp = "必须大于5个字符";
      // } else {
      //   console.log("通过");
      // }
    }
  }
};
</script>
