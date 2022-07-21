import { Module }                      from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppConfigService }            from "./app.config.service";
import { DbConfig }                    from "../db/db.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    AppConfigService,
    ConfigService,
    DbConfig
  ],
  exports: [
    AppConfigService,
    DbConfig
  ],
})

export class AppConfigModule {}
