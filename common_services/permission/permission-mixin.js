import { mapState } from 'vuex';
import { isPermission } from './permission-filters';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userPermissions: (state) => state.permissionStore.userPermissions,
    }),
  },
  methods: {
    hasPermission(permissionType, moduleType = '') {
      return isPermission(this.userPermissions, moduleType == '' ? this.getPermissionConst : moduleType, permissionType);
    },
  },
};
