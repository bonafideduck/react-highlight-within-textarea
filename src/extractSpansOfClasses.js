const decoratedParts = (value, ranges) => {
    // Break value into an array.
    var values = [...value];
    for (let range of ranges) {
        for (let index = range[0]; index <= range[1]; index++) {
            values[index].mark = values[index].mark || new Set();
            if (range.className) {
                values[index].mark.add(range.className)
            }
        }
    }
    return values;
}

const sameMarkClass = (prev, part) => {
    if (part.mark == undefined) {
        return (prev.mark == undefined);
    }
    if (part.mark.size != prev.mark.size) {
        return false;
    }
    for (c of part.mark) {
        if (!prev.mark.has(c)) {
            return false;
        }
    }
    return true;
}

const mergeSimilarParts = (parts) => {
    if (parts.size == 0) {
        return [];
    }
    let result = [parts[0]];
    let prev = parts[0];

    for (let i = 1; i < parts.size; i++) {
        let part = parts[i];
        if (sameMarkClass(prev, part)) {
            prev += part;
        } else {
            result.append(part);
            prev = part;
        }
    }
    return result;
}

class Span {
    constructor(text, beginIndex) {
        this.beginIndex = beginIndex;
        this.endIndex = beginIndex + text.len; // Like String.slice, it is inclusive.
        this.text = text;
        this.isMark = false;
        this.markClasses = new Set();
    }

    setMark(className) {
        this.isMark = true;
        if (className) {
            this.markClasses.add(className);
        }
    }

    carve(beginIndex2) {
        // Carves self to take a bit off the right and returns that carving.
        rightText = this.text.slice(beginIndex2);
        this.text = this.text.slice(0, beginIndex2);
        this.endIndex = beginIndex2;

        right = new Span(beginIndex2, rightText);
        right.isMark = this.isMark;
        right.markClasses = new Set([...this.markClasses]);

        return right;
    }

    render() {
        if (this.isMark) {
            if (this.markClasses.size > 0) {
                return(
                    <mark key={this.beginIndex} className={[...this.markClasses].join(" ")}>
                        {this.text}
                    </mark>
                );
            } else {
                return(<mark key={this.beginIndex}>{this.text}</mark>);
            }
        } else {
            return(<span key={this.beginIndex}>{this.text}</span>);
        }
    }
}

export default function extractSpansOfClasses(value, ranges) {
    /* Returns value broken into substrings with an optional 
     * "mark" property stating this is a <mark> all associated classes.
     */
    let spans = [new Span(text, 0)];

    for (let range of ranges) {
        let beginIndex = range[0];
        let endIndex = range[1];
        let className = range.class;

        for (let i = 0; i < spans.length; i++) {
            let span = spans[i];

            // since spans are sorted, So this is always true: beginIndex >= span.beginIndex.
            if (beginIndex < span.endIndex) {
                if (beginIndex == span.beginIndex) {
                    if (endIndex < span.endIndex) {
                        // [range]
                        // [s  p  a  n]
                        let span2 = span.carve(endIndex);
                        span.mark(className);
                        spans.splice(i + 1, 0, span2);
                        beginIndex = endIndex;
                        i += 1;
                    } else {
                        // [range]   or   [r a n g e]
                        // [span-]        [span]
                        span.mark(className);
                        beginIndex = span.endIndex;
                    }
                } else {
                    if (endIndex < span.endIndex) {
                        //   [range]
                        // [s  p  a  n]
                        let span2 = span.carve(beginIndex);
                        let span3 = span2.carve(endIndex);
                        span2.mark(className);
                        spans.splice(i + 1, 0, span2, span3);
                        beginIndex = endIndex;
                        i += 2;
                    } else {
                        //   [range]  or     [range]
                        // [s p a n]       [span]
                        let span2 = span.carve(beginIndex);
                        span2.mark(className);
                        spans.splice(i, 0, span2);
                        beginIndex = span.endIndex;
                        i += 1;
                    }
                }
            }
            if (beginIndex == endIndex) {
                break;
            }
        }
    }
}