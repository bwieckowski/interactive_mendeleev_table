

export const parserPeriodictTable = (elements) => {

    const parseTable = [];
    elements.forEach(element => {
        parseTable.push(element.symbol);
        parseTable.push(element.name);
        parseTable.push(element.atomicMass);
        parseTable.push(element.xpos);
        parseTable.push(element.ypos);
    });

    return parseTable;
}