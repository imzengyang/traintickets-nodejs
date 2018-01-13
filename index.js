doc = `
Train tickets query via command-line.
Usage:
   tickets [-gdtkz] <from> <to> <date>
Options:
   -h,--help   显示帮助菜单
   -g          高铁
   -d          动车
   -t          特快
   -k          快速
   -z          直达
Example:
   index 上海 北京 2017-12-05
`
const { docopt } = require('docopt')
const axios = require('axios')
const PrettyTable = require('prettytable')
let { getCityName, getCode } = require('./stations')

let pt = new PrettyTable();

let requestObj = docopt(doc)
let start_station = getCode(requestObj['<from>'])
let end_station = getCode(requestObj['<to>'])
let start_date = requestObj['<date>']

let url = `https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date=${start_date}&leftTicketDTO.from_station=${start_station}&leftTicketDTO.to_station=${end_station}&purpose_codes=ADULT`

let header = "车次 出发站 到达站 出发时间 到达时间 历时 商务座 特等座 一等座 二等座 高级 软卧 动卧 硬卧 软座 硬座 无座"
header = header.split(' ')


async function main(url) {
    // console.log("url==>", url)
    let r = await axios.get(url)
    r = r.data.data
    let alltickets = r.result

    let rows = parse_tickets(alltickets)

    pt.create(header, rows);
    pt.print();
}

function parse_tickets(alltickets) {
    let rows = []
    alltickets.forEach(data => {
        data = data.split('|')
        let singlerow = []
        
        // singlerow = singlerow.concat(data.slice(3, 5))
        singlerow = singlerow.concat([data[3]] )
        singlerow = singlerow.concat([getCityName(data[4])] )
        singlerow = singlerow.concat([getCityName(data[5])] )
        singlerow = singlerow.concat(data.slice(7, 11))
        singlerow = singlerow.concat(data.slice(23, 33).reverse())
        rows.push(singlerow)
    });
    return rows
}


main(url)



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



