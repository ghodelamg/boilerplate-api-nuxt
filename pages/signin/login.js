import { mapState } from 'vuex';
import CommonServices from '../../common_services/common';
import ErrorBlockServer from '~/components/partials/ErrorBlockServer.vue';
import Snackbar from '~/components/partials/Snackbar.vue';
import PermissionDialog from '~/components/partials/PermissionDialog.vue';

export default {
  name: 'Login',
  data() {
    return {
      errorMessage: '',
      // Validation Message
      validationMessages: {
        email: [{ key: 'required', value: 'Email required' }, {
          key: 'email',
          value: 'Email is invalid',
        }],
        password: [{ key: 'required', value: 'Password required' }, {
          key: 'min',
          value: 'Password length should be at least 6',
        }],
      },
      // login info
      loginDetail: {
        email: '',
        password: '',
      },
      // forgotPasswordDialog: false,
      isSubmitting: false,
    };
  },
  components: {
    Snackbar, ErrorBlockServer, PermissionDialog,
  },
  mixins: [CommonServices],
  methods: {
    /**
         * Login Submit Method
         */
    onSubmit() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.isSubmitting = true;
          const sendData = JSON.parse(JSON.stringify(this.loginDetail));
          this.$store.dispatch('user/login',
            {
              loginDetail: sendData,
            }).then((response) => {
              if (response.error) {
                // loader disable if any error and display the error
                this.isSubmitting = false;
                this.errorMessage = response.error;
              } else {
                this.errorMessage = '';
                this.isSubmitting = false;
                // Set Data of Current user in store
                this.$store.commit('user/setCurrentUserData', response.data);
                // Set permission data
                // eslint-disable-next-line max-len
                if (response.data && response.data.permissions && response.data.permissions.length > 0) {
                  this.$store.commit('permission/setUserPermissions', response.data.permissions);
                }
                // go to which page after successfully login
                this.$router.push('/city');
              }
            }, (error) => {
              // If Login has Error
              this.isSubmitting = false;
              this.errorMessage = this.getAPIErrorMessage(error.response);
            });
        } else {
          this.errorMessage = '';
        }
      });
    },
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar.snackbar,
      permissionDialog: (state) => state.permission.permissionDialog,
    }),
  },
};
