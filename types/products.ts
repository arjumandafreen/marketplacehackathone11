


import { Key } from "react"; // Import Key from React

export interface Products {
    id: Key | string | number | null | undefined; // Ensure id is correctly typed
    quantity: number; // Fix incorrect type
    inventory: number;
    colors: any;
    sizes: any;
    category: string;
    _id: string;
    _type: "products";
    name: string;
    price: number;
    description: string;
    image?: {
        _ref: string;
        _type: "image";
    };
    slug: { current: string };
    slugCurrent: any;
    discountPercent: number;
}





// export interface Products {
//     id: Key | null | undefined; // The unique identifier for the product
//     quantity: ReactI18NextChildren | Iterable<ReactI18NextChildren>; // Quantity details for the product, might include translations or multiple iterations
//     inventory: number; // Number of items available in stock
//     colors: any; // Colors available for the product (could be a list or specific values)
//     sizes: any; // Sizes available for the product (could be a list or specific values)
//     category: string; // Category that the product belongs to (e.g., electronics, clothing)
//     _id: string; // Unique ID used internally (perhaps from a database)
//     _type: "products"; // Indicates the type of object is a product
//     name: string; // Name of the product
//     price: number; // Price of the product
//     description: string; // A detailed description of the product
//     image?: { // Optional image reference for the product
//         _ref: string; // Reference to the image file (likely in a content management system)
//         _type: "image"; // Indicates that the type is an image
//     }
//     slug: { current: string }; // Slug for URL or routing purposes (the current one)
//     slugCurrent: any; // Possibly another variant or reference to the slug
//     discountPercent: number; // The discount percentage applied to the product
// }
