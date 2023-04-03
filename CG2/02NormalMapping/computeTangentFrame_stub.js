

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
