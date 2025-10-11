/*export default(controllerFunction) => (req, res, next) => {
  Promise.resolve(controllerFunction(req, res, next))
    .catch((error) => {
      console.error('Error caught in middleware:', error);
      res.status(500).json({ message: 'An unexpected error occurred.' });
    });
}*/

export default (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
};