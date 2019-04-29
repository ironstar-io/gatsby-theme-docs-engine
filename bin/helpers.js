const { promisify } = require('util')
const { exec, spawn } = require('child_process')
const execAsync = promisify(exec)

module.exports = {
  executeCmd: async cmd => {
    const { stdout, stderr } = await execAsync(cmd)

    if (stderr) {
      throw new Error(`error: ${stderr}`)
    }

    console.log(stdout)
  },
  spawnCmd: async ({ cmd, args = [] }) => {
    const proc = spawn(cmd, args, {
      stdio: 'inherit',
      shell: true,
    })

    return await new Promise((resolve, reject) => {
      proc.on('exit', function(code) {
        if (code > 0) {
          return reject(`Exited with code: ${code}`)
        }
        return resolve()
      })

      proc.on('error', function(err) {
        console.error(err)
        proc.kill('SIGINT') // calls runner.abort()
        return reject(err)
      })

      process.on('SIGINT', () => {
        proc.kill('SIGINT') // calls runner.abort()
        proc.kill('SIGTERM') // if that didn't work, we're probably in an infinite loop, so make it die.
      })
    })
  },
}
