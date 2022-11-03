const mathFormatter = require('../mathFormatter');

test('formatting: "1+2"', () => {
    expect(new mathFormatter("1+2")).toEqual({"tree": ["1+2"]});
});

test('formatting: "1+(2/3)"', () => {
    expect(new mathFormatter("1+2")).toEqual({"tree": ["1", "+", ["2", "/", "3"]]});
});