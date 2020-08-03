const test = __non_webpack_require__('/lib/xp/testing')
const utils = __non_webpack_require__( '/lib/ssb/utils')

// PASSES These two tests run isolated code in utils lib
exports.testHumanReadableNumber1 = function() {
  const result = utils.createHumanReadableFormat(123456789)
  test.assertEquals('123\u00a0456\u00a0789', result, 'Assertion that a 9 figure number is represented by groups of three, with nbsp separator')
}

exports.testHumanReadableNumber2 = function() {
  const result = utils.createHumanReadableFormat(1249554)
  test.assertEquals('1\u00a0249\u00a0554', result, 'Assertion that a 7 figure number is divided in a group of 1, then two groups of 3 with nbsp separator')
}

// PASSES This test imports content library directly, mock works correctly here.
exports.testMockLibContent = function() {
  const libContent = __non_webpack_require__('/lib/xp/content')

  const result = libContent.get({
    key: 'id'
  })

  test.assertEquals('201c4f2f-ff5e-4298-8a3f-b07d515795de', result._id)
}

// FAILS This test tries to run a method in utils.es6 which in turn uses content lib - this is NOT mocked correctly.
exports.testKeyFigureImageCaption1 = function() {
  const result = utils.getImageCaption( { 'id':'201c4f2f-ff5e-4298-8a3f-b07d515795de' } )
  test.assertEquals('ikon av mennesker og hus', result, 'Testing extraction of mocked image caption from json')
}

test.mock('/lib/xp/content.js', {
  get: function() {
    return {
      '_id': '201c4f2f-ff5e-4298-8a3f-b07d515795de',
      '_name': 'komfakta-icon4-nettoflytting.svg',
      '_path': '/ssb/kommunefakta/nokkeltall-kommunefakta/nettoflytting/komfakta-icon4-nettoflytting.svg',
      'creator': 'user:system:trine',
      'modifier': 'user:adfs:s-1-5-21-2125401682-1754076223-1620198925-9146',
      'createdTime': '2019-12-12T13:43:31.293Z',
      'modifiedTime': '2020-02-27T14:33:41.445079Z',
      'owner': 'user:system:trine',
      'type': 'media:vector',
      'displayName': 'komfakta-icon4-nettoflytting',
      'hasChildren': false,
      'language': 'nb',
      'valid': true,
      'childOrder': 'modifiedtime DESC',
      'data': {
        'media': {
          'attachment': 'komfakta-icon4-nettoflytting.svg'
        },
        'caption': 'ikon av mennesker og hus'
      },
      'x': {
        'com-enonic-app-metafields': {
          'meta-data': {
            'blockRobots': false
          }
        }
      },
      'page': {},
      'attachments': {
        'komfakta-icon4-nettoflytting.svg': {
          'name': 'komfakta-icon4-nettoflytting.svg',
          'label': 'source',
          'size': 1760,
          'mimeType': 'image/svg+xml'
        }
      },
      'publish': {
        'from': '2019-12-12T13:47:37.520Z',
        'first': '2019-12-12T13:47:37.520Z'
      },
      'workflow': {
        'state': 'READY',
        'checks': {}
      }
    }
  }
})

