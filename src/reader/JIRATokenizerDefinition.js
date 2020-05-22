export const JIRATokenizerDefinition = {
    "main": {
        "initial": true,
        "tokenName": "text",
        "42": { //*
            "targetStates": ["bold"],
            "tokenEnd": "text"
        },
        "95": { //_
            "targetStates": ["italic"],
            "tokenEnd": "text"
        },
        "45": { //-
            "targetStates": ["strike"],
            "tokenEnd": "text"
        },
        "126": { //~
            "targetStates": ["sub"],
            "tokenEnd": "text"
        },
        "94": { //^
            "targetStates": ["sup"],
            "tokenEnd": "text"
        },
        "43": { //+
            "targetStates": ["underline"],
            "tokenEnd": "text"
        },
        "123": { //{
            "targetStates": ["pre","paragraph1", "color1"]
        },
        "63": { //?
            "targetStates": ["citation"]
        },
        "10": { //NEW LINE
            "targetStates": ["newline"],
            "tokenEnd": "text"
        }
    },
    "newline": {
        "42": { //*
            "targetStates": ["ul"]
        },
        "35": { //#
            "targetStates": ["ol"]
        },
        "98": { //b
            "targetStates": ["block"]
        },
        "104": { //h
            "targetStates": ["heading"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "ul": {
        "tokenName": "ul",
        "append": -1,
        "32": { //SPACE
            "targetStates": ["main"],
            "tokenEnd": "ul",
            "append": true,
            "break": ["text", "bold"]
        },
        "9": { //TAB
            "targetStates": ["main"],
            "tokenEnd": "ul",
            "append": true,
            "break": ["text", "bold"]
        },
        "default": {
            "targetStates": ["main"],
            "break": "ul"
        }
    },
    "ol": {
        "tokenName": "ol",
        "append": -1,
        "32": { //SPACE
            "targetStates": ["main"],
            "tokenEnd": "ol",
            "append": true,
            "break": "text"
        },
        "9": { //TAB
            "targetStates": ["main"],
            "tokenEnd": "ol",
            "append": true,
            "break": "text"
        },
        "default": {
            "targetStates": ["main"],
            "break": "ol"
        }
    },
    "block": {
        "113": { //q
            "targetStates": ["block_2"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "block_2": {
        "46": { //.
            "targetStates": ["block_3"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "block_3": {
        "tokenName": "block",
        "append": -4,
        "32": { //SPACE
            "targetStates": ["main"],
            "tokenEnd": "block",
            "append": true,
            "break": "text"
        },
        "9": { //TAB
            "targetStates": ["main"],
            "tokenEnd": "block",
            "append": true,
            "break": "text"
        },
        "default": {
            "targetStates": ["main"],
            "break": "block"
        }
    },
    "heading": {
        "49": { //1
            "targetStates": ["heading_1_1"]
        },
        "50": { //2
            "targetStates": ["heading_2_1"]
        },
        "51": { //3
            "targetStates": ["heading_3_1"]
        },
        "52": { //4
            "targetStates": ["heading_4_1"]
        },
        "53": { //5
            "targetStates": ["heading_5_1"]
        },
        "54": { //6
            "targetStates": ["heading_6_1"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "heading_1_1": {
        "46": { //.
            "targetStates": ["heading_1_2"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "heading_1_2": {
        "tokenName": "h1",
        "append": -4,
        "32": { //SPACE
            "targetStates": ["main"],
            "tokenEnd": "h1",
            "append": true,
            "break": "text"
        },
        "9": { //TAB
            "targetStates": ["main"],
            "tokenEnd": "h1",
            "append": true,
            "break": "text"
        },
        "default": {
            "targetStates": ["main"],
            "break": "h1"
        }
    },
    "heading_2_1": {
        "46": { //.
            "targetStates": ["heading_2_2"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "heading_2_2": {
        "tokenName": "h2",
        "append": -4,
        "32": { //SPACE
            "targetStates": ["main"],
            "tokenEnd": "h2",
            "append": true,
            "break": "text"
        },
        "9": { //TAB
            "targetStates": ["main"],
            "tokenEnd": "h2",
            "append": true,
            "break": "text"
        },
        "default": {
            "targetStates": ["main"],
            "break": "h2"
        }
    },
    "heading_3_1": {
        "46": { //.
            "targetStates": ["heading_3_2"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "heading_3_2": {
        "tokenName": "h3",
        "append": -4,
        "32": { //SPACE
            "targetStates": ["main"],
            "tokenEnd": "h3",
            "append": true,
            "break": "text"
        },
        "9": { //TAB
            "targetStates": ["main"],
            "tokenEnd": "h3",
            "append": true,
            "break": "text"
        },
        "default": {
            "targetStates": ["main"],
            "break": "h3"
        }
    },
    "heading_4_1": {
        "46": { //.
            "targetStates": ["heading_4_2"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "heading_4_2": {
        "tokenName": "h4",
        "append": -4,
        "32": { //SPACE
            "targetStates": ["main"],
            "tokenEnd": "h4",
            "append": true,
            "break": "text"
        },
        "9": { //TAB
            "targetStates": ["main"],
            "tokenEnd": "h4",
            "append": true,
            "break": "text"
        },
        "default": {
            "targetStates": ["main"],
            "break": "h4"
        }
    },
    "heading_5_1": {
        "46": { //.
            "targetStates": ["heading_5_2"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "heading_5_2": {
        "tokenName": "h5",
        "append": -4,
        "32": { //SPACE
            "targetStates": ["main"],
            "tokenEnd": "h5",
            "append": true,
            "break": "text"
        },
        "9": { //TAB
            "targetStates": ["main"],
            "tokenEnd": "h5",
            "append": true,
            "break": "text"
        },
        "default": {
            "targetStates": ["main"],
            "break": "h5"
        }
    },
    "heading_6_1": {
        "46": { //.
            "targetStates": ["heading_6_2"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "heading_6_2": {
        "tokenName": "h6",
        "append": -4,
        "32": { //SPACE
            "targetStates": ["main"],
            "tokenEnd": "h6",
            "append": true,
            "break": "text"
        },
        "9": { //TAB
            "targetStates": ["main"],
            "tokenEnd": "h6",
            "append": true,
            "break": "text"
        },
        "default": {
            "targetStates": ["main"],
            "break": "h6"
        }
    },
    "bold": {
        "tokenName": "bold",
        "42": { //* 
            "targetStates": ["main"],
            "tokenEnd": "bold",
            "break": "text",
            "append": true
        }
    },
    "italic": {
        "tokenName": "italic",
        "95": { //_
            "targetStates": ["main"],
            "tokenEnd": "italic",
            "break": "text",
            "append": true
        }
    },
    "strike": {
        "tokenName": "strike",
        "45": { //-
            "targetStates": ["main"],
            "tokenEnd": "strike",
            "break": "text",
            "append": true
        }
    },
    "sub": {
        "tokenName": "sub",
        "126": { //~
            "targetStates": ["main"],
            "tokenEnd": "sub",
            "break": "text",
            "append": true
        }
    },
    "sup": {
        "tokenName": "sup",
        "94": { //^
            "targetStates": ["main"],
            "tokenEnd": "sup",
            "break": "text",
            "append": true
        }
    },
    "underline": {
        "tokenName": "underline",
        "43": { //+
            "targetStates": ["main"],
            "tokenEnd": "underline",
            "break": "text",
            "append": true
        }
    },
    "citation": {
        "63": { //?
            "targetStates": ["citation_2"],
            "tokenEnd": "text",
            "append": -1
        },
        "default": {
            "targetStates": ["main"],
            "return": 1
        }
    },
    "citation_2": {
        "tokenName": "citation",
        "append": -1,
        "63": { //?
            "targetStates": ["citation_3"]
        }
    },
    "citation_3": {
        "63": { //?
            "targetStates": ["main"],
            "tokenEnd": "citation",
            "append": true
        },
        "default": {
            "targetStates": ["citation_2"]
        }
    },
    "pre": {
        "123": { //{
            "targetStates": ["pre_2"],
            "tokenEnd": "text",
            "append": -1
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "pre_2": {
        "tokenName": "pre",
        "append": -1,
        "125": { //}
            "targetStates": ["pre_3"]
        }
    },
    "pre_3": {
        "125": { //}
            "targetStates": ["main"],
            "tokenEnd": "pre",
            "append": true
        },
        "default": {
            "targetStates": ["pre_2"]
        }
    },
    "paragraph1": {
        "113": { //q
            "targetStates": ["paragraph2"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "paragraph2": {
        "117": { //u
            "targetStates": ["paragraph3"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "paragraph3": {
        "111": { //o
            "targetStates": ["paragraph4"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "paragraph4": {
        "116": { //t
            "targetStates": ["paragraph5"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "paragraph5": {
        "101": { //e
            "targetStates": ["paragraph6"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "paragraph6": {
        "125": { //}
            "targetStates": ["paragraph7", "main"],
            "break": "text"
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "paragraph7": {
        "tokenName": "paragraph",
        "append": -6,
        "123": { //{
            "targetStates": ["paragraph8"]
        }
    },
    "paragraph8": {
        "113": { //q
            "targetStates": ["paragraph9"]
        },
        "default": {
            "targetStates": ["paragraph7"]
        }
    },
    "paragraph9": {
        "117": { //u
            "targetStates": ["paragraph10"]
        },
        "default": {
            "targetStates": ["paragraph7"]
        }
    },
    "paragraph10": {
        "111": { //o
            "targetStates": ["paragraph11"]
        },
        "default": {
            "targetStates": ["paragraph7"]
        }
    },
    "paragraph11": {
        "116": { //t
            "targetStates": ["paragraph12"]
        },
        "default": {
            "targetStates": ["paragraph7"]
        }
    },
    "paragraph12": {
        "101": { //e
            "targetStates": ["paragraph13"]
        },
        "default": {
            "targetStates": ["paragraph7"]
        }
    },
    "paragraph13": {
        "125": { //}
            "targetStates": ["main"],
            "tokenEnd": "paragraph",
            "append": true,
            "break": "text"
        },
        "default": {
            "targetStates": ["paragraph7"]
        }
    },
    "color1": {
        "99": { //c
            "targetStates": ["color2"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "color2": {
        "111": { //o
            "targetStates": ["color3"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "color3": {
        "108": { //l
            "targetStates": ["color4"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "color4": {
        "111": { //o
            "targetStates": ["color5"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "color5": {
        "114": { //r
            "targetStates": ["color6"]
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "color6": {
        "125": { //}
            "targetStates": ["color7", "main"],
            "break": "text"
        },
        "58": { //:
            "targetStates": ["color7", "main"],
            "break": "text"
        },
        "default": {
            "targetStates": ["main"]
        }
    },
    "color7": {
        "tokenName": "color",
        "append": -6,
        "123": { //{
            "targetStates": ["color8"]
        }
    },
    "color8": {
        "99": { //c
            "targetStates": ["color9"]
        },
        "default": {
            "targetStates": ["color7"]
        }
    },
    "color9": {
        "111": { //o
            "targetStates": ["color10"]
        },
        "default": {
            "targetStates": ["color7"]
        }
    },
    "color10": {
        "108": { //l
            "targetStates": ["color11"]
        },
        "default": {
            "targetStates": ["color7"]
        }
    },
    "color11": {
        "111": { //o
            "targetStates": ["color12"]
        },
        "default": {
            "targetStates": ["color7"]
        }
    },
    "color12": {
        "114": { //r
            "targetStates": ["color13"]
        },
        "default": {
            "targetStates": ["color7"]
        }
    },
    "color13": {
        "125": { //}
            "targetStates": ["main"],
            "tokenEnd": "color",
            "append": true,
            "break": "text"
        },
        "default": {
            "targetStates": ["color7"]
        }
    },
}