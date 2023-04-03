# Cogra.js

A javascript implementation of the [cogra](http://feif-vm-108/cogra/libcogra) library.

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Dependencies

For matrix and vector operations the [glMatrix](https://glmatrix.net/) library is necessary.
Until version 2.8.1 it is available via cdnjs and can be included by
``` html
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js"
      integrity="sha512-zhHQR0/H5SEBL3Wn6yYSaTTZej12z0hVZKOv3TwCUXT1z5qeqGcXJLLrbERYRScEDDpYIJhPC1fk31gqR783iQ=="
      crossorigin="anonymous"
      defer>
    </script>
```

Newer versions need to be downloaded from [GitHub](https://github.com/toji/gl-matrix/releases)

The examples just can be used by using a web server (most browser prevent accessing other files from local files).
There are several ways to start a simple web server:

* With Node.js
  1. Install http-server: `npm install -g http-server`
  1. Start web server:  `http-server -a localhost <path to lib>`
* With Python
  1.  Start web server: `python -m http.server --directory <path to lib>`


### Installing

The lib can be used by importing as module in javascript file of the application.
``` js
import GLSLProgram from "./glsl-program.js";
```

To use it as module the application must be set as module within the script tag.
``` html
<script src="./triangle.js" type="module" defer></script>
```


### Executing program

View the html containing the application within the browser.

## Authors

Contributors names and contact info

* Markus Hülß (markus.huelss@hs-coburg.de)

## License
The project is licensed under MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.