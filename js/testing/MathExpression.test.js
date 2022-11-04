const MathExpression = require('../MathExpression.js');

test('formatting: "1-2"', () => {
    expect(new MathExpression("1-2").getJson()).toEqual('{"level":{"level":["1","-","2"],"brackets":"","error":""}}');
});

test('formatting: "1-2+(3-4)"', () => {
    expect(new MathExpression("1-2+(3-4)").getJson()).toEqual('{"level":{"level":["1","-","2","+",{"level":["3","-","4"],"brackets":"()","error":""}],"brackets":"","error":""}}');
});

test('formatting: "1-2+(3-4)+3"', () => {
    expect(new MathExpression("1-2+(3-4)+3").getJson()).toEqual('{"level":{"level":["1","-","2","+",{"level":["3","-","4"],"brackets":"()","error":""},"+","3"],"brackets":"","error":""}}');
});

test('formatting: "1-2(3-4)+3"', () => {
    expect(new MathExpression("1-2(3-4)+3").getJson()).toEqual('{"level":{"level":["1","-","2","*",{"level":["3","-","4"],"brackets":"()","error":""},"+","3"],"brackets":"","error":""}}');
});