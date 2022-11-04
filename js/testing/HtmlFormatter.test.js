// Testing HtmlFormatter trought MathExpression that invoque HtmlFormatter instance.

const MathExpression = require('../MathExpression.js');

describe('HtmlFormatter', () => {
    test('formatting: "1-2"', () => {
        expect(new MathExpression("1-2").getHtml()).toEqual('1&minus;2');
    });

    test('formatting: "1+2"', () => {
        expect(new MathExpression("1+2").getHtml()).toEqual('1&plus;2');
    });

    test('formatting: "1*2"', () => {
        expect(new MathExpression("1*2").getHtml()).toEqual('1&times;2');
    });

    test('formatting: "1^2"', () => {
        expect(new MathExpression("1^2").getHtml()).toEqual('1<sup>2</sup>');
    });

    test('formatting: "1/2"', () => {
        expect(new MathExpression("1/2").getHtml()).toEqual("<div class=\'frac\'><span>1</span><span class=\'symbol\'>/</span><span class=\'bottom\'>2</span></div>");
    });
});