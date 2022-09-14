import { request } from '@strapi/helper-plugin';

const http = {
    getExport: async (url) => {
        return await request("/strapi-plugin-migrate-data/getExportData", {
            method: "POST",
            body: { url: url }
        });
    },
    getImport: async () => {
        return await request("/strapi-plugin-migrate-data/getImportData", {
            method: "GET",
        });
    },
    postData: async (baseUrl, choices) => {
        return await request('/strapi-plugin-migrate-data/postData', {
            method: 'POST',
            body: {
                baseUrl: baseUrl,
                choices: choices
            }
        });
    },
    getConfigContent: async () => {
        return await request('/strapi-plugin-migrate-data/getConfigContent', {
            method: 'GET',
        });
    },
    deleteChoice: async (index) => {
        return await request('/strapi-plugin-migrate-data/deleteChoice', {
            method: 'Post',
            body: {
                index: index,
            }
        });
    },
    dataTransfer: async (data,index,checked) => {
        return await request('/strapi-plugin-migrate-data/dataTransfer', {
            method: 'Post',
            body: {
                data: data,
                index:index,
                clear:checked
            }
        });
    },
    relationTransfer: async (data,index) => {
        return await request('/strapi-plugin-migrate-data/relationTransfer', {
            method: 'Post',
            body: {
                data: data,
                index:index
            }
        });
    }

}

export default http