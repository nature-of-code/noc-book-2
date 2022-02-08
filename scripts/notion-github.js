const pkg1 = require('@notionhq/client');
const axios =  require('axios');
const fs = require('fs')
const { Client } = pkg1;
let notion;
let imageUrls = [];
let contentArray = [];
const DESTINATION_FOLDER = 'content/notion-docs';
const IMAGE_FOLDER = 'content/notion-docs/images/';

const { NOTION_TOKEN } = process.env;
const BLOCK_NAME = "Book";
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
    let string = '';
    if(pageblock.results && pageblock.results.length) {
        for(let i=0;i<pageblock.results.length;i++) {
            let obj = pageblock.results[i];
            if(obj.type == 'child_page') {
                await getBlockContent(obj.id,obj[obj.type].title);
            } else {
                
                if(obj[obj.type] && obj[obj.type] && obj[obj.type].text) {
                    for(let i=0;i<obj[obj.type].text.length;i++) {
                        let text = obj[obj.type].text[i];
                        if(obj[obj.type].text[i]['href']) {
                            string = string + '[' + obj[obj.type].text[i]['plain_text'] + ']';
                            string = string + '(' + obj[obj.type].text[i]['href'] + ')' + '\n';
                        } else {
                            if(obj.type == 'heading_1') {
                                string = string + '# ';
                            }
                            if(obj.type == 'heading_2') {
                                string = string + '## ';
                            }
                            if(obj.type == 'heading_3') {
                                string = string + '### ';
                            }
                            if(obj.type == 'heading_4') {
                                string = string + '#### ';
                            }
                            if(obj.type == 'heading_5') {
                                string = string + '##### ';
                            }
                            if(obj.type == 'heading_6') {
                                string = string + '###### ';
                            }
                            if(obj.type == 'bulleted_list_item') {
                                string = string + '* ';
                            }
                            string = string + obj[obj.type].text[i]['plain_text'] + '\n';
                        }
                        
                    }
                }
                if(obj.type == 'unsupported') {
                    if(obj.image && obj.image.url) {
                        string = string + '[]';
                        string = string + '(' + obj.image.url + ')' + '\n';
                        imageUrls.push({
                            base:name,
                            url:obj.image.url
                        });
                    }
                }
            }
        }
        contentArray.push({
            string:string,
            base:name
        })
        
    }

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
    octokit2 = github.getOctokit(GITHUB_TOKEN);
    notion = new Client({ auth: NOTION_TOKEN })
    const { context = {} } = github;
    console.log(`Deleting ${DESTINATION_FOLDER}`);
    fs.rmdirSync(DESTINATION_FOLDER, { recursive: true });

    console.log(`Creating ${DESTINATION_FOLDER}`);
    fs.mkdirSync(DESTINATION_FOLDER, {});
    getPageUpdates();
}
onStart()