const PERMISSION_CONSTANTS = {

    // Start -> second level permissions
    USER: { module: 'users', subModule: '' },
    ROLE: { module: 'roles', subModule: '' },
    COUNTRY: { module: 'countries', subModule: '' },
    STATE: { module: 'states', subModule: '' },
    CITY: { module: 'cities', subModule: '' },
    HOBBY: { module: 'hobbies', subModule: '' },
    PERMISSION: { module: 'permissions', subModule: '' },
    ROLEPERMISSION: { module: 'permission-role-mappings', subModule: '' },
    // End -> second level permissions

    // Start -> Permission Dialog
    PERMISSION_DIALOG_TITLE: 'Permission Error',
    PERMISSION_DIALOG_MSG: "You don't have permission to access this module, please contact your Administrator!",
    PERMISSION_DIALOG_FUNCTIONALITY_MSG: "You don't have permission to access this functionality, please contact your Administrator!",
    // End - Permission Dialog

    CAN_ACCESS: 'can-access',
    CAN_EDIT: 'can-edit',
    CAN_DELETE: 'can-delete',
};
export default PERMISSION_CONSTANTS;
