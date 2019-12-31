let exec = require('child_process').exec;
let fs = require('fs');

execCommon('rm -rf bin-release/web/')

execCommon('egret publish')

function execCommon(commond){
    exec(commond,(err)=>{
        if(err){
            console.log(err);
            return;
        }
        let mergejsPath = ''
        if(!!~commond.indexOf('publish')){
            const files = fs.readdirSync('bin-release/web/')
            console.log(files[0])
            let onlyStaticPath = `bin-release/web/${files[0]}/`;
            fs.readFile(`${onlyStaticPath}manifest.json`,(err,data)=>{
                if(err){
                    console.log(err);
                    return;
                }
                execCommon(`rm -rf ${onlyStaticPath}manifest.json`);
                // execCommon('')
                let jsonobj = JSON.parse(data.toString())
                let urlarr = jsonobj.initial.concat(jsonobj.game);
                let cnt = "";
                urlarr.forEach((urlstr,index)=>{
                    fs.readFile(`${onlyStaticPath}${urlstr}`,(err,data)=>{
                        if(err){console.log(err);return;}
                        cnt += data.toString();
                        if(index >= urlarr.length - 1){
                            //合并结束
                            mergejsPath = `${onlyStaticPath}js/run.js?v=${Math.random()}`
                            fs.writeFile(mergejsPath,cnt,(err)=>{
                                if(err){console.log(err);return;}
                                console.log("mergr end...");
                            })
                        }
                    })
                },this)
            })
        }
    })
}
