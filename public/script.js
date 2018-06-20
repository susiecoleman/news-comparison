$("#searchTerm").keypress(function(event) {
    if (event.which == 13) {
        getSearchValue();
    }
});

function getSearchValue() {
    searchTerm = $("#searchTerm").val();
    $("#searchTerm").val("");
    $("#sources").empty();
    $("#sources").append(
        '<h1 class="grid--box-3_column_span" id="sources">Sources:</h1>' +
        '<h1 class="grid--box-3_column_span">Most relevant articles on ' + searchTerm + '</h1>'
    );
    getArticle(searchTerm, "daily-mail");
    getArticle(searchTerm, "the-guardian-uk");
    getArticle(searchTerm, "bbc-news");
    getArticle(searchTerm, "independent");
    getArticle(searchTerm, "metro");
    getArticle(searchTerm, "mirror");
    getArticle(searchTerm, "the-telegraph");
    getArticle(searchTerm, "the-economist");
    getArticle(searchTerm, "financial-times");
}

function getArticle(searchTerm, source) {
    $.post(
        '/article',
        JSON.stringify({
          'searchTerm': searchTerm,
          'source': source
        })
    ).then(function(data){
        $("#" + source + "_headline").text(data.headline);
        $("#" + source + "_link").attr("href", data.url);
        $("#" + source + "_image").attr("src", data.image);
    })
}
