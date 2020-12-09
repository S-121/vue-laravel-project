<template>
  <v-row>
    <v-col
      cols="12"
      lg="7"
      xl="6"
      class="info d-none d-md-flex align-center justify-center"
    >
      <v-container>
        <div class="pa-10">
          <v-row justify="center">
            <v-col cols="8" xl="5">
              <div>
                <h2 class="display-1 white--text font-weight-medium">
                  Elegant Design with unlimited features, built with love
                </h2>
                <h6
                  class="subtitle-1 mt-4 white--text op-5 font-weight-regular"
                >
                  Wrappixel helps developers to build organized and well-coded
                  admin dashboards full of beautiful and feature rich modules.
                </h6>
                <v-btn
                  class="mt-4 text-capitalize"
                  x-large
                  outlined
                  color="white"
                  >Learn More</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <v-col cols="12" lg="5" xl="6" class="d-flex align-center">
      <v-container>
        <div class="pa-7 pa-sm-12">
          <v-row>
            <v-col cols="12" lg="9" xl="6">
              <img src="@/assets/images/logo-icon.png" />
              <h2 class="font-weight-bold mt-4 blue-grey--text text--darken-2">
                Sign in
              </h2>
              <h6 class="subtitle-1">
                Don't have an account?
                <router-link to="/authentication/fullregister" class
                  >Sign Up</router-link
                >
              </h6>

              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                action="/dashboards/analytical"
              >
                <v-text-field
                  v-model="input.email"
                  :rules="emailRules"
                  label="E-mail"
                  class="mt-4"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="input.password"
                  :counter="6"
                  :rules="passwordRules"
                  label="Password"
                  required
                  outlined
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                ></v-text-field>

                <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                  <v-checkbox label="Remember me?"></v-checkbox>
                  <div class="ml-auto">
                    <a href="javascript:void(0)" class="link">Forgot pwd?</a>
                  </div>
                </div>
                <v-btn
                  :disabled="!valid"
                  color="info"
                  block
                  class="mr-4"
                  submit
                  @click="submit"
                  >Sign In</v-btn
                >
              </v-form>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FullLogin",
  data: () => ({
    input: {
      email: "",
      password: "",
    },
    valid: true,
    show1: false,
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be less than 6 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        console.log(this.input);
      }
    },
  },
};
</script>
