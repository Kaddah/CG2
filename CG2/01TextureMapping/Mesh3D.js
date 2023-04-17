import GLSLProgram from "./../../lib/helper/glsl-program.js";
import { loadDataFromURL, loadBinaryDataStreamFromURL } from "./../../lib/helper/http.js";
import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"
import { Matrix4 } from "./Matrix4.js";
import { TriangleMeshGL } from "./TriangleMeshGL.js"
import { TextureMap } from "./TextureMap.js"

function Mesh3DApp() {
  const mCanvas = document.querySelector("#canvas");

  /** @type {WebGL2RenderingContext} */
  const gl = mCanvas.getContext("webgl2");

  let mGlslProgram = null;
  let triangleMeshGL = null;
  let textureA = null;
  let textureB = null;

  /***
   * Run once one startup.
   */
  async function setup() {
    // load shader
    const vertexShaderUrl = document.querySelector("#vertexShader").src;
    const fragmentShaderUrl = document.querySelector("#fragmentShader").src;
    mGlslProgram = new GLSLProgram(mCanvas, await loadDataFromURL(vertexShaderUrl), await loadDataFromURL(fragmentShaderUrl));
    gl.enable(gl.DEPTH_TEST);
    // Load file.
    //const streamReader = await loadBinaryDataStreamFromURL("./../../data/bunny.smm");
    //const mesh = await SimpleMeshModelIO.load(streamReader);
    //3
    const streamReader = await loadBinaryDataStreamFromURL("./../../data/plane.smm");
    const mesh = await SimpleMeshModelIO.load(streamReader);

    triangleMeshGL = new TriangleMeshGL(gl, mesh);
    
    textureA = new TextureMap(gl, 0);    
    //Aufgabe 2c
    
    await textureA.loadTexture("../../../data/checkerboard.png");


    // TODO: Aufgabe 4a    
    textureB = new TextureMap(gl, 1);  
    await textureB.loadTexture("./../../data/bunnyUV.png");
    // TODO: Aufgabe 4e      
    requestAnimationFrame(draw);
  }

  /**
   * This function is executed, whenever the browser decides to draw a new image. 
   */
  function draw() {
    resize();
    let translateX = parseFloat(document.getElementById("TranslateX").value);
    let translateY = parseFloat(document.getElementById("TranslateY").value);
    let translateZ = parseFloat(document.getElementById("TranslateZ").value);

    let rotationX = parseFloat(document.getElementById("RotationX").value);
    let rotationY = parseFloat(document.getElementById("RotationY").value);
    let rotationZ = parseFloat(document.getElementById("RotationZ").value);

    let nearPlaneDistance = parseFloat(document.getElementById("NearPlane").value);
    let farPlaneDistance = parseFloat(document.getElementById("FarPlane").value);
    let fieldOfViewRadians = parseFloat(document.getElementById("FieldOfView").value);

    let backgroundColor = document.getElementById("backgroundColor").value;
    let rB = parseInt(backgroundColor.substr(1, 2), 16) / 255.0;
    let gB = parseInt(backgroundColor.substr(3, 2), 16) / 255.0;
    let bB = parseInt(backgroundColor.substr(5, 2), 16) / 255.0;

    let overlayWireFrame = document.getElementById("useWireFrame").checked;
    let wireFrameColor = document.getElementById("WireFrameColor").value;
    let rW = parseInt(wireFrameColor.substr(1, 2), 16) / 255.0;
    let gW = parseInt(wireFrameColor.substr(3, 2), 16) / 255.0;
    let bW = parseInt(wireFrameColor.substr(5, 2), 16) / 255.0;

    let ambientColor = document.getElementById("AmbientColor").value;
    let ambientR = parseInt(ambientColor.substr(1, 2), 16) / 255.0;
    let ambientG = parseInt(ambientColor.substr(3, 2), 16) / 255.0;
    let ambientB = parseInt(ambientColor.substr(5, 2), 16) / 255.0;
    
    let diffuseColor = document.getElementById("DiffuseColor").value;
    let diffuseR = parseInt(diffuseColor.substr(1, 2), 16) / 255.0;
    let diffuseG = parseInt(diffuseColor.substr(3, 2), 16) / 255.0;
    let diffuseB = parseInt(diffuseColor.substr(5, 2), 16) / 255.0;
    
    let specularColor = document.getElementById("SpecularColor").value;
    let specularR = parseInt(specularColor.substr(1, 2), 16) / 255.0;
    let specularG = parseInt(specularColor.substr(3, 2), 16) / 255.0;
    let specularB = parseInt(specularColor.substr(5, 2), 16) / 255.0;

    let specularExponent = parseFloat(document.getElementById("SpecularExponent").value);
    gl.clearColor(rB, gB, bB, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    const mvpLoc = mGlslProgram.getUniformLocation("u_mvp");
    const mvLoc = mGlslProgram.getUniformLocation("u_mv");
    const mvITLoc = mGlslProgram.getUniformLocation("u_mvIT");
    const useUniformColorLoc = mGlslProgram.getUniformLocation("u_useUniformColor");
    const uniformColorLoc = mGlslProgram.getUniformLocation("u_uniformColor");

    const uniformAmbientColorLoc = mGlslProgram.getUniformLocation("u_ambient");
    const uniformDiffuseColorLoc = mGlslProgram.getUniformLocation("u_diffuse");
    const uniformSpecularColorLoc = mGlslProgram.getUniformLocation("u_specular");
    const uniformSpecularExponentLoc = mGlslProgram.getUniformLocation("u_specularExponent");

    mGlslProgram.use();
    let tMatrix = Matrix4.translation(translateX, translateY, translateZ);
    let rxMatrix = Matrix4.rotationX(rotationX);
    let ryMatrix = Matrix4.rotationY(rotationY);
    let rzMatrix = Matrix4.rotationZ(rotationZ);

    let pMatrix = Matrix4.perspective(fieldOfViewRadians, mCanvas.clientWidth / mCanvas.clientHeight, nearPlaneDistance, farPlaneDistance);
    let mv      = Matrix4.multiply(tMatrix, Matrix4.multiply(rxMatrix, Matrix4.multiply(ryMatrix, rzMatrix)));
    let mvI     = Matrix4.inverse(mv);
    let mvIT    = Matrix4.transpose(mvI);
    let mvp     = Matrix4.multiply(pMatrix, mv);

    gl.uniformMatrix4fv(mvpLoc, true, mvp);
    gl.uniformMatrix4fv(mvLoc, true, mv);
    gl.uniformMatrix4fv(mvITLoc, true, mvIT);

    gl.uniform1i(useUniformColorLoc, false);
    gl.uniform3f(uniformAmbientColorLoc,  ambientR, ambientG,ambientB);
    gl.uniform3f(uniformDiffuseColorLoc,  diffuseR, diffuseG, diffuseB);
    gl.uniform3f(uniformSpecularColorLoc, specularR, specularG, specularB);
    gl.uniform1f(uniformSpecularExponentLoc, specularExponent);
    
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(1.0, 1.0);

    // TODO: Aufgabe 3a
    textureA.useBilinearInterpolation = document.getElementById("useBilinearInterpolation").checked;


    // TODO: Aufgabe 3b
    const useMIPMapping = document.getElementById("useMIPMapping").checked;
    textureA.useMIPMapping = useMIPMapping;
    // TODO: Aufgabe 4b
    // TODO: Aufgabe 4c
    // TODO: Aufgabe 4d
    //Aufgabe 2d   
    textureA.bind();     
    triangleMeshGL.draw();       
    //Aufgabe 2d
    textureA.unbind();
    // TODO: Aufgabe 4b
    if (overlayWireFrame) {
      gl.uniform1i(useUniformColorLoc, true);
      gl.uniform3f(uniformColorLoc, rW, gW, bW);
      triangleMeshGL.drawWireFrame();
    }
    requestAnimationFrame(draw);
  }

  /**
   * This method is executed once the drawing window dimensions change.
   */
  function resize() {
    let w = mCanvas.clientWidth;
    let h = mCanvas.clientHeight;

    if (mCanvas.width != w || mCanvas.height != h) {
      mCanvas.width = w;
      mCanvas.height = h;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  }
  setup();
}

async function main() {
  let t = new Mesh3DApp();
}

main();


