/* M: Later on, get this info from the database.
    id: id of entry in datatable
    image: image of product category
    price_from: lowest price in the product category
    link: link to the category page (make sure this link route exists in App.js)
    description: text description of the image
*/

export const ContentData = [
    {
        id: 1,
        image: require("../../images/food.png"),
        title: "Snacks",
        price_from: "$9.00",
        link: "/",
        description: "snack category",
    },
    {
        id: 2,
        image: require("../../images/drink.png"),
        title: "Drinks",
        price_from: "$5.00",
        link: "/",
        description: "drink category",
    }
]