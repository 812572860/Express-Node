module.exports = (error, req, res, next) => {
  if(error) {
    res.status(500).json(error)
  }
  next()
}