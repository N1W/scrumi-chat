

module.exports = {
   getUsersRequest: function (fc) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          fc(JSON.parse(xhr.responseText));
        }
      }
      xhr.open('GET', '/ajax/users', true);
      xhr.send();
  }
};