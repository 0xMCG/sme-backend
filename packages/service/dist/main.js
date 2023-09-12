"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const cors = require("cors");
const response_1 = require("./common/response");
const filter_1 = require("./common/filter");
const contractEventSubscribe_service_1 = require("./subscriber/contractEventSubscribe.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('SME API DOCs')
        .setDescription('')
        .setVersion('1')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/api-docs', app, document);
    app.useGlobalInterceptors(new response_1.Response());
    app.useGlobalFilters(new filter_1.HttpFilter());
    const subscribe = app.get(contractEventSubscribe_service_1.ContractEventSubscribeService);
    process.on('SIGINT', () => {
        subscribe.onApplicationShutdown('SIGINT');
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map