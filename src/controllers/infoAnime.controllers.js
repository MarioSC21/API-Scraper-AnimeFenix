import { apiRutasNavigation, getAxios, parseAtributes, parseText } from '../../api'

export const infoAnime = async (req, res) => {
  const { id } = req.params
  const { getAnimeInfo } = apiRutasNavigation
  try {
    const animeInfo = await getAxios(getAnimeInfo(id))
    const sectionInfo = animeInfo.querySelectorAll('.section > .container > .columns > .column').map(i => {
      const title = i.querySelector('.columns .column h1') !== null ? parseText(i, '.columns .column h1') : 'no title'
      const img = i.querySelector('figure img') !== null ? parseAtributes(i, 'figure img', 'src') : 'no-image'
      const sipnosis = i.querySelector('.sinopsis') !== null ? parseText(i, '.sinopsis') : 'no sinopsis'
      const genero = i.querySelectorAll('.genres a').map(i => i.rawText) || 'no genero'
      const plusInfo = i.querySelectorAll('ul li').map(i => i.rawText.trim()) || 'no tipo'
      const estado = parseText(i, 'a')
      const listadoEpisodios = i.querySelectorAll('ul li').map((i, index) => {
        return i.querySelector('a') ? { [index]: parseAtributes(i, 'a', 'href') } : 'no link'
      })
      return {
        title,
        img,
        genero,
        estado,
        plusInfo,
        sipnosis,
        listadoEpisodios: JSON.stringify(listadoEpisodios)
      }
    })
    // console.log(sectionInfo)
    res.status(200).json({
      status: true,
      title: sectionInfo[1].title,
      imagen: sectionInfo[0].img,
      genero: sectionInfo[1].genero,
      episodios: sectionInfo[1].plusInfo[2].split(':').pop().trim(),
      estado: sectionInfo[0].estado === 'Emisi&oacute;n' ? 'En emisión' : 'Finalizado',
      tipo: sectionInfo[1].plusInfo[0].split(':').pop().trim(),
      proxEpsiodio: !sectionInfo[1].plusInfo[4] ? false : sectionInfo[1].plusInfo[4].split(':').pop().trim(),
      sipnosis: sectionInfo[1].sipnosis.trim(),
      listadoEpisodios: sectionInfo[2].plusInfo.map((i, index) => {
        return {
          name: i.trim(),
          links: `/${JSON.parse(sectionInfo[2].listadoEpisodios)[index][index].split('/').splice(3).join('/')}`
        }
      }).reverse()
    })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
