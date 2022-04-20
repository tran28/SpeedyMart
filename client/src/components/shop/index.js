import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./shop.css"

function Shop() {
    const [productsFromAPI, setProductsFromAPI] = useState([]);

    useEffect(() => {
        var axios = require('axios');

        const fetchProducts = async () => {
            const res = await axios.get('/api/products/all');
            setProductsFromAPI(res.data);
            filterProducts();
        }

        fetchProducts();
    }, [filterProducts]);

    // map through Product JSON and get all brands and categories
    var brands = productsFromAPI.map((value) => value.brand).filter((value, index, _arr) => _arr.indexOf(value) === index);
    var categories = productsFromAPI.map((value) => value.category).filter((value, index, _arr) => _arr.indexOf(value) === index);

    // sort the brands and categories by alphabetical order to be appended to the selectBox
    const brandSorted = brands.sort();
    const categorySorted = categories.sort();

    // filter function to be called whenever selectBox is changed (selection is made)
    const [products, setProducts] = useState(productsFromAPI);

    // sort the returned products alphabetically
    products.sort((a, b) => a.name.localeCompare(b.name));

    function filterProducts() {
        // get the selectBox using id
        var selectBox = document.getElementById("filter")
        // get the value of the 'option' selection (option)
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        // get the label of the 'optgroup' corresponding to the 'option' selection
        var optionGroup = selectBox.options[selectBox.selectedIndex].parentNode.label;

        const result = productsFromAPI.filter((currentProduct) => {
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
                                <select className="minimal" name="filter" id="filter" onChange={filterProducts}>
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
                                    < ProductCard key={item._id} {...item} />
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