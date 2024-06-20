import cls from 'cli-color'

class Logger {

  static lastLogTime = Date.now()

  static log(message: string, context: string = '') {
    const timestamp = new Date().toLocaleString()
    const pid = process.pid
    const currentTime = Date.now()
    const timeDiff = currentTime - this.lastLogTime
    console.log(`${cls.green('[Nest]')} ${cls.green(pid.toString())}  - ${timestamp}     LOG [${context}] ${message} ${cls.white('+')} ${cls.green(timeDiff)}ms`);
    this.lastLogTime = currentTime
  }
}

export {
  Logger
}