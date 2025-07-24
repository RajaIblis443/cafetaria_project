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
