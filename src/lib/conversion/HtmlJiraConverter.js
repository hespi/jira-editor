import MarkupConverter from "./MarkupConverter";
import BoldConverter from "./BoldConverter";
import BlockQuoteConverter from "./BlockQuoteConverter";
import CitationConverter from "./CitationConverter";
import ColorConverter from "./ColorConverter";
import Heading1Converter from "./Heading1Converter";
import Heading2Converter from "./Heading2Converter";
import Heading3Converter from "./Heading3Converter";
import Heading4Converter from "./Heading4Converter";
import Heading5Converter from "./Heading5Converter";
import Heading6Converter from "./Heading6Converter";
import ItalicsConverter from "./ItalicsConverter";
import OrderedListConverter from "./OrderedListConverter";
import PreformattedConverter from "./PreformattedConverter";
import StrikeThroughConverter from "./StrikeThroughConverter";
import SubscriptConverter from "./SubscriptConverter";
import SuperscriptConverter from "./SuperscriptConverter";
import UnderlineConverter from "./UnderlineConverter";
import UnorderedListConverter from "./UnorderedListConverter";

export default class HtmlJiraConverter {

    /** PROPERTIES */
    _htmlConverters = {};

    /** CONSTRUCTORS */

    constructor() {
        this._initialize();
    }

    /** METHODS */

    getJIRAMarkup = (HTMLElement) => {
        this._validateHtmlElement(HTMLElement);
        return this._convertHtmlElementToJiraMarkup(HTMLElement);
    }

    addHtmlConverter = (markupConverter) => {
        this._validateMarkupConverter(markupConverter);
        this._htmlConverters[markupConverter.tagName] = markupConverter;
    }

    addHtmlConverterList = (markupConverter) => {
        if (!!markupConverter && Array.isArray(markupConverter)) {
            markupConverter.forEach(converter => {
                this.addHtmlConverter(converter);
            });
        }
    }

    /** FUNCTIONS */

    _initialize = () => {
        
        this.addHtmlConverterList([
            new BlockQuoteConverter(),
            new BoldConverter(),
            new CitationConverter(),
            new ColorConverter(),
            new Heading1Converter(),
            new Heading2Converter(),
            new Heading3Converter(),
            new Heading4Converter(),
            new Heading5Converter(),
            new Heading6Converter(),
            new ItalicsConverter(),
            new OrderedListConverter(),
            new PreformattedConverter(),
            new StrikeThroughConverter(),
            new SubscriptConverter(),
            new SuperscriptConverter(),
            new UnderlineConverter(),
            new UnorderedListConverter()
        ]);
    }

    _validateHtmlElement = (HTMLElement) => {
        if (!!!HTMLElement) {
            throw "Root element is required";
        }
    }

    _validateMarkupConverter = (markupConverter) => {
        if (!!!markupConverter)
        {
            throw "Markup converter is required";
        }
        if (!!!markupConverter.getJIRAMarkup || typeof(markupConverter.getJIRAMarkup) !== "function")
        {
            throw "Markup converter must inherit from MarkupConverter to implement 'getJIRAMarkup'";
        }
    }

    _convertHtmlElementToJiraMarkup = (HTMLElement) => {
        var listElements = ["ul","ol"];
        let elementText = "";

        if (!!HTMLElement && !!HTMLElement.childNodes && !!HTMLElement.childNodes.length) {
            
            for(let ix = 0; ix < HTMLElement.childNodes.length; ix++) {
                elementText += this._convertHtmlElementToJiraMarkup(HTMLElement.childNodes[ix]) || "";
            }
        }

        if (!!HTMLElement.tagName && listElements.indexOf(HTMLElement.tagName.toLowerCase()) === -1) {
            HTMLElement.textContent = elementText;
        }
        
        return this._doConvertHtmlElementToJiraMarkup(HTMLElement);
    }

    _doConvertHtmlElementToJiraMarkup = (HTMLElement) => {
        return (this._existsElementConverter(HTMLElement)) ? this._getJIRAMarkup(HTMLElement) : this._getElementText(HTMLElement);
    }

    _existsElementConverter = (HTMLElement) => {
        return !!HTMLElement.tagName && this._htmlConverters.hasOwnProperty(HTMLElement.tagName.toLowerCase());
    }

    _getJIRAMarkup = (HTMLElement) => {
        return this._htmlConverters[HTMLElement.tagName.toLowerCase()].getJIRAMarkup(HTMLElement);
    }

    _getElementText = (HTMLElement) => {
        return !!HTMLElement.textContent ? HTMLElement.textContent : HTMLElement.innerHTML;
    }
}