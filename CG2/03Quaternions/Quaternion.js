// @ts-check
import { Vec3 } from "./Vec3.js";
import { Matrix4 } from "./Matrix4.js";

export class Quaternion
{
  /**
   * Creates a zero quaternion.
   */
  constructor()
  {
    this.a = 0;
    this.bx = 0;
    this.by = 0;
    this.bz = -1;
  }

  /**
   * Multiplies two quaternions and returns the product.
   * @param {Quaternion} lhs Left-hand side operand. 
   * @param {Quaternion} rhs Right-hand side operand.
   * @returns {Quaternion} The product.
   */
  static mult(lhs, rhs)
  {
    let result = new Quaternion;
    // TODO Aufgabe 5
    return result;
  }

  /**
   * Computes and returns the dot product of two given quaternions.
   * @param {Quaternion} lhs Left-hand side operand.
   * @param {Quaternion} rhs Right-hand side operand.
   * @returns {number} The value of the dot product.
   */
  static dot(lhs, rhs)
  {
    // TODO Aufgabe 5
    return 0;
  }

  /**
   * Computes and returns the Euclidean length of the provided quaternion.
   * @param {Quaternion} arg The quaternion from which the length should be computed.
   * @returns {number} The Euclidean length of the quaternion.
   */
  static euclideanLength(arg)
  {
    // TODO Aufgabe 5
    return 0;
  }

  /**
   * Computes and returns the quaternion with Euclidean unit length 1, 
   * that points into the same direction as the provided argument. 
   * 
   * The behavior is undefined, if the zero quaternion is provided.
   * @param {Quaternion} arg The quaternion that has to be normalized. 
   * @returns {Quaternion} A normalized quaternion. 
   */
  static normalize(arg)
  {
    let result = new Quaternion;

    // TODO Aufgabe 5

    return result;
  }

  /**
   * Computes and returns a rotation quaternion that rotates a point around the provided axis by 
   * the provided angle in radians.
   * @param {number} angleRad Rotation angle in radians.
   * @param {Vec3} axis Axis around which should be rotated.
   */
  static angleAxis(angleRad, axis)
  {
    let result = new Quaternion;
    // TODO Aufgabe 5
    return result;
  }

  /**
   * Convert the provided quaternion to a matrix. 
   * @param {Quaternion} q 
   * @returns A rotation matrix..
   */
  static toMatrix(q)
  {
    let result = Matrix4.diagonal(1);    
    // TODO Aufgabe 5
    return result;
  }
}