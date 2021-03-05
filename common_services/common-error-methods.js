export default {
  data() {
    return {};
  },
  methods: {
    /**
         * Used error rule check
         * @param field - name of the field
         */
    getErrorRule(field) {
      const error = this.errors.items.find((item) => {
        if (item.scope) {
          return `${item.scope}.${item.field}` == field;
        }
        return item.field == field;
      });
      if (error) {
        return error.rule;
      }
      return '';
    },
    /**
         * Used for displaying error message
         * @param field - name of the field
         * @param indexVal - if in v-for send index
         * @returns Message
         */
    getErrorValue(field, indexVal) {
      let rule = '';
      if (indexVal != null && indexVal != 'undefined') {
        rule = this.getErrorRule(`${field}_${indexVal}`);
      } else {
        rule = this.getErrorRule(field);
      }
      if (rule) {
        const arr = field.split('.'); // with scopes
        if (arr.length == 1) {
          // eslint-disable-next-line prefer-destructuring
          field = arr[0];
        } else {
          // eslint-disable-next-line prefer-destructuring
          field = arr[1];
        }
        const index = this.validationMessages[field].findIndex((p) => p.key == rule);
        return this.validationMessages[field][index].value;
      }
      return '';
    },
    /**
         * Used for changing
         * :error property where only color needs to change and no message needs to be shown
         * e.g; checkbox
         * @param field - name of the field
         * @param indexVal - if in v-for send index
         * @returns {boolean}
         */
    getErrorCount(field, indexVal) {
      let rule = '';
      if (indexVal != null && indexVal != 'undefined') {
        rule = this.getErrorRule(`${field}_${indexVal}`);
      } else {
        rule = this.getErrorRule(field);
      }
      if (rule) {
        return true;
      }
      return false;
    },
    /**
         * Used for get API error messsage
         * @param response - response of error
         * @returns error
         */
    getAPIErrorMessage(response) {
      let error = 'Something went wrong. Please try again later.';
      if (!response) return error;
      if (response.status == 422) {
        error = response.data && response.data.errors ? response.data.errors : error;
        let errorString = '';
        // eslint-disable-next-line no-restricted-syntax,guard-for-in
        for (const key in error) {
          errorString += `${error[key]}<br>`;
        }
        error = errorString;
        if (response.data.error) {
          if (response.data.error.errors) {
            error = this.getErrosFromResponse(response.data.error.errors);
          } else {
            error = response.data.error;
          }
        }
      } else if (response.status == 403) {
        error = response.data;
      } else if (response.status == 401) {
        this.logout();
      }
      return error;
    },
    /**
         * Used for get error code
         * @param response - response of error
         * @returns error
         */
    getErrorCode(response) {
      let error = 'Something went wrong. Please try again later.';
      if (response.status == 422) {
        error = response.data && response.data.errors ? response.data.errors : error;
        let errorString = '';
        // eslint-disable-next-line no-restricted-syntax,guard-for-in
        for (const key in error) {
          errorString += `${error[key]}<br>`;
        }
        error = errorString;
        if (response.data.error) {
          error = response.data.error;
        }
      } else if (response.status == 403) {
        error = response.data;
      } else if (response.status == 401) {
        this.logout();
      }
      return error;
    },
    /**
         * Used for get errors from response
         * @param response - response of error
         * @returns error
         */
    getErrosFromResponse(response) {
      let err = '';
      Object.keys(response).forEach((key) => {
        response[key].forEach((item) => {
          err = `${err + item}<br/>`;
        });
      });
      return err;
    },
    /**
         * Used for get modal API error message
         * @param response - response of error
         * @returns error
         */
    getModalAPIerrorMessage(response) {
      const err = [];
      const self = this;
      Object.keys(response).forEach((key) => {
        const val = response[key];
        if (!Object.prototype.hasOwnProperty.call(val, 'data')) {
          err.push({ name: key, message: self.getErrorCode(response[key]) });
        }
      });
      return err;
    },
  },
};
