import { Post, Controller } from './@nestjs/common'

@Controller('user')
export default class UserController {
  @Post('/info')
  getName() {
    return 'hello world'
  }
}

