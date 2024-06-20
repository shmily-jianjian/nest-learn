import { Get, Controller } from './@nestjs/common'

@Controller()
export default class AppController {
  @Get('/a')
  getName() {
    return 'hello world'
  }
}

