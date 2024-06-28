function ronsbullettime(sectiontext) {
    const lines = sectiontext.split("\n").filter(line => line.trim() !== "");
    var processedlines = []
    var bulletarray = []
    function findnextbullettype(currentbullettype, currentline) {
    // Assuming the function returns the current bullet type for simplicity.
    return currentbullettype; 
}
    for (let i = 0; i < lines.length; i++) {
        var currentline = lines[i].trim();
        var testnextline = lines[i + 1];
        if (testnextline) {
            var nextline = testnextline.trim()
        }
        var startingbullet = false
        var liststyle
        switch (true) {
            case currentline.startsWith('A. '):
                startingbullet = true
                bulletarray.push('upper-alpha')
                liststyle = 'upper-alpha'
                break;
            case currentline.startsWith('a. '):
                startingbullet = true
                bulletarray.push('lower-alpha')
                liststyle = 'lower-alpha'
                break;      
       
            case currentline.startsWith('1. '):
                startingbullet = true
                bulletarray.push('number.')
                liststyle = 'decimal'
                break;
            case currentline.startsWith('1) '):
                startingbullet = true
                bulletarray.push('number)')
                liststyle = 'decimal'
                break;
            default:
                break;
        }
        if (testnextline) {
            var nextlinestartingbullet = false
            switch (true) {
                case nextline.startsWith('A. '):
                    nextlinestartingbullet = true
                    break;
                case nextline.startsWith('a. '):
                    nextlinestartingbullet = true
                    break;      
      
                case nextline.startsWith('1. '):
                    nextlinestartingbullet = true
                    break;
                case nextline.startsWith('1) '):
                    nextlinestartingbullet = true
                    break;
                default:
                    break;
            }
            var nextbullettype = null
            if (/^[A-Z]\. /.test(nextline)) {
                // Next line starts with an uppercase letter followed by a dot
                nextbullettype = 'upper-alpha'
            } else if (/^[0-9]+\./.test(nextline)) {
                // Next line starts with a number followed by a dot
                nextbullettype = 'number.'
            } else if (/^[a-z]\. /.test(nextline)) {
                // Next line starts with a lowercase letter followed by a dot
                nextbullettype = 'lower-alpha'
            }else if (/^[0-9]+\)/.test(nextline)) {
                // Next line starts with a number followed by a parenthesis
                nextbullettype = 'number)'
            }
        }
        var currentbullettype = bulletarray[bulletarray.length - 1];
        //nextbullettype, somehow. 
        //if nextbullettype == bulletarray[bulletarray.length - 2], close one. keep going till you get a match?
        //maybe instead, if nextbulletype is not in bullet array, open tag, if it is, close until you hit that index?
        if (testnextline) {
            var nextbullet = findnextbullettype(currentbullettype, currentline)
        }
        if (bulletarray.length > 0) {
            currentline = currentline.replace(/^([A-Za-z]\. |[0-9]+[.)] )/, '');
            currentline = `<li>${currentline}</li>`
        }
        if (startingbullet == true) {
            currentline = `<ol style="list-style-type: ${liststyle}">${currentline}`
        }
        if ((!nextline.startsWith(nextbullet)) && bulletarray.length > 0) {
            // currentline = `${currentline}</ol> (looking for "${nextbullet}", instead got "${nextline.substring(0, 3)}")`
            //
            var regex = /^([A-Za-z]\. |[0-9]+[.)] )/;
            if (regex.test(nextline.substring(0, 3))) {
                if (bulletarray.includes(nextbullettype)) {
                    //close until you hit the match
                    var closeindex = bulletarray.indexOf(nextbullettype)
                    for (let j = bulletarray.length - 1; j > closeindex; j--) {
                        // currentline = `${currentline}</ol>(close ${j})`
                        currentline = `${currentline}</ol>`
                        bulletarray.pop()
                    }
                } else {
                    // console.log('-------------------------------')
                    // console.log(`${nextbullettype} -- ${currentline}`)
                }
            } else {
                bulletarray.pop()
                currentline = `${currentline}</ol>`
            }
        }
        if (!testnextline) {
            currentline = `${currentline}</ol>`
            for (let j = bulletarray.length; j > closeindex; j--) {
                // currentline = `${currentline}</ol>(close ${j})`
                currentline = `${currentline}</ol>`
                bulletarray.pop()
            }
            processedlines.push(currentline);
            var processedtext = processedlines.join("\n");
            return processedtext;
        }
        // console.log(bulletarray)
        processedlines.push(currentline);
    }
}


//TESTS

const testCases = [
    "A. Item 1\na. Item 2\n1. Item 3\n1) Item 4\na) Item 5",
    "a) First item\na) Second item\na) Third item",
    "A. Start upper alpha\n1. Start number\na) New bullet support",
    "1) Numbered item\na) Lower alpha with parenthesis",
];

testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}:\nInput:\n${testCase}\nOutput:\n${ronsbullettime(testCase)}\n`);
});