import { Module } from './@nestjs/common'
import AppController from './app.controller'
import UserController from './user.controller'
import 'reflect-metadata'

@Module({
  controllers: [AppController, UserController]
})
export default class AppModule {
  
}