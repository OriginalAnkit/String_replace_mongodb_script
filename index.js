const MongoClient = require('mongodb').MongoClient;

let collectionName = "MarketingTemplate";
let searchCond = { TemplateBlockContent: new RegExp("Rich Text Editor") }
let masterUrl='mongodb://localhost:27017'
let updateKey = "TemplateBlockContent";
let charToReplace = [
    { f: "Rich Text Editor, editor0", t: "" }, { f: "Rich Text Editor, editor1", t: "" }, { f: "Rich Text Editor, editor2", t: "" }, { f: "Rich Text Editor, editor3", t: "" }, { f: "Rich Text Editor, editor4", t: "" }, { f: "Rich Text Editor, editor5", t: "" }, { f: "Rich Text Editor, editor6", t: "" }, { f: "Rich Text Editor, editor7", t: "" }, { f: "Rich Text Editor, editor8", t: "" }, { f: "Rich Text Editor, editor9", t: "" }, { f: "Rich Text Editor, editor10", t: "" }, { f: "Rich Text Editor, editor11", t: "" }, { f: "Rich Text Editor, editor12", t: "" }, { f: "Rich Text Editor, editor13", t: "" }, { f: "Rich Text Editor, editor14", t: "" }, { f: "Rich Text Editor, editor15", t: "" }, { f: "Rich Text Editor, editor16", t: "" }, { f: "Rich Text Editor, editor17", t: "" }, { f: "Rich Text Editor, editor18", t: "" }, { f: "Rich Text Editor, editor19", t: "" }, { f: "Rich Text Editor, editor20", t: "" }, { f: "Rich Text Editor, editor21", t: "" }, { f: "Rich Text Editor, editor22", t: "" }, { f: "Rich Text Editor, editor23", t: "" }, { f: "Rich Text Editor, editor24", t: "" }, { f: "Rich Text Editor, editor25", t: "" }, { f: "Rich Text Editor, editor26", t: "" }, { f: "Rich Text Editor, editor27", t: "" }, { f: "Rich Text Editor, editor28", t: "" }, { f: "Rich Text Editor, editor29", t: "" }, { f: "Rich Text Editor, editor30", t: "" }, { f: "Rich Text Editor, editor31", t: "" }, { f: "Rich Text Editor, editor32", t: "" }, { f: "Rich Text Editor, editor33", t: "" }, { f: "Rich Text Editor, editor34", t: "" }, { f: "Rich Text Editor, editor35", t: "" }, { f: "Rich Text Editor, editor36", t: "" }, { f: "Rich Text Editor, editor37", t: "" }, { f: "Rich Text Editor, editor38", t: "" }, { f: "Rich Text Editor, editor39", t: "" }, { f: "Rich Text Editor, editor40", t: "" }, { f: "Rich Text Editor, editor41", t: "" }, { f: "Rich Text Editor, editor42", t: "" }, { f: "Rich Text Editor, editor43", t: "" }, { f: "Rich Text Editor, editor44", t: "" }, { f: "Rich Text Editor, editor45", t: "" }, { f: "Rich Text Editor, editor46", t: "" }, { f: "Rich Text Editor, editor47", t: "" }, { f: "Rich Text Editor, editor48", t: "" }, { f: "Rich Text Editor, editor49", t: "" }, { f: "Rich Text Editor, editor50", t: "" }, { f: "Rich Text Editor, editor51", t: "" }, { f: "Rich Text Editor, editor52", t: "" }, { f: "Rich Text Editor, editor53", t: "" }, { f: "Rich Text Editor, editor54", t: "" }, { f: "Rich Text Editor, editor55", t: "" }, { f: "Rich Text Editor, editor56", t: "" }, { f: "Rich Text Editor, editor57", t: "" }, { f: "Rich Text Editor, editor58", t: "" }, { f: "Rich Text Editor, editor59", t: "" }, { f: "Rich Text Editor, editor60", t: "" }, { f: "Rich Text Editor, editor61", t: "" }, { f: "Rich Text Editor, editor62", t: "" }, { f: "Rich Text Editor, editor63", t: "" }, { f: "Rich Text Editor, editor64", t: "" }, { f: "Rich Text Editor, editor65", t: "" }, { f: "Rich Text Editor, editor66", t: "" }, { f: "Rich Text Editor, editor67", t: "" }, { f: "Rich Text Editor, editor68", t: "" }, { f: "Rich Text Editor, editor69", t: "" }, { f: "Rich Text Editor, editor70", t: "" }, { f: "Rich Text Editor, editor71", t: "" }, { f: "Rich Text Editor, editor72", t: "" }, { f: "Rich Text Editor, editor73", t: "" }, { f: "Rich Text Editor, editor74", t: "" }, { f: "Rich Text Editor, editor75", t: "" }, { f: "Rich Text Editor, editor76", t: "" }, { f: "Rich Text Editor, editor77", t: "" }, { f: "Rich Text Editor, editor78", t: "" }, { f: "Rich Text Editor, editor79", t: "" }, { f: "Rich Text Editor, editor80", t: "" }, { f: "Rich Text Editor, editor81", t: "" }, { f: "Rich Text Editor, editor82", t: "" }, { f: "Rich Text Editor, editor83", t: "" }, { f: "Rich Text Editor, editor84", t: "" }, { f: "Rich Text Editor, editor85", t: "" }, { f: "Rich Text Editor, editor86", t: "" }, { f: "Rich Text Editor, editor87", t: "" }, { f: "Rich Text Editor, editor88", t: "" }, { f: "Rich Text Editor, editor89", t: "" }, { f: "Rich Text Editor, editor90", t: "" }, { f: "Rich Text Editor, editor91", t: "" }, { f: "Rich Text Editor, editor92", t: "" }, { f: "Rich Text Editor, editor93", t: "" }, { f: "Rich Text Editor, editor94", t: "" }, { f: "Rich Text Editor, editor95", t: "" }, { f: "Rich Text Editor, editor96", t: "" }, { f: "Rich Text Editor, editor97", t: "" }, { f: "Rich Text Editor, editor98", t: "" }, { f: "Rich Text Editor, editor99", t: "" }
]



function GetConnection(url, dbName) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);
            resolve(db)

        });
    })

}
function replaceCharactes(db) {
    db.collection(collectionName).find(searchCond).toArray().then(
        docs => {
            docs.forEach(
                doc => {
                    tempStr = doc.TemplateBlockContent;
                    // charToReplace.forEach(
                    //     chr => {
                    //         tempStr = tempStr.replace(new RegExp(chr.f, "g"), chr.t)
                    //     }
                    // )
                    for(let i=charToReplace.length-1;i>0;i--){
                        
                       let chr=charToReplace[i];
                        tempStr = tempStr.replace(new RegExp(chr.f, "g"), chr.t)
                    }
                    obj = {};
                    obj[updateKey] = tempStr;
                    db.collection(collectionName).updateOne({ _id: doc._id }, { $set: obj }).then(d => console.log(d.result))

                }
            )
        }
    )
}

GetConnection(masterUrl, 'OPT_Master').then(
    db => {
        db.collection("Company").find().toArray().then(
            comp => {
                comp.forEach(c => {
                    GetConnection(c.DBAddress, c.DBName).then(
                        companyConnection => {
                            replaceCharactes(companyConnection)
                        }
                    )
                });
            }
        )
    }
)

