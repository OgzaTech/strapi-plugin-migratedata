const fs = require('fs');
const stringFormatter = require('../utils/StringFormatter');
const axios = require('axios');

module.exports = class SavePostDataUseCase {
    async savePostData(choices, baseUrl, jsonPath) {
        let newContentList = [];
        let jsonContent;
        //fs.writeFileSync
        try {
            jsonContent = fs.readFileSync(jsonPath, 'utf-8');
            jsonContent = JSON.parse(jsonContent);
        } catch (err) {
        }
        for (let choice of choices) {
            if(!choice.columns || choice.columns.length  == 0 || !choice.exportTableName){
                continue
            }
            let content = {};
            let mappings = [];
            let count;

            let path = await stringFormatter.makePlural(choice.exportTableName);

            count = await axios.get(baseUrl + path + '/count').catch((err) => {
                return {data:0};
            });

            for(let column of choice.columns){
                if(!column.exportColumnName){
                    continue
                }
                let columnObject = {};
                columnObject.sourceField = column.exportColumnName;
                columnObject.targetField = column.importColumnName;
                columnObject.isRelation = column.type == 'relation' ? true : false;
                mappings.push(columnObject);
            }
            

            content.targetTableName = choice.importTableName;
            content.itemCount = count.data;
            content.transferedDataCount = 0;
            content.transferedRelationCount = 0;
            content.sourceUrl = baseUrl + path;
            content.isCompleted = false;
            content.isDataMigrated = false;
            content.isRelationMigrated = false;
            content.mappings = mappings;

            newContentList.push(content)
        }
        fs.writeFileSync(jsonPath,JSON.stringify(newContentList),'utf-8')
    }

}