const _ = require('lodash');

const deepSearch = (options = [], term = '') => {
    const filtered = options.filter((item) => {
        item.children = deepSearch(item.children, term)
        return item.label.toLowerCase().includes(term.toLowerCase()) || !_.isEmpty(item.children)
    })
    return filtered




    // const flattenedOptions = flattenArray(options);
    // const filteredOptions = flattenedOptions.filter((item) => item.label.toLowerCase().includes(term.toLowerCase()));
    // return filteredOptions.map((option) => {
    //     return restoreHierarchy(option, flattenedOptions);
    // });
}

const restoreHierarchy = (option, original = []) => {
    if (!option) {
        return null
    }

    if (option.parent_id === 0) {
        return option
    }

    const parent = original.find(item => item.id === option.parent_id && item.depth === option.depth - 1)
    return restoreHierarchy(parent, original)
}

const flattenArray = (source = [], result = [], depth = 0) => {
    for (item of source) {
        const { children, ...rest } = item
        result.push({ ...rest, depth });
        if (children) {
            flattenArray(children, result, depth + 1)
        }
    }
    return result
}

module.exports = {
    deepSearch,
    flattenArray
}