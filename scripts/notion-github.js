const pkg1 = require('@notionhq/client');
const axios =  require('axios');
const fs = require('fs')
const { Client } = pkg1;
let notion;
let imageUrls = [];
let contentArray = [];
const DESTINATION_FOLDER = 'src/chapter-content';
const IMAGE_REPO = 'noc-book-2/context/noc_html/imgs/';
const { NOTION_TOKEN } = process.env;
//const NOTION_TOKEN  = "secret_X0gL291bcfyjZxXx5elwH4YAPsC9JQ3F7qiBO4tTKfn";
const BLOCK_NAME = "Content";
let string = '';
async function getPageUpdates() {
    console.log('fetching notion content');
    let response = await notion.search({
        query:BLOCK_NAME
    });
    if(response.results && response.results.length) {
        let blockId = response.results[0].id;
        await getBlockContent(blockId,BLOCK_NAME);
       
        await updateDoc();
        //updateImages();
    } else {
        console.log('no data found for block:',BLOCK_NAME);
    }
    
}


async function getBlockContent(id,name) {
    let pageblock = await notion.blocks.children.list({
        block_id: id
    });
    if(pageblock.results && pageblock.results.length) {
        for(let i=0;i<pageblock.results.length;i++) {
            let obj = pageblock.results[i];
            if(obj.type == 'child_page') {
                await getBlockContent(obj.id,obj[obj.type].title);
            } else {
                if(obj[obj.type]) {
                    if(obj[obj.type].text) {
                        textToMd(obj[obj.type].text,obj.type)
                    }

                    //images and embeds
                    if(obj.type == 'image') {
                        embedToMd(obj[obj.type],'image')
                    }
                    if(obj.type == 'equation') {
                        string += `$$ ${obj?.equation?.expression} $$`
                    }
                }
                
            }
        }
        if(string != '') {
            contentArray.push({
                string:string,
                base:name
            })
        string = '';
        }
    }

}
function textToMd(text,type) {
        for(let i=0;i<text.length;i++) {
            let append = '';
            if(type == 'heading_1') {
                string = string + '# ';
            }
            if(type == 'heading_2') {
                string = string + '## ';
            }
            if(type == 'heading_3') {
                string = string + '### ';
            }
            if(type == 'heading_4') {
                string = string + '#### ';
            }
            if(type == 'heading_5') {
                string = string + '##### ';
            }
            if(type == 'heading_6') {
                string = string + '###### ';
            }
            if(type == 'heading_6') {
                string = string + '###### ';
            }
            if(type == 'callout') {
                string = string + '>';
            }


            //bold/italic/code/strikethrough/equation
            if(type == 'paragraph') {
                //console.log(`LINK\n ${JSON.stringify(obj[obj.type].text[i])} \n`);
                if(text[i]['href']) {
                    string = string + '[' + text[i]['plain_text'] + ']';
                    string = string + '(' + text[i]['href'] + ')' + '\n';
                }
                if(text[i]['annotations'].italic) {
                    append+= "*";
                }
                if(text[i]['annotations'].bold) {
                    append+= "**";
                }
                if(text[i]['annotations'].strikethrough) {
                    append+= "~~";
                }
            }
            
            if(type == 'code') {
                append = "\n ``` \n";
            }
            if(type == 'equation') {
                append = "`";
            }

            string += `${append}${text[i]['plain_text']}${append.split('').reverse().join('')}`;
        }
        string += '\n';
}
function embedToMd(typeObj,type) {
    //all images asssumed to already be on github served via jsdeliver
    if(type == "image") {
        let link = typeObj?.external?.url?.split(IMAGE_REPO);
        if(link && link[1]) {
            //hardcoded ch01_img
            string += `![ch01_img]( ${link[1]})`
            console.log('LINK',link[1]);
        }
    }
    string += '\n';
}
async function updateDoc() {
    for (let i = 0; i < contentArray.length; i++) {
        addFiles(contentArray[i].base,contentArray[i].string)
    }
}

async function addFiles(name,content) {
    const filePath = `${DESTINATION_FOLDER}`;

    console.log('Creating directory', filePath);
    fs.mkdirSync(filePath, { recursive: true }, () => {});

    const fileContents = content.toString('base64');
    const fileName = `${name}.md`;
    console.log('Creating file', fileName);
    fs.writeFileSync(`${filePath}/${fileName}`, fileContents);
}
//
async function onStart() {
    console.log('NOTION_TOKEN',NOTION_TOKEN)
    notion = new Client({ auth: NOTION_TOKEN })
    console.log(`Deleting ${DESTINATION_FOLDER}`);
    fs.rmdirSync(DESTINATION_FOLDER, { recursive: true });

    console.log(`Creating ${DESTINATION_FOLDER}`);
    fs.mkdirSync(DESTINATION_FOLDER, {});
    getPageUpdates();
}
onStart()