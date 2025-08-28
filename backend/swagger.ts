import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Cafetaria API",
    version: "0.0.0.1",
    description: "API documentation for Cafetaria Project (Auth module)",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT", // bisa diubah sesuai format token kamu
      },
    },
    schemas: {
      Product: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Product unique identifier",
          },
          name: {
            type: "string",
            description: "Product name",
          },
          price: {
            type: "number",
            description: "Product price",
          },
          description: {
            type: "string",
            description: "Product description",
          },
          image: {
            type: "string",
            description: "Product image URL",
          },
          mitra_id: {
            type: "string",
            description: "ID of the mitra who created this product",
          },
          is_available: {
            type: "boolean",
            description: "Whether the product is available for sale",
          },
          is_approve: {
            type: "boolean",
            description: "Whether the product is approved by admin",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Product creation timestamp",
          },
          mitra: {
            type: "object",
            description: "Mitra information",
            properties: {
              id: {
                type: "string",
                description: "Mitra ID",
              },
              name: {
                type: "string",
                description: "Mitra name",
              },
              email: {
                type: "string",
                description: "Mitra email",
              },
            },
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/controller/*.ts"], // pastiin path-nya bener
};

export const swaggerSpec = swaggerJSDoc(options);
