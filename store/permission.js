const baseUrl = '/api/v1/';
const allPermission = [
    {
        "id": "1",
        "name": "users",
        "label": "User",
        "guard_name": "root",
        "is_permission": "1",
        "display_name": "Users",
        "sub_permissions": [
            {
                "id": "9",
                "name": "index",
                "label": "View",
                "guard_name": "users",
                "is_permission": "1",
                "display_name": "Index Users"
            },
            {
                "id": "10",
                "name": "show",
                "label": "Show",
                "guard_name": "users",
                "is_permission": "1",
                "display_name": "Show Users"
            },
            {
                "id": "11",
                "name": "store",
                "label": "Add",
                "guard_name": "users",
                "is_permission": "1",
                "display_name": "Store Users"
            },
            {
                "id": "12",
                "name": "update",
                "label": "Update",
                "guard_name": "users",
                "is_permission": "1",
                "display_name": "Update Users"
            },
            {
                "id": "13",
                "name": "destroy",
                "label": "Delete",
                "guard_name": "users",
                "is_permission": "1",
                "display_name": "Destroy Users"
            },
            {
                "id": "14",
                "name": "export",
                "label": "Export",
                "guard_name": "users",
                "is_permission": "1",
                "display_name": "Export Users"
            },
            {
                "id": "15",
                "name": "importBulk",
                "label": "Import",
                "guard_name": "users",
                "is_permission": "1",
                "display_name": "ImportBulk Users"
            },
            {
                "id": "16",
                "name": "deleteAll",
                "label": "Delete All",
                "guard_name": "users",
                "is_permission": "1",
                "display_name": "DeleteAll Users"
            },
            {
                "id": "17",
                "name": "delete_gallery",
                "label": "Delete Gallery",
                "guard_name": "users",
                "is_permission": "1",
                "display_name": "Delete_gallery Users"
            }
        ]
    },
    {
        "id": "2",
        "name": "countries",
        "label": "Country",
        "guard_name": "root",
        "is_permission": "1",
        "display_name": "Countries",
        "sub_permissions": [
            {
                "id": "18",
                "name": "index",
                "label": "View",
                "guard_name": "countries",
                "is_permission": "1",
                "display_name": "Index Countries"
            },
            {
                "id": "19",
                "name": "show",
                "label": "Show",
                "guard_name": "countries",
                "is_permission": "1",
                "display_name": "Show Countries"
            },
            {
                "id": "20",
                "name": "store",
                "label": "Add",
                "guard_name": "countries",
                "is_permission": "1",
                "display_name": "Store Countries"
            },
            {
                "id": "21",
                "name": "update",
                "label": "Update",
                "guard_name": "countries",
                "is_permission": "1",
                "display_name": "Update Countries"
            },
            {
                "id": "22",
                "name": "destroy",
                "label": "Delete",
                "guard_name": "countries",
                "is_permission": "1",
                "display_name": "Destroy Countries"
            },
            {
                "id": "23",
                "name": "export",
                "label": "Export",
                "guard_name": "countries",
                "is_permission": "1",
                "display_name": "Export Countries"
            },
            {
                "id": "24",
                "name": "importBulk",
                "label": "Import",
                "guard_name": "countries",
                "is_permission": "1",
                "display_name": "ImportBulk Countries"
            },
            {
                "id": "25",
                "name": "deleteAll",
                "label": "Delete All",
                "guard_name": "countries",
                "is_permission": "1",
                "display_name": "DeleteAll Countries"
            }
        ]
    },
    {
        "id": "3",
        "name": "states",
        "label": "State",
        "guard_name": "root",
        "is_permission": "1",
        "display_name": "States",
        "sub_permissions": [
            {
                "id": "26",
                "name": "index",
                "label": "View",
                "guard_name": "states",
                "is_permission": "1",
                "display_name": "Index States"
            },
            {
                "id": "27",
                "name": "show",
                "label": "Show",
                "guard_name": "states",
                "is_permission": "1",
                "display_name": "Show States"
            },
            {
                "id": "28",
                "name": "store",
                "label": "Add",
                "guard_name": "states",
                "is_permission": "1",
                "display_name": "Store States"
            },
            {
                "id": "29",
                "name": "update",
                "label": "Update",
                "guard_name": "states",
                "is_permission": "1",
                "display_name": "Update States"
            },
            {
                "id": "30",
                "name": "destroy",
                "label": "Delete",
                "guard_name": "states",
                "is_permission": "1",
                "display_name": "Destroy States"
            },
            {
                "id": "31",
                "name": "export",
                "label": "Export",
                "guard_name": "states",
                "is_permission": "1",
                "display_name": "Export States"
            },
            {
                "id": "32",
                "name": "importBulk",
                "label": "Import",
                "guard_name": "states",
                "is_permission": "1",
                "display_name": "ImportBulk States"
            },
            {
                "id": "33",
                "name": "deleteAll",
                "label": "Delete All",
                "guard_name": "states",
                "is_permission": "1",
                "display_name": "DeleteAll States"
            }
        ]
    },
    {
        "id": "4",
        "name": "cities",
        "label": "City",
        "guard_name": "root",
        "is_permission": "1",
        "display_name": "Cities",
        "sub_permissions": [
            {
                "id": "34",
                "name": "index",
                "label": "View",
                "guard_name": "cities",
                "is_permission": "1",
                "display_name": "Index Cities"
            },
            {
                "id": "35",
                "name": "show",
                "label": "Show",
                "guard_name": "cities",
                "is_permission": "1",
                "display_name": "Show Cities"
            },
            {
                "id": "36",
                "name": "store",
                "label": "Add",
                "guard_name": "cities",
                "is_permission": "1",
                "display_name": "Store Cities"
            },
            {
                "id": "37",
                "name": "update",
                "label": "Update",
                "guard_name": "cities",
                "is_permission": "1",
                "display_name": "Update Cities"
            },
            {
                "id": "38",
                "name": "destroy",
                "label": "Delete",
                "guard_name": "cities",
                "is_permission": "1",
                "display_name": "Destroy Cities"
            },
            {
                "id": "39",
                "name": "export",
                "label": "Export",
                "guard_name": "cities",
                "is_permission": "1",
                "display_name": "Export Cities"
            },
            {
                "id": "40",
                "name": "importBulk",
                "label": "Import",
                "guard_name": "cities",
                "is_permission": "1",
                "display_name": "ImportBulk Cities"
            },
            {
                "id": "41",
                "name": "deleteAll",
                "label": "Delete All",
                "guard_name": "cities",
                "is_permission": "1",
                "display_name": "DeleteAll Cities"
            }
        ]
    },
    {
        "id": "5",
        "name": "hobbies",
        "label": "Hobby",
        "guard_name": "root",
        "is_permission": "1",
        "display_name": "Hobbies",
        "sub_permissions": [
            {
                "id": "42",
                "name": "index",
                "label": "View",
                "guard_name": "hobbies",
                "is_permission": "1",
                "display_name": "Index Hobbies"
            },
            {
                "id": "43",
                "name": "show",
                "label": "Show",
                "guard_name": "hobbies",
                "is_permission": "1",
                "display_name": "Show Hobbies"
            },
            {
                "id": "44",
                "name": "store",
                "label": "Add",
                "guard_name": "hobbies",
                "is_permission": "1",
                "display_name": "Store Hobbies"
            },
            {
                "id": "45",
                "name": "update",
                "label": "Update",
                "guard_name": "hobbies",
                "is_permission": "1",
                "display_name": "Update Hobbies"
            },
            {
                "id": "46",
                "name": "destroy",
                "label": "Delete",
                "guard_name": "hobbies",
                "is_permission": "1",
                "display_name": "Destroy Hobbies"
            },
            {
                "id": "47",
                "name": "export",
                "label": "Export",
                "guard_name": "hobbies",
                "is_permission": "1",
                "display_name": "Export Hobbies"
            },
            {
                "id": "48",
                "name": "importBulk",
                "label": "Import",
                "guard_name": "hobbies",
                "is_permission": "1",
                "display_name": "ImportBulk Hobbies"
            },
            {
                "id": "49",
                "name": "deleteAll",
                "label": "Delete All",
                "guard_name": "hobbies",
                "is_permission": "1",
                "display_name": "DeleteAll Hobbies"
            }
        ]
    },
    {
        "id": "6",
        "name": "roles",
        "label": "Role",
        "guard_name": "root",
        "is_permission": "1",
        "display_name": "Roles",
        "sub_permissions": [
            {
                "id": "50",
                "name": "index",
                "label": "View",
                "guard_name": "roles",
                "is_permission": "1",
                "display_name": "Index Roles"
            },
            {
                "id": "51",
                "name": "show",
                "label": "Show",
                "guard_name": "roles",
                "is_permission": "1",
                "display_name": "Show Roles"
            },
            {
                "id": "52",
                "name": "store",
                "label": "Add",
                "guard_name": "roles",
                "is_permission": "1",
                "display_name": "Store Roles"
            },
            {
                "id": "53",
                "name": "update",
                "label": "Update",
                "guard_name": "roles",
                "is_permission": "1",
                "display_name": "Update Roles"
            },
            {
                "id": "54",
                "name": "destroy",
                "label": "Delete",
                "guard_name": "roles",
                "is_permission": "1",
                "display_name": "Destroy Roles"
            },
            {
                "id": "55",
                "name": "export",
                "label": "Export",
                "guard_name": "roles",
                "is_permission": "1",
                "display_name": "Export Roles"
            },
            {
                "id": "56",
                "name": "deleteAll",
                "label": "Delete All",
                "guard_name": "roles",
                "is_permission": "1",
                "display_name": "DeleteAll Roles"
            }
        ]
    },
    {
        "id": "7",
        "name": "permissions",
        "label": "Permission",
        "guard_name": "root",
        "is_permission": "1",
        "display_name": "Permissions",
        "sub_permissions": [
            {
                "id": "57",
                "name": "index",
                "label": "View",
                "guard_name": "permissions",
                "is_permission": "1",
                "display_name": "Index Permissions"
            },
            {
                "id": "58",
                "name": "show",
                "label": "Show",
                "guard_name": "permissions",
                "is_permission": "1",
                "display_name": "Show Permissions"
            },
            {
                "id": "59",
                "name": "store",
                "label": "Add",
                "guard_name": "permissions",
                "is_permission": "1",
                "display_name": "Store Permissions"
            },
            {
                "id": "60",
                "name": "update",
                "label": "Update",
                "guard_name": "permissions",
                "is_permission": "1",
                "display_name": "Update Permissions"
            },
            {
                "id": "61",
                "name": "destroy",
                "label": "Delete",
                "guard_name": "permissions",
                "is_permission": "1",
                "display_name": "Destroy Permissions"
            },
            {
                "id": "62",
                "name": "export",
                "label": "Export",
                "guard_name": "permissions",
                "is_permission": "1",
                "display_name": "Export Permissions"
            },
            {
                "id": "63",
                "name": "deleteAll",
                "label": "Delete All",
                "guard_name": "permissions",
                "is_permission": "1",
                "display_name": "DeleteAll Permissions"
            }
        ]
    },
    {
        "id": "8",
        "name": "permission-role-mappings",
        "label": "Permission Role Mapping",
        "guard_name": "root",
        "is_permission": "1",
        "display_name": "Permission Role Mappings",
        "sub_permissions": [
            {
                "id": "64",
                "name": "setUnsetPermissionToRole",
                "label": "Set/Unset Permission",
                "guard_name": "permission-role-mappings",
                "is_permission": "1",
                "display_name": "SetUnsetPermissionToRole Permissions"
            },
            {
                "id": "65",
                "name": "getPermissionsByRole",
                "label": "Permissions By Role",
                "guard_name": "permission-role-mappings",
                "is_permission": "1",
                "display_name": "GetPermissionsByRole Roles"
            }
        ]
    }
];
const initialState = () => ({
    permissions: allPermission,
    userPermissions: allPermission,
    permissionDialog: false,
})
export const state = initialState;

export const mutations = {
    setPermissions(state, param) {
        state.permissions = param;
    },
    clearPermissions(state) {
        state.permissions = [];
    },
    setUserPermissions(state, param) {
        state.userPermissions = param;
    },
    setPermissionDialog(state, payload) {
        state.permissionDialog = payload;
    },
    /** Update specific user permission when receive channel event
     * @param state
     * @param payload
     */
    updatePermission(state, payload) {
        let permissionList = JSON.parse(JSON.stringify(state.userPermissions));
        let index = permissionList.findIndex(x => x.id == payload[0].id);
        permissionList[index] = payload[0];
        if (index != -1) {
            state.userPermissions = permissionList;
            state.permissions = permissionList;
        }
    },
}
export const actions = {
    /**
          * Used for set/unset permission
          * @param commit
          * @param param
          */
    // eslint-disable-next-line no-unused-vars
    edit({ commit }, param) {
        return new Promise((resolve, reject) => {
            HTTP.post(`${baseUrl}set_unset_permission_to_role`, param).then((response) => {
                resolve(response);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
     * Used to get role by permission
     * @param commit
     * @param state - used for edit Id
     * @param param
     */
    getById({ commit }, param) {
        return new Promise((resolve, reject) => {
            HTTP.get(`${baseUrl}get_role_by_permissions/${param}`).then((response) => {
                commit('setPermissions', response.data.data);
                resolve(response.data);
            }).catch((e) => {
                reject(e);
            });
        });
    },

}
export const getters = {

}