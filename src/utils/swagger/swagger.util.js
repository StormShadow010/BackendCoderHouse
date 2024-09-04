import __dirname from "../../../utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Storm Store API",
      description: "Documentation of Storm Store API",
    },
  },
  apis: [`${__dirname}/src/docs/*.yaml`],
};

export default swaggerOptions;
