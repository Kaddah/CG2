// @ts-check
import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"
import { Vec3 } from "./Vec3.js";

export class TriangleMeshGL{
    /**
     * Creates a triangle mesh with positions, colors and texture coordinates
     * drawable with WebGL2.
     * 
     * @param {WebGL2RenderingContext} gl WebGL Rendering Context
     * @param {SimpleMeshModelIO} simpleMeshIO Simple Mesh IO
     */ 
    constructor(gl, simpleMeshIO) {
        this.gl = gl;
        this.nTriangleIndices = simpleMeshIO.indices.length;
        this.vao = 0;
        
        const triangles     = simpleMeshIO.indices;
        const positions     = simpleMeshIO.positions;
        const colors        = simpleMeshIO.colors;
        const normals       = simpleMeshIO.normals;
        const texCoords     = simpleMeshIO.texCoords;

        const positionAttributeLocation = 0;
        const colorAttributeLocation = 1;
        const normalAttributeLocation = 2;
        const texCoordAttributeLocation = 3;

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
        
        const pb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttributeLocation); 

        if(colors != null)
        {        
          const cb = gl.createBuffer();        
          gl.bindBuffer(gl.ARRAY_BUFFER, cb);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
          gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(colorAttributeLocation);
        }
        if(normals == null)
        {
            let newNormals = this.computeAverageNormals(triangles, positions)
            const nb = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, nb);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newNormals), gl.STATIC_DRAW);
            gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(normalAttributeLocation);
    
        } else 
        {
            const nb = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, nb);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
            gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(normalAttributeLocation);
        }
        //Aufgabe 1a
        const tb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, tb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
        gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(texCoordAttributeLocation); 
        
        // create a new element array buffer for wire frame
        let wireFrameElementArrayBuffer = this.createWireFrameElementArrayBuffer(triangles);
        this.nWireFrameIndices = wireFrameElementArrayBuffer.length;

        // Element Array buffer for triangles
        const ib = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(triangles), gl.STATIC_DRAW);

        // Create Vertex Buffer for Wire-Frame
        this.vaoWireFrame = gl.createVertexArray();
        gl.bindVertexArray(this.vaoWireFrame);        
        const ibWireFrame = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibWireFrame);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(wireFrameElementArrayBuffer), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, pb);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttributeLocation); 
    }

    /**
     * Draws a mesh with solid.
     */
    draw()
    {
        this.gl.bindVertexArray(this.vao);
        this.gl.drawElements(this.gl.TRIANGLES, this.nTriangleIndices, this.gl.UNSIGNED_INT, 0);   
    }

    /**
     * Draws a mesh using lines.
     */
    drawWireFrame()
    {       
        this.gl.bindVertexArray(this.vaoWireFrame);
        this.gl.drawElements(this.gl.LINES, this.nWireFrameIndices, this.gl.UNSIGNED_INT, 0);
    }

    /**
     * Creates a mesh for wire-frame rendering.
     * @param {number[]} triangles Array of triangles. 
     * @returns An element array buffer of lines.
     */
    createWireFrameElementArrayBuffer(triangles)
    {
        let wireFrameElementArrayBuffer  = [];
        let nTriangles = this.nTriangleIndices / 3;
        for(let tIdx = 0; tIdx < nTriangles; tIdx++)
        {
            let i0 = triangles[tIdx * 3 + 0];
            let i1 = triangles[tIdx * 3 + 1];
            let i2 = triangles[tIdx * 3 + 2];

            // First triangle edge
            wireFrameElementArrayBuffer.push(i0);
            wireFrameElementArrayBuffer.push(i1);

            // Second triangle edge
            wireFrameElementArrayBuffer.push(i1);
            wireFrameElementArrayBuffer.push(i2);

            // Third triangle edge
            wireFrameElementArrayBuffer.push(i2);
            wireFrameElementArrayBuffer.push(i0);
        }
        return wireFrameElementArrayBuffer;        
    }

    /**
     * Computes the normals of a vertex by averaging its neighboring face normals.
     * Each face normal is weighted by the face area.
     * @param {number[]} triangles Index buffer contained triangles.
     * @param {number[]} positions 3D Positions.
     */
    computeAverageNormals(triangles, positions)
    {        
        const  nVertices = positions.length / 3;
        let vertexNormals = new Array(nVertices);
        for(let vIdx = 0; vIdx < nVertices; vIdx++)
        {
            vertexNormals[vIdx] = new Vec3(0, 0, 0);
        }

        let nTriangles = triangles.length / 3;
        for(let tIdx = 0; tIdx < nTriangles; tIdx++)
        {
            // Get three vertex indices of triangle.
            let i = Vec3.createFromArray(triangles, tIdx);

            // Get thee geometric positions from triangle.
            let v0 = Vec3.createFromArray(positions, i.x);
            let v1 = Vec3.createFromArray(positions, i.y);
            let v2 = Vec3.createFromArray(positions, i.z);

            // Compute triangle face-normal
            let u = Vec3.sub(v1, v0);
            let v = Vec3.sub(v2, v0);
            let triangleNormal = Vec3.normalize(Vec3.cross(u, v));

            //
            vertexNormals[i.x] = Vec3.add(vertexNormals[i.x], triangleNormal);
            vertexNormals[i.y] = Vec3.add(vertexNormals[i.y], triangleNormal);
            vertexNormals[i.z] = Vec3.add(vertexNormals[i.z], triangleNormal);
        }

        let result = new Float32Array(nVertices * 3);
        for(let vIdx = 0; vIdx < nVertices; vIdx++)
        {        
            let n = Vec3.normalize(vertexNormals[vIdx]);
            result[vIdx * 3 + 0] = n.x;
            result[vIdx * 3 + 1] = n.y;
            result[vIdx * 3 + 2] = n.z;
        }
        return result;
    }

    

    computeTangentFrame(triangles, positions, textureCoordinates)
    {
        const  nVertices = positions.length / 3;
        let tangents = new Array(nVertices);
        let biTangents = new Array(nVertices); 
        for(let vIdx = 0; vIdx < nVertices; vIdx++)
        {
            tangents[vIdx] = new Vec3(1, 0, 0);
            biTangents[vIdx] = new Vec3(0, 1, 0);            
        }


        let nTriangles = triangles.length / 3;

        for(let tIdx = 0; tIdx < nTriangles; tIdx++)
        {
            
        }

        // Normalize tangents
        let outTangents = new Float32Array(nVertices * 3);
        let outBiTangents = new Float32Array(nVertices * 3);
        for(let vIdx = 0; vIdx < nVertices; vIdx++)
        {        
            let t = Vec3.normalize(tangents[vIdx]);
            outTangents[vIdx * 3 + 0] = t.x;
            outTangents[vIdx * 3 + 1] = t.y;
            outTangents[vIdx * 3 + 2] = t.z;
            
            let b = Vec3.normalize(biTangents[vIdx]);
            outBiTangents[vIdx * 3 + 0] = b.x;
            outBiTangents[vIdx * 3 + 1] = b.y;
            outBiTangents[vIdx * 3 + 2] = b.z;            
        }

        return {outTangents, outBiTangents};
    }



}