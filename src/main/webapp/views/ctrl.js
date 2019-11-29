var localUser = "1";
var showID = 0;
var userArray = new Array();
var articleArray = new Array();
var lastID =0;
var Userid = prompt("请输入你的用户id！");
$("#user_name").val();
Search = function(){
    jQuery.getJSON(
        "http://localhost:8080/timeline/user/username",
        {
            "id": Userid
        },
        function (data) {
            console.log(data);
            $("#user_name").val(data.nickname);
        }

    );

    $.ajax({
        type: "POST",
        data: JSON.stringify({
            max_num: parseInt("5"),
            front_article_id: parseInt("0")
        }),
        datatype: "json",
        contentType: 'application/json;charset=utf-8',
        url: "http://localhost:8080/timeline/article/GetNewArticle",
        success: function (data) {
            if (data.code == "205") {
                var articles = data.data;
                for (var i = 0; i < articles.length; i++) {
                    var itemHtml =
                        '<div class="SingleCellFormat">\n' +
                        '<table align="center" width = "100%">\n' +
                        '<tr>\n' +
                        '<td colspan="4" align="center">' + articles[i].content + '</td>\n' +
                        '</tr>\n';
                    if (articles[i].imageURL != "")
                        itemHtml += '<tr>\n' +
                            '<td colspan="4" align="center">\n' +
                            '<img src="' + articles[i].imageURL + '" alt="not found"/>\n' +
                            '</td>\n' +
                            '</tr>\n';
                    itemHtml += '<tr>\n' +
                        '<td width="40%"  class="timeFormat">' + articles[i].timeStamp + '</td>\n' +
                        '<td width="20%"  ></td>\n' +
                        '<td width="30%"  class="nicknameFormat">' + articles[i].nickname + '</td>\n' +
                        '<td>\n' +
                        '<a class="feat001" myID=' + showID + ' href="javascript:void(0);" id="delete-btn" onclick="deleteOne()">删除</a>\n' +
                        '</td>\n' +
                        '</tr>\n' +
                        '</table>\n' +
                        '</div>';
                    $("#contentList").append(itemHtml);
                    userArray[showID] = articles[i].userID;
                    articleArray[showID] = articles[i].articleID;
                    showID++;
                    lastID = articles[i].articleID;
                }

            } else {
                alert("Search error");
            }
        },
        error: function (xhr, status, err) {
        }
    })
}
loadMore = function () {
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            max_num: parseInt("5"),
            tail_article_id: lastID
        }),
        datatype: "json",
        contentType: 'application/json;charset=utf-8',
        url: "http://localhost:8080/timeline/article/GetOldArticle",
        success: function (data) {
            if (data.code == "205") {
                appendHtml(data.data);
            }
        },
        error: function (xhr, status, err) {
        }
    })

    var appendHtml = function (articles) {
        if (articles.length == 0) {
            return false;
        }
        for (var i = 0; i < articles.length; i++) {
            var itemHtml =
                '<div class="SingleCellFormat">\n' +
                '<table align="center" width = "100%">\n' +
                '<tr>\n' +
                '<td colspan="4" align="center">' + articles[i].content + '</td>\n' +
                '</tr>\n';
            if (articles[i].imageURL != "")
                itemHtml += '<tr>\n' +
                    '<td colspan="4" align="center">\n' +
                    '<img src="' + articles[i].imageURL + '" alt="not found"/>\n' +
                    '</td>\n' +
                    '</tr>\n';
            itemHtml += '<tr>\n' +
                '<td width="40%"  class="timeFormat">' + articles[i].timeStamp + '</td>\n' +
                '<td width="20%"  ></td>\n' +
                '<td width="30%"  class="nicknameFormat">' + articles[i].nickname + '</td>\n' +
                '<td>\n' +
                '<a class="feat001" myID=' + showID + ' href="javascript:void(0);" id="delete-btn" onclick="deleteOne()">删除</a>\n' +
                '</td>\n' +
                '</tr>\n' +
                '</table>\n' +
                '</div>';
            lastID = articles[i].articleID;
            userArray[showID] = articles[i].userID;
            articleArray[showID] = articles[i].articleID;
            showID++;
            $("#contentList").append(itemHtml);
            $(".detail").animate({opacity: 1}, 1000);
        }
    }

}
deleteOne = function () {
    var targ
    if (!e) var e = window.event
    if (e.target) targ = e.target
    else if (e.srcElement) targ = e.srcElement
    var tname
    tname = targ.tagName
    if (tname != "A")
        return false;
    var theID = targ.getAttribute("myID")
    if (userArray[theID] == "")
        return false;
    if (userArray[theID] != localUser) {
        console.log(userArray[theID])
        alert("Not Allowed");
        return false;
    }
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            articleID: articleArray[theID]
        }),
        datatype: "json",
        contentType: 'application/json;charset=utf-8',
        url: "http://localhost:8080/timeline/article/ArticleDelete",
        success: function (data) {
            console.log(data)
            if (data.code == "205") {
                alert("删除成功！");
                window.location.href = "http://localhost:8080/timeline/views/index.html";
            } else {
                alert("删除失败，请重新操作");
            }
        },
        error: function (xhr, status, err) {
        }
    })

}