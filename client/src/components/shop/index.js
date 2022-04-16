import { useState } from "react";
import ProductCard from "./ProductCard";
import { ProductData } from "./ProductData";
import "./shop.css"

function Shop() {
    // let products = [];

    // // get products
    // var axios = require('axios');
    // var config = {
    //     method: 'get',
    //     url: '/api/products',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // };
    // axios(config)
    //     .then(res => {
    //         // object destructuring
    //         const { products: myproducts } = res.data;
    //         products = myproducts;
    //         console.log(products);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    // map through Product JSON and get all brands and categories
    var brands = ProductData.map((value) => value.brand).filter((value, index, _arr) => _arr.indexOf(value) === index);
    var categories = ProductData.map((value) => value.category).filter((value, index, _arr) => _arr.indexOf(value) === index);

    // sort the brands and categories by alphabetical order to be appended to the selectBox
    const brandSorted = brands.sort();
    const categorySorted = categories.sort();

    // filter function to be called whenever selectBox is changed (selection is made)
    const [products, setProducts] = useState(ProductData);
    function filterProducts() {
        // get the selectBox using id
        var selectBox = document.getElementById("filter");
        // get the value of the 'option' selection (option)
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        // get the label of the 'optgroup' corresponding to the 'option' selection
        var optionGroup = selectBox.options[selectBox.selectedIndex].parentNode.label;

        const result = ProductData.filter((currentProduct) => {
            // filter by 'brand'
            if (optionGroup === 'brand') {
                return currentProduct.brand === selectedValue;
            }
            // filter by 'category'
            else if (optionGroup === 'category') {
                return currentProduct.category === selectedValue;
            }
            else {
                // no filter; return all products
                return currentProduct;
            }
        });
        setProducts(result);
    }

    return (
        <>
            <div className="main-container">
                <div className="boxes">
                    <div className="box">
                        <div className="shop-left">
                            <div className="left-filter">
                                <div className="filter-label">Filter by</div>
                                <select name="filter" id="filter" onChange={filterProducts}>
                                    <option value="all">All</option>
                                    <optgroup label="brand">
                                        {/* M: map through sorted 'brand' array and append to selectionBox */}
                                        {brandSorted.map((item) => {
                                            return (
                                                <option key={item} value={item}>{item}</option>
                                            )
                                        })}
                                    </optgroup>
                                    <optgroup label="category">
                                        {/* M: map through sorted 'category' array and append to selectionBox */}
                                        {categorySorted.map((item) => {
                                            return (
                                                <option key={item} value={item}>{item}</option>
                                            )
                                        })}
                                    </optgroup>
                                </select>
                            </div>
                        </div>

                        <div className="shop-right">
                            {/* M: map through 'productData' array and append all products as 'ProductCard' */}
                            {products.map((item) => {
                                return (
                                    <ProductCard key={item.id} {...item} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;