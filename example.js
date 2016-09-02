var memdb = require('memdb')
var hyperdrive = require('hyperdrive')
var swarm = require('hyperdrive-archive-swarm')
var raf = require('random-access-file')
var SelectiveArchive = require('.')

var drive = hyperdrive(memdb())
var archive = drive.createArchive(process.argv[2], {
  sparse: true,
  file: function (name) {
    return raf('download/' + name)
  }
})
var sw = swarm(archive)
sw.once('connection', function () {
  console.log('connection')
  var selectiveArchive = SelectiveArchive(archive)
  // Download the txt files
  selectiveArchive.download(['**/*.txt'], function (err) {
    console.log('done downloading')
    process.exit(0)
  })
})
