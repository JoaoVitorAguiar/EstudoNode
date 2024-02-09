import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.ts'),
    path.join(__dirname, '../routes/helloWordRoutes.ts'),
    path.join(__dirname, '../routes/usersRoutes.ts'),
    path.join(__dirname, '../routes/booksRoutes.ts'),
    path.join(__dirname, '../routes/authenticateRoutes.ts'),
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],

};

const specs = swaggerJsDoc(options);

export function setupSwagger(app: any) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
