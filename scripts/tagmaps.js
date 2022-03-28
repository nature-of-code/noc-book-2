let map =  {
    'callouts': {
        //quote
        '🔑': [
            {
                tag:'blockquote',
                attributes: {
                    'data-type':"epigraph"
                }
            }
        ],
        //note
        '📒':[
            {
                tag:'div',
                attributes: {
                    'data-type':"note"
                }
            }
        ],
        //example heading 
        '🔍': [
            {
                tag:'div',
                attributes: {
                    'data-type':"example"
                }
            },
            {
                tag:'h5'
            }
        ],
        //p5 sketch
        '💬': [
            {
                tag:'figure',
                attributes: {
                    'class':'screenshot',
                    'data-p5-sketch':'$p5-sketch'
                }
            },
            {
                tag:'img',
                attributes: {
                    'alt':'',
                    'src':'$img-link'
                }
            },
            {
                tag:'figcaption',
                attributes: {
                }
            }
        ],
        //exercise 
        '✏️': [
            {
                tag:'div',
                attributes: {
                    'data-type':'exercise'
                }
            },
            {
                tag:'h5'
            }
        ]
    },
    'embed' : {
        image: [
            {
                tag:'figure',
                attributes: {
                }
            },
            {
                tag:'img',
                attributes: {
                    'alt':'$alttext',
                    'src':'$link'
                }
            }
        ]
    },
    'text': {
        paragraph: [
            {
                tag:'p',
                attributes: {
                }
            }
        ],
        heading_1:[
            {
                tag:'h1',
                attributes: {
                }
            }
        ],
        heading_2:[
            {
                tag:'h2',
                attributes: {
                }
            }
        ],
        heading_3:[
            {
                tag:'h3',
                attributes: {
                }
            }
        ],
        bulleted_list_item:[
            {
                tag:'ul'
            },
            {
                tag:'li'
            }
        ]
    },
    'code' : {
        javascript: [
            {
                tag:'pre',
                attributes: {
                    'data-code-language':"javascript",
                    'data-type':"programlisting",
                    'class':"codesplit",
                }
            }
        ]
        
    },
    'equation': {
        basic:[
            {
                tag:'div',
                attributes: {
                    'data-type':"equation"
                }
            }
        ]
    }
}

module.exports = map;

//figure out section s
//Notion mark for section start 
//ids 
