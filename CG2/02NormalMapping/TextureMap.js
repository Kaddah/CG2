// @ts-check

export class TextureMap {
    constructor(gl, unitParameter) {

        /** @type {WebGL2RenderingContext} */
        this.gl = gl;

        this.unit = unitParameter;
        this.useBilinearInterpolation = false;
        this.useMIPMapping = false;
        this.width = 1;
        this.height = 1;

        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    async loadTexture(filename) {
        return new Promise((resolve) => {
            this.image = new Image();
            this.image.onload = async () => {
                this.loadTextureData();
                resolve(true);
            };
            this.image.src = filename;
        });
    }

    loadTextureData() {
        this.width = this.image.width;
        this.height = this.image.height;
        //Aufgabe 2b
        this.unbind();
        this.bind();
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image);
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
    }

    bind() {
        //Aufgabe 4b        
        this.gl.activeTexture(this.gl.TEXTURE0 + this.unit);
        //Aufgabe 2a
        const my = this
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        //Aufgabe 3a
         this.gl.texParameteri(
         this.gl.TEXTURE_2D,
         this.gl.TEXTURE_MAG_FILTER,
         my.useBilinearInterpolation ? this.gl.LINEAR : this.gl.NEAREST
        );
        //Aufgabe 3b
        this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_MIN_FILTER,
            this.useMIPMapping
        ? (this.useBilinearInterpolation ? this.gl.LINEAR_MIPMAP_LINEAR : this.gl.NEAREST_MIPMAP_NEAREST) 
        : (this.useBilinearInterpolation ? this.gl.LINEAR : this.gl.NEAREST)
        );
    }

    unbind() {
        //Aufgabe 4b   
        this.gl.activeTexture(this.gl.TEXTURE0 + this.unit);
        //Aufgabe 2a
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }

    createDebugTexture(maxLevel) {
        //Aufgabe 4e
        this.width = 1 << maxLevel;
        this.height = 1 << maxLevel;
        this.unbind();
        this.bind();
        const lut = [[1, 0 ,0], [1, 1 ,0], [0, 1 ,0], [0,1,1], [0,0,1], [1, 0, 1]]; //look up tabelle für regenbogen

        for(let level = 0; level <= maxLevel; level++){
            const size = 1 << (maxLevel-level);
            const data = new Uint8Array(size*size*4);
            const [r,g,b] = lut[level % lut.length];

            for(let i = 0; i < size*size; i++){
                data[i * 4 + 0] = r*255;
                data[i * 4 + 1] = g*255;
                data[i * 4 + 2] = b*255;
                data[i * 4 + 3] = 255;
            }
            this.gl.texImage2D(this.gl.TEXTURE_2D, level, this.gl.RGBA, size, size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
        }

      
        }
        
    }