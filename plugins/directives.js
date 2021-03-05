import Vue from 'vue'
import hasPermission from '../common_services/permission/permission-directives';
Vue.directive('store', hasPermission); // create
Vue.directive('index', hasPermission); // display a listing
Vue.directive('canAccess', hasPermission); //  display a single row
Vue.directive('update', hasPermission); // update
Vue.directive('destroy', hasPermission); // delete
Vue.directive('export', hasPermission); // export
Vue.directive('importBulk', hasPermission); // import
Vue.directive('deleteAll', hasPermission); // delete all functionality