

const isPalindrome = function(theWord)
{


    return theWord.split("").reverse().join("")==theWord;

}

console.log(isPalindrome("malayalam"))
console.log(isPalindrome("malayalams"))


module.exports= {isPalindrome};