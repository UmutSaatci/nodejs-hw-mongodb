import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';
import path from 'node:path';

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve('docs/swagger.json'), 'utf8'),
);

export const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
