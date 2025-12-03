import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Saúde Positiva API',
      version: '1.0.0',
      description: 'Documentação da API de gestão de clínicas Saúde Positiva.',
      contact: {
        name: 'Equipa de Desenvolvimento',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/modules/**/*.routes.ts', './src/modules/**/*.schema.ts'], 
};

export const swaggerSpec = swaggerJSDoc(options);