import {MathExpression} from '../src/MathExpression.js';

describe('HtmlFormatter', () => {
    it('formatting: "1-2"', () => {
        expect(new MathExpression("1-2").getHtml()).toEqual('1&minus;2');
    });

    it('formatting: "1+2"', () => {
        expect(new MathExpression("1+2").getHtml()).toEqual('1&plus;2');
    });

    it('formatting: "1*2"', () => {
        expect(new MathExpression("1*2").getHtml()).toEqual('1&times;2');
    });

    it('formatting: "1^2"', () => {
        expect(new MathExpression("1^2").getHtml()).toEqual('1<sup>2</sup>');
    });

    it('formatting: "1/2"', () => {
        expect(new MathExpression("1/2").getHtml()).toEqual("<div class=\'frac\'><span>1</span><span class=\'symbol\'>/</span><span class=\'bottom\'>2</span></div>");
    });
});