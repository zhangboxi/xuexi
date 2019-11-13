<template>
  <div>
    <!--ant design vue的自动校验：form-->
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, min: 6, message: '长符不符合' }]
            }
          ]"
          placeholder="请输入付款账号"
        />
      </a-form-item>

      <a-form-item
        label="收款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <!--下面是封装自动校验的表单 ReceiverAccount，自定义校验validator为内容-->
        <ReceiverAccount
          v-decorator="[
            'receiverAccount',
            {
              initialValue: step.receiverAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号',
                  validator: (rule, value, callback) => {
                    if (value && value.number) {
                      callback();
                    } else {
                      callback(false);
                    }
                  }
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import ReceiverAccount from "@/components/ReceiverAccount";
export default {
  components: {
    ReceiverAccount
  },
  data() {
    this.form = this.$form.createForm(this);
    return {
      //样式
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSubmit() {
      const { form, $router, $store } = this;
      form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          //更新vuex中的值
          $store.commit({
            type: "form/saveStepFormData",
            payload: values
          });
          //跳转到下一步
          $router.push("/form/step-form/confirm");
        }
      });
    }
  }
};
</script>

<style></style>
