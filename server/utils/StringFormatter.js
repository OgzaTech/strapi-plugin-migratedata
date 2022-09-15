const makePlural = (data) => {
    if (data) {
        path = data.toLowerCase();
        if (path.endsWith('y')) {
            path = path.slice(0, -1) + 'ies';
        } else {
            path = path + 's';
        }
        return path
    }
}
const makeStrapiModel = async (model) => {
    let modelArray = [];
    model = await model.match(/[A-Z][a-z]+/g);
    model.map((data) => {
        modelArray.push(data.toLowerCase());
    })
    model = modelArray.join('-');
    let strapiModel;
    if (model === 'role') {
        strapiModel = 'plugin::users-permissions.role';
    }else if(model === 'user'){
        strapiModel = 'plugin::users-permissions.user';
    }else{
        strapiModel = 'api::' + model + '.' + model;
    }
    return strapiModel;
}

module.exports = {
    makePlural,
    makeStrapiModel
}