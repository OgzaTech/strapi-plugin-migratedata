'use strict';
const axios = require('axios');
const JoinTableUseCase = require('../usecases/JoinTableUseCase');
const SavePostDataUseCase = require('../usecases/SavePostDataUseCase');
const importData = require('../../../../extensions/documentation/documentation/1.0.0/full_documentation.json');
const jwtDecode = require('jwt-decode');
const stringFormatter = require('../utils/StringFormatter')
const path = require('path');
const fs = require('fs');

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-plugin-migrate-data')
      .service('myService')
      .getWelcomeMessage();
  },
  async getExportData(ctx) {
    let resp = await axios.get(ctx.request.body.url).catch((err) => {
      return err
    });
    const joinTableUseCase = new JoinTableUseCase()
    const data = joinTableUseCase.getExportSchema(resp);
    return data
  },
  async getImportData(ctx) {
    let data = importData.components.schemas;
    const joinTableUseCase = new JoinTableUseCase()
    return joinTableUseCase.getImportSchema(data);
  },
  async postData(ctx) {
    let { baseUrl, choices } = ctx.request.body;
    baseUrl = baseUrl.slice(0, baseUrl.indexOf('documentation'))
    const jsonPath = path.join(path.normalize(__dirname + '/../..'), 'ConfigContent.json');

    const savePostDataUseCase = new SavePostDataUseCase()
    let data = await savePostDataUseCase.savePostData(choices, baseUrl, jsonPath);

    return { "isSuccess": true }
  },
  async getConfigContent(ctx) {
    const jsonPath = path.join(path.normalize(__dirname + '/../..'), 'ConfigContent.json');
    let jsonContent = fs.readFileSync(jsonPath, 'utf-8');
    jsonContent = JSON.parse(jsonContent);
    return jsonContent;
  },
  async deleteChoice(ctx) {
    const { index } = ctx.request.body;
    const jsonPath = path.join(path.normalize(__dirname + '/../..'), 'ConfigContent.json');
    let jsonContent = fs.readFileSync(jsonPath, 'utf-8');
    let newJsonContent = [];
    jsonContent = JSON.parse(jsonContent);
    jsonContent.map((dt, i) => {
      if (i == index) { }
      else { newJsonContent.push(dt) }
    })
    fs.writeFileSync(jsonPath, JSON.stringify(newJsonContent), 'utf-8')
    return true;
  },
  async dataTransfer(ctx) {
    const jsonPath = path.join(path.normalize(__dirname + '/../..'), 'ConfigContent.json');
    let jsonContent = fs.readFileSync(jsonPath, 'utf-8');
    jsonContent = JSON.parse(jsonContent);

    const { id } = jwtDecode(ctx.header.authorization);
    const { data, index, clear } = ctx.request.body;

    let model = await stringFormatter.makeStrapiModel(data.targetTableName);

    if (clear) {
      await strapi.db.query(model).deleteMany({
        where: {}
      }).catch((err) => {
        return err
      })
    }

    for (let start = data.transferedDataCount; ; start += 200) {
      let exportData = await axios.get(data.sourceUrl + '?_start=' + start + '&_limit=200').catch((err) => {
        return err
      });



      if (exportData.data.length == 0) {
        break
      }
      let createDataList = [];
      exportData.data.map((dt) => {
        let query = {
          createdAt: dt["createdDate"],
          updatedAt: dt["updatedDate"],
          updatedBy: id,
          createdBy: id
        };
        data.mappings.map((column) => {
          if (column.isRelation) {
            //do nothing
          } else {
            query[column.targetField] = dt[column.sourceField]
          }
        })
        createDataList.push(query);

      })
      let insertCount = await strapi.db.query(model).createMany({
        data: createDataList
      }).catch((err) => {
        return err
      });
      if(insertCount.count == null){
        data.transferedDataCount += 0;
      }else{
        data.transferedDataCount += insertCount.count;
      }


      jsonContent[index] = data;
      fs.writeFileSync(jsonPath, JSON.stringify(jsonContent), 'utf-8');

    }
    jsonContent[index].isDataMigrated = true;
    fs.writeFileSync(jsonPath, JSON.stringify(jsonContent), 'utf-8');


    return true;
  },
  async relationTransfer(ctx) {
    const jsonPath = path.join(path.normalize(__dirname + '/../..'), 'ConfigContent.json');
    let jsonContent = fs.readFileSync(jsonPath, 'utf-8');
    jsonContent = JSON.parse(jsonContent);

    const { data, index } = ctx.request.body;

    let model = await stringFormatter.makeStrapiModel(data.targetTableName);

    for (let start = data.transferedRelationCount; ; start += 10) {
      let exportData = await axios.get(data.sourceUrl + '?_start=' + start + '&_limit=10').catch((err) => {
        return err
      });



      if (exportData.data.length == 0) {
        break
      }
      exportData.data.map(async (dt) => {
        let query = {
          updatedAt: dt["updatedDate"],
        };
        data.mappings.map((column) => {
          if (column.isRelation) {
            if (Array.isArray(dt[column.sourceField])) {
              let arr = [];
              dt[column.sourceField].map((d) => { arr.push(d.id) });
              query[column.targetField] = arr;
            } else {
              if (dt[column.sourceField]) {
                query[column.targetField] = dt[column.sourceField].id;
              }
            }
          }
        })

        let asd = await strapi.db.query(model).update({
          where: {
            id: dt.id,
          }, data: query
        }).catch((err) => {
          return err
        });

        data.transferedRelationCount += 1;

        jsonContent[index] = data;
        fs.writeFileSync(jsonPath, JSON.stringify(jsonContent), 'utf-8');

      })


    }
    jsonContent[index].isRelationMigrated = true;
    jsonContent[index].isCompleted = true;
    fs.writeFileSync(jsonPath, JSON.stringify(jsonContent), 'utf-8');
    return true
  },
});
