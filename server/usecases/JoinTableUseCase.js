module.exports = class JoinTableUseCase {
    async getExportSchema(resp) {
        let start = resp.data.indexOf("spec: ");
        let end = resp.data.indexOf("dom_id: '#swagger-ui',");
        let data = resp.data.slice(start + 6, end - 12);
        let jsonData = JSON.parse(data);
        let schemas = jsonData.components.schemas
        let tables = {};

        Object.keys(schemas).map((data) => {
            if (data.startsWith("New") || data == "App-update" || data == "Error") {
                //do nothing
            } else {
                let name;
                if (data == "UsersPermissionsRole" || data == "UsersPermissionsUser") {
                    name = data.replace("UsersPermissions", "");
                } else {
                    name = data;
                }
                tables[name] = {};
                Object.keys(schemas[data].properties).map((key) => {
                    //eğer çoklu bir ilişki değilse type undefind olucağından bunun kontrolü
                    if (schemas[data].properties[key].type) {
                        if (schemas[data].properties[key].type === 'array') {
                            tables[name][key] = { type: "relation" }
                        } else {
                            tables[name][key] = { type: schemas[data].properties[key].type }
                        }
                    } else {
                        tables[name][key] = { type: "relation" }
                    }

                })
            }
        })
        return tables;
    }
    async getImportSchema(schemas) {
        let tables = {};

        Object.keys(schemas).map((data) => {
            if (data === "UsersPermissionsPermissionRequest" || data === "Users-Permissions-RoleRequest" || data === "UploadFolderRequest" || data === "UploadFileRequest") {
                //do nothing
            }
            else if (data.endsWith('Request')) {
                let tableName;
                if (data === "UsersPermissionsRoleRequest" || data === "UsersPermissionsUserRequest") {
                    tableName = data.replace("UsersPermissions", "");
                    tableName = tableName.replace("Request", "");
                } else {
                    tableName = data.replace("Request", "");
                }
                tables[tableName] = {};
                let properties = schemas[data].properties.data.properties;
                tables[tableName]['id'] = { type: "string" }

                Object.keys(properties).map((key) => {
                    //eğer çoklu bir ilişki değilse type undefind olucağından bunun kontrolü
                    if (properties[key].type) {
                        if (properties[key].type === 'array') {
                            tables[tableName][key] = { type: "relation" }
                        } else {
                            tables[tableName][key] = { type: properties[key].type }
                        }
                    } else {
                        tables[tableName][key] = { type: "relation" }
                    }
                })
            }
        })
        return tables
    }

}