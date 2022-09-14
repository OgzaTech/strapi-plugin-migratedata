module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'Controller.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/getExportData',
    handler: 'Controller.getExportData',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/getImportData',
    handler: 'Controller.getImportData',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/postData',
    handler: 'Controller.postData',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/getConfigContent',
    handler: 'Controller.getConfigContent',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/deleteChoice',
    handler: 'Controller.deleteChoice',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/dataTransfer',
    handler: 'Controller.dataTransfer',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/relationTransfer',
    handler: 'Controller.relationTransfer',
    config: {
      policies: [],
      auth: false,
    },
  },
];
