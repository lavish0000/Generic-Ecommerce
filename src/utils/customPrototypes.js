// eslint-disable-next-line
String.prototype.toPascalCase = function () {
    return this.match(/[a-z]+/gi)
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
      })
      .join(' ')
  }