import boom from '@hapi/boom'

export default (error, req, res, next) => {
  if (error) {
    res.status(400).send({
      status: false,
      Error: boom.notFound('Coloque una id valida')
    })
  } else {
    res.status(500).end()
  }
}
