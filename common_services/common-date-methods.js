// import moment from 'moment/min/moment-with-locales.min';

export default {
  data() {
    return {};
  },
  methods: {
    /* Current Time */
    currentTime() {
      const current = parseInt(this.$moment.utc().valueOf() / 1000, 10);
      return this.$moment.unix(current).format(this.$getConst('TIME_CONST'));
    },

    /* Current Date */
    currentDate() {
      const current = parseInt(this.$moment.utc().valueOf() / 1000, 10);
      return this.$moment.unix(current).format(this.$getConst('DATE_CONST'));
    },

    /* Current Date Time */
    currentDateTime() {
      const current = parseInt(this.$moment.utc().valueOf() / 1000, 10);
      return this.$moment.unix(current).format(this.$getConst('DATE_TIME_CONST'));
    },

    /* Format Date */
    getDateFormat(value) {
      let date = '';
      if (value != '' && value != null) {
        date = this.$moment(String(value)).format(this.$getConst('DATE_CONST'));
      }
      return date;
    },

    /* Format Time */
    getTimeFormat(value) {
      let date = '';
      if (value != '' && value != null) {
        // UTC date time to local date time:
        date = this.$moment.utc(value).toDate();
        date = this.$moment(date).format(this.$getConst('DATE_TIME_CONST'));
      }
      return date;
    },

    /* Format Date Time */
    getDateTimeFormat(value) {
      let date = '';
      if (value != '' && value != null) {
        // UTC date time to local date time:
        date = this.$moment.utc(value).toDate();
        date = this.$moment(date).format(this.$getConst('DATE_TIME_CONST'));
      }
      return date;
    },
  },
  beforeCreate() {
    // reset snackbar
    this.$store.commit('snackbar/clearStore');
  },
  created() { },
  filters: {},
};
