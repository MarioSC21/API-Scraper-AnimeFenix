import { getAxios, apiRutasNavigation, parseText, parseAtributes } from '../../api'

export const searchAnime = async (req, res, next) => {
  const { id } = req.params
  const { getSearchAnime } = apiRutasNavigation
  try {
    const html = await getAxios(getSearchAnime(id))
    res.status(200).json({
      status: true,
      reult: 'resultados de la busqueda',
      data: html.querySelectorAll('.list-series article').map(i => {
        const id = parseAtributes(i, 'h3 a', 'href').split('/').pop()
        const name = parseText(i, 'h3 a')
        const image = parseAtributes(i, 'a img', 'src')
        const description = parseText(i, 'p')
        return {
          id,
          info: `/info/${id}`,
          name,
          description,
          image
        }
      })
    })
  } catch (error) {
    next(error)
  }
}
