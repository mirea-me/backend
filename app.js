/* Config */
try {
  global.config = require('./config.json')
} catch(ex) {
  console.log('Failed to load config file')
  process.exit(1)
}

/* Dependencies */
const cluster = require('cluster')
const logger = require('./classes/logger.js')

const a = new logger('app')

if(cluster.isMaster) {
	const os = require('os')

	/* CPU core count */
  const cores = os.cpus()

  /* Workers storage */
  let workers = {}

  /* Forking a worker for each CPU core */
  const amount = cores.length - 4 > 0 ? cores.length - 4 : 1
  for(let i = 0; i < amount; i++) {
    const worker = cluster.fork({ name: 'workers/express' })
    workers[worker.id] = worker
    workers[worker.id].name = 'workers/express'
  }

  let services = {}

  /* Initialize socket service
  services.socketWorker = cluster.fork({ name: 'services/socket' })
  workers[services.socketWorker.id] = services.socketWorker
  workers[services.socketWorker.id].name = 'services/socket'
	*/

  /* Respawn dead worker */
  cluster.on('exit', (worker, code, signal) => {
    const saveWorker = cluster.fork({ name: workers[worker.id].name })

    if(services[`${workers[worker.id].name.replace('workers/','')}Worker`]) {
      services[`${workers[worker.id].name.replace('workers/','')}Worker`] = saveWorker
    }

    workers[saveWorker.id] = saveWorker
    workers[saveWorker.id].name = workers[worker.id].name
    delete workers[worker.id]
  })
} else {
	require(`./${process.env.name}.js`)
}