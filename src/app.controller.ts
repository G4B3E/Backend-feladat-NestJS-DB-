import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { CicakDto } from './cicak.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listMacskak(@Query('suly') suly = 0) {
    const [rows] = await db.execute(
      'SELECT id, suly, szem_szin FROM macskak WHERE suly > ? ORDER BY suly DESC;',
      [suly],
    );

    return {
      macskak: rows,
    };
  }
  @Get('macskak/new')
  @Render('form')
  newMacskakForm() {
    return {};
  }
  @Post('macskak/new')
  @Redirect()
  async newMacskak(@Body() cicak: CicakDto) {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (suly, szem_szin) VALUES (?, ?)',
      [cicak.suly, cicak.szem_szin],
    );
    return {
      url: '/',
    };
  }
}
