/**
 * Registers routes for each controller in the provided array.
 *
 * @param {Object} app - The express app object.
 * @param {Array} controllers - An array of controller objects.
 */
export default function registerRoutes(app, controllers) {
    for (const controller of controllers) {
      controller.registerRoutes(app);
    }
  }