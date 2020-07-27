const SequelizeMock = require('sequelize-mock');

const DBConnectionMock = new SequelizeMock();

const ProductMock = DBConnectionMock.define('product', {
        category: 'Brincos',
        name:  'Mano Test',
        size:  'G',
        color: 'Preto',
        description: 'Produto Teste',
        quantity: 1,
        price: 2,
        weight: 123,
        available: true,
        tags: '#teste'
});

module.exports = ProductMock
    