const axios = require('axios')
const PrettyTable = require('prettytable')
let pt = new PrettyTable();


const url = "https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date=2018-01-26&leftTicketDTO.from_station=SHH&leftTicketDTO.to_station=ZZF&purpose_codes=ADULT"

let header = "车次 出发站 到达站 出发时间 到达时间 历时 商务座 特等座 一等座 二等座 高级 软卧 动卧 硬卧 软座 硬座 无座"
header = header.split(' ')

axios.get(url).then((data) => {
    let r = data.data
    let alltickets = r.data.result
    // console.log(alltickets[0])
    let rows = []
    alltickets.forEach(data => {

        data = data.split('|')
        let singlerow = []

        singlerow = singlerow.concat(data.slice(3, 5))
        singlerow = singlerow.concat(data.slice(7, 11))
        singlerow = singlerow.concat(data.slice(23, 33).reverse())

        console.log(singlerow)
        rows.push(singlerow)
    });

    pt.create(header, rows);
    pt.print();

})

// let data = "9fg%2BYhuP36INsa7HobL3oBltb4wxRo2d35QmA798iLYWEZjhxhKDVBq6z%2B2J9tXy1NXGnvdxJ1ut%0AD9EMZQCpOwGjHbyHD1iN6b7meefJFVZNdA9UBZrlze5orif8KB1Jk5azOFkFfsoXb9Q7k9Yb6zDJ%0ALZXBLjh4hpC7KaZyZ2UwjumKuG%2Fii706gwPkCXg9VNAVM51erV%2FWTJs3U3%2FwbHuhOQ4mmo9COxir%0A6b0RqwoKR8oBqSaFYMAN2DiJyaDxyaf1qQ%3D%3D|预订|5l000G197010|G1970|AOH|LAJ|AOH|ZAF|06:09|11:00|04:51|Y|BujjGtdrdApNPPTOp555qgrG4tNKiXYVcPGSzu3SaPLa4%2FfM|20180126|3|H2|01|11|1|0|||||||||||无|无|3||O0M090|OM9|0"




// let train_num = data[3]
// let from_station = data[4]
// let to_station = data[7]
// let start_time = data[8]
// let to_time = data[9]
// let dutation_time = data[10]
// let shangwu = data[32]
// let yideng = data[31]
// let erdeng = data[30]
// let gaoji = data[29]
// let ruanwo = data[28]
// let dongwo = data[27]
// let yingwo = data[26]
// let ruanzuo = data[25]
// let yingzuo = data[24]
// let wuzuo = data[23]



