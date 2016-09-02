# Selective Archive

Selectively download files from a hyperdrive archive.

## Example

```js
  var archive = drive.createArchive(key, {sparse: true})
  var selectiveArchive = SelectiveArchive(archive)
  // Download txt files
  selectiveArchive.download(['**/*.txt'], function (err) {
    console.log('done downloading')
    process.exit(0)
  })
```

See `example.js` for full usage example.

## Installation 

```
npm install selective-archive
```

## API

### `var selective = SelectiveArchive(archive)`

Archive must a a hyperdrive archive with option `sparse: true`.

### `selective.download(anymatch_array, cb)`

Download a selection of files, cb fires when download is finished. 

`anymatch_array` can be a file list or any [anymatch](https://github.com/es128/anymatch) compatible search strings. The archive metadata is traversed and checked against matches before downloading.

## License

MIT