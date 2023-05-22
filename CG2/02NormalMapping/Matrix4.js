// @ts-check
export let Matrix4 = {

    /**
     * Creates a diagonal matrix with a single element on the diagonal.
     * @param {number} s A scalar value that is placed on the diagonal of matrix 
     * @returns A diagonal matrix.
     */
    diagonal: function (s) {
        return [s, 0, 0, 0,
                0, s, 0, 0,
                0, 0, s, 0,
                0, 0, 0, s];
    },

    /**
     * Creates and returns a 4x4 row-major translation matrix. 
     * A translation-matrix multiplied with a 3D homogeneous point translates that point by 
     * tx in x direction, ty in y direction, and tz in z direction.
     * @param {number} tx Translation in x direction.
     * @param {number} ty Translation in y direction.
     * @param {number} tz Translation in y direction.
     * @returns A 4x4 row-major translation matrix.
     */
    translation: function (tx, ty, tz) {
        return [
            1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1
        ];
    },

    /**
     * Create and returns a 4x4 row-major rotation matrix rotation around the x axis.
     * A rotation-matrix multiplied with a 3D homogeneous point rotates that point by 
     * angle radians around the origin in anti-clockwise direction.
     * @param {number} angle for rotation in radians. 
     * @returns A 4x4 row-major rotation matrix.
     */
    rotationX: function (angle) {
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        return [
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ];
    },

    /**
     * Create and returns a 4x4 row-major rotation matrix rotation around the y axis.
     * A rotation-matrix multiplied with a 3D homogeneous point rotates that point by 
     * angle radians around the origin in anti-clockwise direction.
     * @param {number} angle for rotation in radians. 
     * @returns A 4x4 row-major rotation matrix.
     */
    rotationY: function (angle) {
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        return [
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ];
    },

    /**
     * Create and returns a 4x4 row-major rotation matrix rotation around the z axis.
     * A rotation-matrix multiplied with a 3D homogeneous point rotates that point by 
     * angle radians around the origin in anti-clockwise direction.
     * @param {number} angle for rotation in radians. 
     * @returns A 4x4 row-major rotation matrix.
     */
    rotationZ: function (angle) {
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        return [
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    },

    /**
     * Creates and returns the matrix-matrix product of two 4x4 row-major matrices.
     * @param {number[]} a A row-major 4x4 matrix as left-operand of the matrix product.
     * @param {number[]} b A row-major 4x4 matrix as right-operand of the matrix product.
     * @returns The matrix-matrix product of two 4x4 row-major matrices.
     */
    multiply: function (a, b) {
        //                         b[ 0] b[ 1] b[ 2] b[ 3]
        //                         b[ 4] b[ 5] b[ 6] b[ 7]
        //                         b[ 8] b[ 9] b[10] b[11]
        //                         b[12] b[13] b[14] b[15]
        // a[ 0] a[ 1] a[ 2] a[ 3]
        // a[ 4] a[ 5] a[ 6] a[ 7]
        // a[ 8] a[ 9] a[10] a[11]
        // a[12] a[13] a[14] a[15]
        let r = new Array(16);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                r[i * 4 + j] = 0;
                for (let k = 0; k < 4; k++) {
                    r[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
                }
            }
        }
        return r;
    },

    /**
     * Creates 4x4 perspective projection matrix.
     * @param {number} fieldOfViewRadians Field of view in y direction provided in radians.
     * @param {number} aspectRatio Aspect ratio of view plane, i.e., width / height.
     * @param {number} nearPlaneDistance Distance from near plane to camera origin.
     * @param {number} farPlaneDistance  Distance from far plane to camera origin.
     */
    perspective: function (fieldOfViewRadians, aspectRatio, nearPlaneDistance, farPlaneDistance) {
        let t = Math.tan(0.5 * fieldOfViewRadians);
        let n = nearPlaneDistance; let f = farPlaneDistance; let a = aspectRatio;
        return [
            1.0 / (a * t), 0, 0, 0,
            0, 1.0 / t, 0, 0,
            0, 0, (n + f) / (n - f), (2 * f * n) / (n - f),
            0, 0, -1, 0

        ];
    },

    /**
     * Returns the transpose of a matrix.
     * @param {number[]} a The input matrix.
     * @returns The transpose
     */
    transpose: function (a) {
        return [
            a[0], a[4], a[8], a[12],
            a[1], a[5], a[9], a[13],
            a[2], a[6], a[10], a[14],
            a[3], a[7], a[11], a[15]
        ];
    },

    /**
     * 
     * @param {number[]} a The matrix of which we want to compute the trace.
     * @returns The trace of a matrix.
     */
    trace: function (a) {
        return a[0] + a[5] + a[10] + a[15];
    },

    /**
     * Computes the determinate of a 3x3 matrix
     * |a b c|
     * |d e f|
     * |g h i|
     * @param {number} a 
     * @param {number} b 
     * @param {number} c 
     * @param {number} d 
     * @param {number} e 
     * @param {number} f 
     * @param {number} g 
     * @param {number} h 
     * @param {number} i 
     * @returns The determinant of a matrix;
     */
    determinate3x3: function (a, b, c, d, e, f, g, h, i) {
        return a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;
    },

    /**
     * Compute the determinate of a matrix.
     * @param {number[]} A Matrix
     * @returns The determinate of a matrix. 
     */
    determinate: function (A) {
        let a = A[0];
        let b = A[1];
        let c = A[2];
        let d = A[3];
        let e = A[4];
        let f = A[5];
        let g = A[6];
        let h = A[7];
        let i = A[8];
        let j = A[9];
        let k = A[10];
        let l = A[11];
        let m = A[12];
        let n = A[13];
        let o = A[14];
        let p = A[15];

        return a * this.determinate3x3(f, g, h, j, k, l, n, o, p)
             - b * this.determinate3x3(e, g, h, i, k, l, m, o, p)
             + c * this.determinate3x3(e, f, h, i, j, l, m, n, p)
             - d * this.determinate3x3(e, f, g, i, j, k, m, n, o);
    },

    /**
     * Adds return two matrices.
     * @param {number[]} a Left matrix operand of sum.
     * @param {number[]} b Right matrix operand of sum
     * @return The sum of two matrices.
     */
    add: function (a, b) {
        let c = new Array(16);
        for (let i = 0; i < 16; i++) {
            c[i] = a[i] + b[i];
        }
        return c;
    },

    /**
 * Subtracts return two matrices.
 * @param {number[]} a Left matrix operand of difference.
 * @param {number[]} b Right matrix operand of difference
 * @return The difference of two matrices.
 */
    sub: function (a, b) {
        let c = new Array(16);
        for (let i = 0; i < 16; i++) {
            c[i] = a[i] - b[i];
        }
        return c;
    },

    /**
     * Scales a matrix by a constant factor and returns the result.
     * @param {number} s scalar factor.
     * @param {number[]} a Matrix that is scaled
     * @returns A scaled matrix.
     */
    scale: function (s, a) {
        let c = new Array(16);
        for (let i = 0; i < 16; i++) {
            c[i] = s * a[i];
        }
        return c;
    },


    /**
     * Computes the inverse of a matrix.
     * @param {number[]} a Matrix
     * @returns inverse of matrix.
     */
    inverse: function (a) {
        let a2 = this.multiply(a, a);
        let a3 = this.multiply(a2, a);
        let trA = this.trace(a);
        let trA2 = this.trace(a2);
        let trA3 = this.trace(a3);
        let dInv = 1.0 / this.determinate(a);

        let X = this.diagonal((trA * trA * trA - 3 * trA * trA2 + 2 * trA3) / 6.0);
        let Y = this.scale(0.5 * (trA * trA - trA2), a);
        let Z = this.scale(trA, a2);
        return this.scale(dInv, this.sub(this.add(this.sub(X, Y), Z), a3));
    }
};