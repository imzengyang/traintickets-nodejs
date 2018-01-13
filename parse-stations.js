const axios = require('axios')
const fs = require('fs')
const path = require('path')

const url = "https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.8955"
const stationsFile = path.join(__dirname,'stations.js')

async function parsedata(url) {
    let r = await axios.get(url)
    r=r.data
    let recity = /([\u4e00-\u9fa5]+)/g
    let recode = /([A-Z][A-Z][A-Z])/g
    let cities = r.match(recity)
    let codes = r.match(recode)
    let rs = {}
    rs.cities = cities;
    rs.codes = codes;
    fs.writeFileSync(stationsFile,JSON.stringify(rs))

}


parsedata(url)

// let str = "2702@zzb|资中北|WZW|zizhongbei|zzb|2703@zzd|涿州东|ZAP|zhuozhoudong|zzd|2704@zzd|枣庄东|ZNK|zaozhuangdong|zzd|2705@zzd|卓资东|ZDC|zhuozidong|zzd|2706@zzd|郑州东|ZAF|zhengzhoudong|zzd|2707@zzn|株洲南|KVQ|zhuzhounan|zzn|2708"
// // let re = /([\u4e00-\u9fa5]+)/g
// let re = /([A-Z][A-Z][A-Z])/g
// strs = str.match(re)
// console.log(strs)

