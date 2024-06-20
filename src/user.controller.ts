import { Post, Controller, Req, Get } from './@nestjs/common'

@Controller('user')
export default class UserController {
  @Get('/info')
  getName(@Req(111) req) {
    return 'hello world'
  }
}

