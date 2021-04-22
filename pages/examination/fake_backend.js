export function fake_fetchGet(url, param) {
  var path = url.split('/')
  switch (path[4]) {
    case 'hospital':
      return {
        "st": 0,
        "msg": "",
        "data": {
          "hospitalList": [
            "杭州市第一人民医院",
            "浙江大学医学院附属第一医院",
            "浙江大学医学院附属第二医院",
            "浙江大学医学院附属邵逸夫医院"
          ]
        }
      }
    case 'remainder':
      return {
        "st": 0,
        "msg": "",
        "data": {
          "sections": [
			0,
            3,
            6,
            9,
            12,
            15,
            18,
            21
          ]
        }
      }
    case 'appointment':
      return {
        "st": 0,
        "msg": "",
        "data": {
          "appointments": [
            {
              "appointId": 2,
              "hospital": "浙江大学医学院附属第一医院",
              "appointDate": 1618934400,
              "section": 3
            },
            {
              "appointId": 1,
              "hospital": "浙江大学医学院附属第一医院",
              "appointDate": 1618934300,
              "section": 1
            }
          ]
        }
      }
  }
}

export function fake_fetchPost(url, data) {
  return {
    "st": 0,
    "msg": "",
    "data": {
      "result": true
    }
  }
}