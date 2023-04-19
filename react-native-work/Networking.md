

Supported by implementing `fetch` and `XMLHttprequest`.

On android `NetworkingModule.java` leverages OkHTTP to do network requests.

Also supports `fetchResponse.blob()` method to return readable stream of blobs when `fetch(url)` has a local uri.
Under the hood implemented using `BlobManager` native modules.

