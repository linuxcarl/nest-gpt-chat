import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { SamAsistentModule } from './sam-asistent/sam-asistent.module';

@Module({
  imports: [ConfigModule.forRoot(), GptModule, SamAsistentModule],
})
export class AppModule {}
