// @ts-check
import { Vec2 } from "./Vec2.js";
import { Vec3 } from "./Vec3.js";
import { Quaternion } from "./Quaternion.js";
import { Matrix4 } from "./Matrix4.js";
export class ExaminerController {
    /**
     * Default constructor.
     */
    constructor() {
        // Current position of the mouse during shifting.
        this.shiftPosition = new Vec2(0, 0);

        // Current position of the mouse during pitching.
        this.pitchPosition = new Vec2(0, 0);

        // Current position of the mouse during rotation.
        this.rotationPosition = new Vec2(0, 0);

        // True, if we are in shift mode.
        this.shifting = false;
        // True, if we are in pitch mode.
        this.pitching = false;
        // True, if we are in rotation mode.
        this.rotating = false;

        // Initial translation.
        this.translation = new Vec3(0, 0, -3);
        // Rotation quaternion.
        this.rotation = new Quaternion();
    }

    /**
     * Called, when mouse button is pressed. 
     * 
     * Sets the appropriate mode.
     * @param {number} button Mouse button (0 is left, 1 is right, 2 is middle.)
     * @param {Vec2} p Normalized mouse position [-1 ... 1]^2 
     */
    mouseDown(button, p) {
        if (button == 0) {
            // TODO Aufgabe 6a
        }
        if (button == 1) {
            // TODO Aufgabe 3a
        }
        if (button == 2) {
            // TODO Aufgabe 4
        }
    }

    /**
     * Called when a mouse button is released.
     * @param {number} button Mouse button (see mouseDown.)
     */
    mouseUp(button) {
        if (button == 0) {
            // TODO Aufgabe 6a
        }
        if (button == 1) {
            // TODO Aufgabe 3a
            // TODO Aufgabe 3b 
        }
        if (button == 2) {
            // TODO Aufgabe 4
        }
    }

    /**
     * Called when the mouse is moved. If we are in pitch-, shift, or rotation mode, the widget parameters are update.
     * @param {Vec2} p Normalized mouse position [-1 ... 1]^2 
     */
    mouseMove(p) {
        if (this.pitching == true) {
            this.updatePitch(p);
        }
        if (this.shifting == true) {
            this.updateShift(p);
        }
        if (this.rotating == true) {
            this.updateRotation(p);
        }
    }

    /**
     * Computes the z value from x and y values provided in p. Thereby it projects such that [p.x, p.y, z] is on a sphere if ||p||<0.5 and on 3d hyperboloid otherwise.
     * @param {Vec2} p Normalized mouse position [-1 ... 1]^2 
     * @returns the z value of the surface.
     */
    projectToSurface(p) {
        // TODO Aufgabe 6b
        return 0;
    }

    /**
     * Updates the rotation.
     * @param {Vec2} p Normalized mouse position [-1 ... 1]^2 
     * @returns 
     */
    updateRotation(p) {
        if (this.rotationPosition.x == p.x && this.rotationPosition.y == p.y) {
            return;
        }
        // TODO Aufgabe 6c
    }

    /**
   * Updates the pitch.
   * @param {Vec2} p Normalized mouse position [-1 ... 1]^2 
   */
    updatePitch(p) {
        // TODO Aufgabe 3b
    }

    /**
   * Updates the shift.
   * @param {Vec2} p Normalized mouse position [-1 ... 1]^2 
   */
    updateShift(p) {
        // TODO Aufgabe 4
    }

    /**
   *    
   * @returns Returns the rotation matrix.
   */
    getMatrix() {
        let m = Matrix4.diagonal(1);
        // TODO Aufgabe 3c
        // TODO Aufgabe 6d
        return m;
    }
}