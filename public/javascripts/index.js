function addQuestionToDatabse(title,correct,r1,r2,r3,cat)
{
    var url = "/addQuestion"
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, true ); // false for synchronous request
    xmlHttp.setRequestHeader("title",title);
    xmlHttp.setRequestHeader("correct",correct);
    xmlHttp.setRequestHeader("wrong1",r1);
    xmlHttp.setRequestHeader("wrong2",r2);
    xmlHttp.setRequestHeader("wrong3",r3);
    xmlHttp.setRequestHeader("category",cat);
    xmlHttp.send();
    return xmlHttp.responseText;
}