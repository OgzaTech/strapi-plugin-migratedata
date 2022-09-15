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
    path: '/getExportSchema',
    handler: 'Controller.getExportSchema',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/getImportSchema',
    handler: 'Controller.getImportSchema',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/addConfigCollection',
    handler: 'Controller.addConfigCollection',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/getConfigCollection',
    handler: 'Controller.getConfigCollection',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/deleteSelectedCollections',
    handler: 'Controller.deleteSelectedCollections',
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
