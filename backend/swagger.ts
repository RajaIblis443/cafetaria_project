import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cafetaria API",
      version: "1.0.0",
      description: "API for Cafetaria project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://your-vercel-url.vercel.app",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            price: { type: "number" },
            description: { type: "string" },
            image: { type: "string" },
            is_available: { type: "boolean" },
            is_approve: { type: "boolean" },
            mitra_id: { type: "string" },
            created_at: { type: "string", format: "date-time" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            name: { type: "string" },
            role: { type: "string", enum: ["admin", "mitra"] },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controller/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
