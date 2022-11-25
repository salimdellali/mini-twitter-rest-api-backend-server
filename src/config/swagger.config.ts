import SwaggerJsDoc, { OAS3Options } from 'swagger-jsdoc';

class SwaggerConfiguration {
  private static instance: SwaggerConfiguration;

  private options: OAS3Options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      servers: [{ url: '/api/v1/' }],
      info: {
        title: 'Mini twitter REST API documentation',
        version: '1.0.0',
        description:
          'Speer Technologies assignment: Mini twitter RESTful API backend server, by Salim Dellali',
        contact: {
          email: 'dellali.salim@gmail.com',
        },
        license: {
          name: 'MIT License',
          url: 'https://mit-license.org',
        },
      },
    },
    apis: [`${process.cwd()}/src/docs/v1/swagger/**/*.yaml`],
  };

  private constructor() {}

  static get() {
    if (!SwaggerConfiguration.instance) {
      SwaggerConfiguration.instance = new SwaggerConfiguration();
    }

    return SwaggerConfiguration.instance;
  }

  init() {
    return SwaggerJsDoc(this.options);
  }
}

const swaggerConfiguration = SwaggerConfiguration.get().init();

export { swaggerConfiguration as Swagger };
