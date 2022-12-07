const _ = require('lodash');

const deepSearch = (options = [], term = '') => {

    const flattenedOptions = flattenArray(options);
    const filteredOptions = flattenedOptions.filter((item) => item.label.toLowerCase().includes(term.toLowerCase()));
    const result = flattenedOptions.filter((item) => {
        // TODO: não está correto
        return filteredOptions.some(option => option.id === item.id || (option.parent_id === item.id && item.depth === option.depth - 1))
    })
    return unflattenArray(result);
}

const unflattenArray = (flattenArray = []) => {
    const orderedArray = flattenArray.sort((a, b) => a.depth - b.depth);
    let option = null
    const result = []
    // TODO: refatorar
    do {
        option = orderedArray.pop()
        if (!option) {
            break;
        }
        const { depth, ...restOption } = option
        if (option && option.parent_id === 0) {
            const exists = result.find(item => item.id === option.id)
            if (!exists) {
                result.push({ ...restOption })
            }
        } else {
            let parent = orderedArray.find(item => item.id === option.parent_id && item.depth === option.depth - 1)
            if (parent) {
                const children = parent.children || [];
                parent = {
                    ...parent,
                    children: [...children, { ...restOption }]
                }
                const { depth, ...rest } = parent
                result.push({ ...rest })
            }
        }
    } while (option)
    return result
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