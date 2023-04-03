// @ts-check
export class Vec2
{
    /**
     * Creates a vector of three components
     * @param {number} x the first component.
     * @param {number} y the second component
     */
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    /**
     * Reads two numbers from the index i*2 of array a.
     * @param {number[]} a An array with the two consecutive numbers making up a vector. 
     * @param {number} i Index of the vector to be extracted.
     * @returns A vec2.
     */
    static createFromArray(a, i)
    {
        return new Vec2(a[i*2 + 0], a[i*2 + 1]);
    }

    /**
     * Computes the dot product between two vectors.
     * @param {Vec2} a Left Operand
     * @param {Vec2} b Right Operand
     * @returns {number} The dot product.
     */
    static dot(a, b)
    {
        return a.x * b.x + a.y * b.y;
    }

    /**
     * Computes the Euclidean length of vector.
     * @param {Vec2} a The vector of which to compute the length.
     * @returns The Euclidean length.
     */
    static euclideanLength(a)
    {
        return Math.sqrt(this.dot(a,a));
    }

    /**
     * Adds two vectors and returns the sum.
     * @param {Vec2} a Left operand of the addition.
     * @param {Vec2} b Right operand of the addition.
     * @returns The vector sum of the vectors a and b.
     */
    static add(a, b)
    {
        return new Vec2(a.x + b.x, a.y + b.y);
    }

    /**
     * Subtracts two vectors and returns the difference.
     * @param {Vec2} a Left operand of the difference.
     * @param {Vec2} b Right operand of the difference.
     * @returns The vector difference of the vectors a and b.
     */
    static sub(a, b)
    {
        return new Vec2(a.x - b.x, a.y - b.y);
    }


    /**
     * Scales a vector by a constant vector
     * @param {number} s The constant factor.
     * @param {Vec2} a The vector to be scaled
     * @returns The scaled vector.
     */
    static scale(s, a)
    {
        return new Vec2(s * a.x, s * a.y);
    }

    /**
     * Scales vector to unit length.
     * @param {Vec2} a The vector that we wish to normalize.
     * @returns A vector pointing in the same direction of a, but which has unit length.
     */
    static normalize(a)
    {
        let inverseLength = 1.0 / this.euclideanLength(a);
        return this.scale(inverseLength, a);
    }
}