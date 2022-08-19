import parse from 'node-html-parser'
import axios from 'axios'

const URL_ANIME = 'https://www.animefenix.com'

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
}

export const apiRutasNavigation = {
  getHome: URL_ANIME,
  getAnimeInfo: Infoid => `${URL_ANIME}/${Infoid}`,
  getVerAnimeId: id => `${URL_ANIME}/ver/${id}`,
  getUserLogin: `${URL_ANIME}/user/login`,
  getDownloadAnime: id => `${URL_ANIME}/ver/${id}/descarga`
}

export const getAxios = async (url = URL_ANIME) => {
  try {
    const response = await axios.get(url, { headers })
    return parse(response.data)
  } catch (error) {
    return error
  }
}

export const parseAtributes = (html, etiqueta, atr) => {
  return html.querySelector(etiqueta).attributes[atr]
}
export const parseAtributesAll = (html, etiqueta) => {
  return html.querySelectorAll(etiqueta)
}
export const parseText = (html, etiqueta) => {
  return html.querySelector(etiqueta).rawText
}

export { parse }
