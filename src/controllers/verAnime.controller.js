import { getAxios, parseAtributes, parseText, apiRutasNavigation, parse } from '../../api'

export const verAnime = async (req, res) => {
  const { id } = req.params
  const { getVerAnimeId } = apiRutasNavigation
  try {
    const html = await getAxios(getVerAnimeId(id))
    const colPrevnext = html.querySelectorAll('.columns .column .column').map(i => {
      console.log(i.toString())
      return {
        link: parseAtributes(i, 'a', 'href')
      }
    })
    console.log(colPrevnext)
    const conditionalPrev = colPrevnext[0].link.split('-').pop()
    const conditionalNext = colPrevnext[1].link.split('-').pop()

    const videosHtml = html.querySelector('.player-container ')
    const iframeVideo = parse(parseText(videosHtml, 'script').trim())

    const nombreServer = videosHtml.querySelectorAll('ul a').map((name, index) => {
      return {
        [index]: name.attributes.title
      }
    })

    res.status(200).json({
      name: parseText(html, '.title').trim(),
      controles: {
        prev: {
          existe: conditionalPrev > 0,
          link: `/ver/${colPrevnext[0].link.split('/').pop()}`
        },
        next: {
          existe: conditionalNext > 0,
          link: colPrevnext[1].link
        }
      },
      Videos: iframeVideo.querySelectorAll('iframe').map((i, index) => {
        return {
          serverName: nombreServer[index][index],
          url: i.attributes.src
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}
