import { getAxios, parseAtributes, parseText } from '../../api'

export const pageHome = async (_, res) => {
  try {
    const html = await getAxios()
    res.json(
      html.querySelectorAll('.capitulos-grid .item').map(i => {
        const id = parseAtributes(i, 'a', 'href').split('/').pop()
        const idNameInfo = id.split('-')
        const image = parseAtributes(i, 'a img', 'src')
        const episode = parseText(i, '.overepisode ').split(' ').pop()
        return {
          id,
          idNameInfo: `${idNameInfo.filter((element, index) => index !== idNameInfo.length - 1).join('-')}`,
          title: parseText(i, '.overtitle '),
          image,
          episode
        }
      })
    )
  } catch (error) {
    res.status(500).json({
      status: false,
      error
    })
  }
}
