import getType from './getType';

export default function getRanges(input, highlight) {
    let type = getType(highlight);
    switch (type) {
        case 'array':
            return getArrayRanges(input, highlight);
        case 'function':
            return getFunctionRanges(input, highlight);
        case 'regexp':
            return getRegExpRanges(input, highlight);
        case 'string':
            return getStringRanges(input, highlight);
        case 'range':
            return getRangeRanges(input, highlight);
        case 'custom':
            return getCustomRanges(input, highlight);
        default:
            if (!highlight) {
                // do nothing for falsey values
                return [];
            } else {
                console.error('unrecognized highlight type');
            }
    }
}

function getArrayRanges (input, arr) {
    let ranges = arr.map(getRanges.bind(this, input));
    return Array.prototype.concat.apply([], ranges);
}

function getFunctionRanges(input, func) {
    return getRanges(input, func(input));
}

function getRegExpRanges(input, regex) {
    let ranges = [];
    let match;
    while (match = regex.exec(input), match !== null) {
        ranges.push([match.index, match.index + match[0].length]);
        if (!regex.global) {
            // non-global regexes do not increase lastIndex, causing an infinite loop,
            // but we can just break manually after the first match
            break;
        }
    }
    return ranges;
}

function getStringRanges(input, str) {
    let ranges = [];
    let inputLower = input.toLowerCase();
    let strLower = str.toLowerCase();
    let index = 0;
    while (index = inputLower.indexOf(strLower, index), index !== -1) {
        ranges.push([index, index + strLower.length]);
        index += strLower.length;
    }
    return ranges;
}

function getRangeRanges(input, range) {
    return [range];
}

function getCustomRanges(input, custom) {
    let ranges = getRanges(input, custom.highlight);
    if (custom.className) {
        ranges.forEach(function(range) {
            // persist class name as a property of the array
            if (range.className) {
                range.className = custom.className + ' ' + range.className;
            } else {
                range.className = custom.className;
            }
        });
    }
    return ranges;
}
