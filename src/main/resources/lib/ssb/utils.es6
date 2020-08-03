
const content = __non_webpack_require__( '/lib/xp/content')

const numberWithSpaces = (x) => {
    const parts = x.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')
    return parts.join('.')
}

export const createHumanReadableFormat = (value) => {
    return value > 999 ? numberWithSpaces(value).toString().replace(/\./, ',') : value.toString().replace(/\./, ',')
}

export function getImageCaption(imageId) {
    const imageContent = content.get({
        key: imageId
    })
    return imageContent !== undefined ? imageContent.data.caption : ''
}

export function dummyContent(id) {
    return content.get(id)
}
