<template>
  <v-card class="mx-auto" max-width="500" outlined>
    <!--begin::Content header-->
    <div
      class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10"
    >
      <span class="font-weight-bold font-size-3 text-dark-60">
        Don't have an account yet?
      </span>
      <NuxtLink class="font-weight-bold font-size-3 ml-2" :to="{ name: '/' }">
        Sign Up!
      </NuxtLink>
    </div>
    <!--end::Content header-->

    <!--begin::Signin-->
    <v-card-text>
      <v-row align="center" class="mx-5">
        <v-flex lg12 class="justify-center align-center">
          <div class="text-center mb-10 mb-lg-20">
            <h3 class="font-size-h1">Sign In</h3>
            <p class="text-muted font-weight-semi-bold">
              Enter your username and password
            </p>
          </div>

          <!--begin::Form-->
          <v-form
            class="form"
            novalidate
            autocomplete="off"
            @submit.prevent="onSubmit"
          >
            <v-layout row wrap class="display-block m-0">
              <ErrorBlockServer :error-message="errorMessage" />
              <v-flex xs12>
                <v-text-field
                  v-model="loginDetail.email"
                  v-validate="'required|email'"
                  label="Email*"
                  type="text"
                  name="email"
                  :error-messages="getErrorValue('email')"
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="loginDetail.password"
                  v-validate="'required|min:6'"
                  label="Password*"
                  type="password"
                  name="password"
                  :error-messages="getErrorValue('password')"
                />
              </v-flex>
            </v-layout>

            <!--begin::Action-->
            <div class="form-group">
              <v-layout>
                <v-flex xs12>
                  <a
                    id="kt_login_forgot"
                    class="text-dark-60 text-hover-primary my-3 mr-2 float-right mt-0"
                    @click="forgotPasswordDialog = true"
                  >
                    Forgot Password?
                  </a>
                </v-flex>
              </v-layout>

              <v-btn
                ref="kt_login_signin_submit"
                class="btn w100 btn-primary float-right mr-0 mt-5 font-weight-bold px-9 py-4 my-3 font-size-3 mx-4"
                type="submit"
                :loading="isSubmitting"
              >
                {{ $getConst("BTN_SUBMIT") }}
              </v-btn>
            </div>
          </v-form>
          <!--end::Form-->
        </v-flex>
      </v-row>
    </v-card-text>
    <!--end::Signin-->
    <snackbar v-model="snackbar" />
    <permission-dialog v-model="permissionDialog" />
  </v-card>
</template>

<script src="./login.js"></script>
