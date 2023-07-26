import { Controller, Get, StreamableFile, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'node:fs';
import * as path from 'node:path';
import { DIR } from './constant';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cat')
  @Header('Content-Type', 'image/gif')
  // @Header('Content-Disposition', 'attachment; filename="rainbow-cat.gif"')
  getCat(): StreamableFile {
    const file = createReadStream(path.join(DIR.ASSETS, 'rainbow-cat.gif'));
    return new StreamableFile(file);
  }
}
