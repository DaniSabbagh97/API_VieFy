module.exports = (err, req, res, next) => {
  const status = err.status || 400
  res.status(status)
  res.json({ success: false, message: err.message })
}