'use strict';

const request = require('supertest');
const path = require('path');
const utils = require('../utils');

describe('test/loader/context_loader.test.js', () => {

  let app;
  before(() => {
    app = utils.createApp('context-loader');
    app.loader.loadAll();
  });

  it('should load files ', done => {
    const directory = path.join(__dirname, '../fixtures/context-loader/app/depth');
    app.loader.loadToContext(directory, 'depth');

    request(app.callback())
    .get('/depth')
    .expect({
      one: 'context:one',
      two: 'context:two',
      three: 'context:three',
      four: 'context:four',
    })
    .expect(200, done);
  });

  it('should load different types', done => {
    const directory = path.join(__dirname, '../fixtures/context-loader/app/type');
    app.loader.loadToContext(directory, 'type');

    request(app.callback())
    .get('/type')
    .expect({
      class: 'context',
      functionClass: 'context:config',
      generator: 'generator',
      object: 'object.get',
      number: 1,
    })
    .expect(200, done);
  });

});
