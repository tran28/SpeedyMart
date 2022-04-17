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
        heading: "Welcome",
        subheading: "nothing but convenience",
        cta: "shop all",
        link: "/shop",
        description: "shop all",
    },
    {
        id: 2,
        image: require("../../images/drink.png"),
        heading: "Featured",
        subheading: "something new is brewing",
        cta: "shop featured",
        link: "/",
        description: "featured collection",
    }
]