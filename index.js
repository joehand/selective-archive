var anymatch = require('anymatch')
var each = require('stream-each')

module.exports = SelectiveArchive

function SelectiveArchive (archive) {
  if (!archive) return new Error('Archive required')
  if (!archive.options.sparse) return new Error('Archive must have sparse option true')
  if (!(this instanceof SelectiveArchive)) return new SelectiveArchive(archive)
  this.archive = archive
}

SelectiveArchive.prototype.download = function (matcher, cb) {
  var self = this
  var pending = []
  var doneTraversing = false

  each(self.archive.list({live: false}), function (entry, next) {
    var match = anymatch(matcher, entry.name)
    if (!match) return next()
    pending.push(entry)
    self.archive.content.prioritize({
      start: entry.content.blockOffset,
      end: entry.content.blockOffset + entry.blocks
    })
    self.archive.download(entry, function (err) {
      pending.splice(pending.indexOf(entry), 1)
      if (!pending.length && doneTraversing) return cb()
    })
    next()
  }, function (err) {
    if (err) return cb(err)
    doneTraversing = true
  })
}
