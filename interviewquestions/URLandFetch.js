
var BASE_URL = "https://jsonplaceholder.typicode.com/posts/1";

var url = new URL(BASE_URL);

fetch(url).then(resp => {
    console.log(resp);
})