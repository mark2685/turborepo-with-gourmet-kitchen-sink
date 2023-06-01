"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const port = process.env.PORT || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(port);
    console.log(`ready started server on 0.0.0.0:${port}, url: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map