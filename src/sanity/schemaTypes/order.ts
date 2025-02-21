


export default {
    name: "order",
    title: "Order",
    type: "document",
    fields: [
      {
        name: "firstName",
        title: "First Name",
        type: "string",
      },

      {
        name: "lastName",
        title: "Last Name",
        type: "string",
      },
      {
        name: "email",
        title: "Email",
        type: "string",
      },
      {
        name: "discount",
        title: "Discount",
        type: "number",
      },

      {
        name: "address",
        title: "Address",
        type: "string",
      },
      {
        name: "city",
        title: "City",
        type: "string",
      },
      {
        name: "zipCode",
        title: "Zip Code",
        type: "string",
      },
      {
        name: "country",
        title: "Country",
        type: "string",
      },
      {
        name: "phone",
        title: "Phone",
        type: "string",
      },
      {
        name: "cartItems",
        title: "Cart Items",
        type: "array",
        of: [{ type: "reference", to: [{ type: "products" }] }],
      },
      {
        name: "total",
        title: "Total",
        type: "number",
      },
      {
        name: "status",
        title: "Status",
        type: "string",
        options: {
          list: [
            { title: "Pending", value: "pending" },
            { title: "Processing", value: "processing" },
            { title: "Completed", value: "completed" },
          ],layout: "radio",
        },
        initialValue: "pending",
      },
    ],
  };
  