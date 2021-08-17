"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.deleteById = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const fs = require('fs');
let organizationsModel;
try {
    organizationsModel = require('../../databases/testdb.json');
}
catch (err) {
    console.log(err);
}
function getAll() {
    return new Promise((resolve, reject) => {
        resolve(organizationsModel);
    });
}
exports.getAll = getAll;
function getById(id) {
    let organization;
    return new Promise((resolve, reject) => {
        if (organizationsModel) {
            organization = organizationsModel.find((organization) => organization['id'] === id);
            organization;
            resolve(organization);
        }
        else {
            resolve(organization);
        }
    });
}
exports.getById = getById;
function create(organization) {
    return new Promise((resolve, reject) => {
        const date = new Date();
        let newOrgan;
        if (!organizationsModel || organizationsModel.length < 1) {
            const id = 1;
            newOrgan = { id: id, createdAt: date, ...organization };
            organizationsModel = [newOrgan];
        }
        else {
            const lastIndex = organizationsModel.length - 1;
            const id = organizationsModel[lastIndex].id + 1;
            newOrgan = { id: id, createdAt: date, ...organization };
            organizationsModel.push(newOrgan);
        }
        const writeStream = fs.createWriteStream('./databases/testdb.json');
        writeStream.write(JSON.stringify(organizationsModel, null, 4));
        writeStream.end();
        resolve(newOrgan);
    });
}
exports.create = create;
function update(id, newOrganDetails) {
    return new Promise((resolve, reject) => {
        const date = new Date();
        let newOrgan;
        const index = organizationsModel.findIndex((organization) => organization['id'] === id);
        const createdDate = organizationsModel[index].createdAt;
        organizationsModel[index] = { id: id, createdAt: createdDate, updatedAt: date, ...newOrganDetails };
        const writeStream = fs.createWriteStream('./databases/testdb.json');
        writeStream.write(JSON.stringify(organizationsModel, null, 4));
        writeStream.end();
        resolve(organizationsModel[index]);
    });
}
exports.update = update;
function deleteById(id) {
    return new Promise((resolve, reject) => {
        organizationsModel = organizationsModel.filter((o) => o['id'] !== id);
        const writeStream = fs.createWriteStream('./databases/testdb.json');
        writeStream.write(JSON.stringify(organizationsModel, null, 4));
        writeStream.end();
        resolve(null);
    });
}
exports.deleteById = deleteById;
function deleteAll() {
    return new Promise((resolve, reject) => {
        organizationsModel = [];
        const writeStream = fs.createWriteStream('./databases/testdb.json');
        writeStream.write(JSON.stringify(organizationsModel, null, 4));
        writeStream.end();
        resolve(null);
    });
}
exports.deleteAll = deleteAll;
//# sourceMappingURL=organization.js.map