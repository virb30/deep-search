const deepSearch = (options = [], term = '') => {
    const result = [];
    for (const item of options) {
        const {children,...rest} = item
        const itemChildren = deepSearch(children, term)
        const found = item.label.toLowerCase().includes(term.toLowerCase()) || Boolean(itemChildren)
        if (found) {
            result.push({...rest, children: itemChildren})
        }
    } 
    if (result.length === 0) {
        return undefined
    }
    return result;
}

module.exports = {
    deepSearch    
}