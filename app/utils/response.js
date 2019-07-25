exports.write = (res, err, result) => {
  if (err) {
    res.status(500).json({error: err})
  } else {
    res.status(200).json({
      result
    })
  }
}