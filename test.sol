// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Product {
        uint id;
        string name;
        uint price;
        address payable seller;
        bool sold;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;

    event ProductCreated(uint id, string name, uint price, address seller);
    event ProductSold(uint id, address buyer);

    // إنشاء منتج جديد
    function createProduct(string memory _name, uint _price) public {
        require(_price > 0, "Price must be greater than zero");
        productCount++;
        products[productCount] = Product(productCount, _name, _price, payable(msg.sender), false);
        emit ProductCreated(productCount, _name, _price, msg.sender);
    }

    // شراء منتج
    function buyProduct(uint _id) public payable {
        Product storage product = products[_id];
        require(product.id > 0 && product.id <= productCount, "Invalid product");
        require(msg.value == product.price, "Incorrect price");
        require(!product.sold, "Already sold");

        product.seller.transfer(msg.value);
        product.sold = true;

        emit ProductSold(_id, msg.sender);
    }
}
