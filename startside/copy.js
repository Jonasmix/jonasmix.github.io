function serviceNum() {
    var copyText = document.getElementById("myInput");
    copyText.select(7346-1040);
    navigator.clipboard.writeText(copyText.value);
  }