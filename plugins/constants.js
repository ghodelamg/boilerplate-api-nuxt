import PERMISSION_CONSTANTS from '../common_services/permission/permission-constants';

const YOUR_CONSTS = {
    DATE_CONST: 'DD/MM/YYYY',
    TIME_CONST: 'hh:mm A',
    DATE_TIME_CONST: 'DD/MM/YYYY hh:mm A',
    CREATE_ACTION: 'Added successfully',
    UPDATE_ACTION: 'Edited successfully',
    DELETE_ACTION: 'Deleted successfully',

    DELETE_WARNING: 'Are you sure you want to delete?',
    MULTIPLE_DELETE_WARNING_START: 'Are you sure you want to delete',
    MULTIPLE_DELETE_WARNING_END: ' items?',
    REGISTER_SUCCESS: 'Successfully registered. Please check your email for verification',
    BTN_CANCEL: 'Cancel',
    BTN_SUBMIT: 'Submit',
    BTN_CONTINUE: 'Continue',
    BTN_UPDATE: 'Update',
    BTN_OK: 'Ok',
    BTN_DELETE: 'Delete',
    BTN_CLOSE: 'Close',
    DELETE_TITLE: 'Delete Confirmation',
    FILE_UPLOADED: 'File uploaded successfully',
    DOWNLOAD_SAMPLE_CSV: 'Sample CSV downloaded successfully',
    DOWNLOAD_CSV: 'Downloaded successfully',
    ROLE_TITLE: 'Add Role',
    ROLE_DESC: 'Please Enter Your Role',
    WARNING: 'Are you sure you want to delete this record?',
    EMAIL_SEND_MESSAGE: 'Email sent successfully',
    RESET_PASSWORD: 'Password reset successfully',
    CHANGED_PASSWORD: 'Password changed successfully',
    NOIMAGE: 'No Image Found',
    TXT_UPDATE: 'Update',
    TXT_ADD: 'Add',
    TXT_CREATE: 'Create',
    FILE_UPLOAD_MSG: 'Drag and drop your file',
    SELECT_FILE_LABEL: 'Click here to upload file',
    VIEW_GALLERY_TOOLTIP: 'View Gallery',
    MANAGE_GALLERY_TOOLTIP: 'Manage Gallery',
    VIEW_DETAILS_TOOLTIP: 'View Details',
    DOWNLOAD_TOOLTIP: 'Download',
    EDIT_TOOLTIP: 'Edit',
    DELETE_TOOLTIP: 'Delete',
    FILTER_TOOLTIP: 'Filter',
    LOGGOFF_TEXT: 'You have been logged off. Please enter your password to login.',
    SUPER_ADMIN_DELETE_WARNING: 'Super admin can not be deleted.',
    ADMIN_DELETE_WARNING: 'Admin role can not be deleted.',

    //  Broadcasting channel events constant::Begin
    PUBLIC_CHANNELS: [
        { name: 'manage-country', event: 'ManageCountry', storeName: 'countryStore', mutationSuffix: 'Country', responseName: 'country' },
        { name: 'manage-state', event: 'ManageState', storeName: 'stateStore', mutationSuffix: 'State', responseName: 'state' },
        { name: 'manage-city', event: 'ManageCity', storeName: 'cityStore', mutationSuffix: 'City', responseName: 'city' },
        { name: 'manage-hobby', event: 'ManageHobby', storeName: 'hobbyStore', mutationSuffix: 'Hobby', responseName: 'hobby' },
    ],//  Broadcasting channel events constant::Begin
    PRIVATE_CHANNELS: [
        { name: 'manage-role', event: 'ManageRole', storeName: 'roleStore', mutationSuffix: 'Role', responseName: 'role' },
        { name: 'manage-permission', event: 'ManagePermission', storeName: 'permissionStore', mutationSuffix: 'Permission', responseName: 'permission' },
    ],
    ADD_OPERATION: 1,
    EDIT_OPERATION: 2,
    REMOVE_OPERATION: 3,
    REMOVE_MULTIPLE_OPERATION: 4,
    //  Broadcasting channel events constant::End

    ...PERMISSION_CONSTANTS,

};

export default ({ app }, inject) => {
    // Inject $getConst(key) in Vue, context and store.
    inject('getConst', key => YOUR_CONSTS[key]);
}  