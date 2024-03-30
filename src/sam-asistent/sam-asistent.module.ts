import { Module } from '@nestjs/common';
import { SamAsistentService } from './sam-asistent.service';
import { SamAsistentController } from './sam-asistent.controller';

@Module({
  controllers: [SamAsistentController],
  providers: [SamAsistentService],
})
export class SamAsistentModule {}
