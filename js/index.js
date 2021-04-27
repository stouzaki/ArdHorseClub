/** 初期表示*/
$(function () {
    getSchedulePage(2021);
});


/** Noを降順にセットする*/
function setNo() {
    let elemNos = $(".no");
    let index = 0;
    for (let no = elemNos.length; 0 < no; no--) {
        $(elemNos[index]).html(`No.${no}`);
        index++;
    }
}

/** スケジュールページを取得 */
function getSchedulePage(year) {
    $.ajax({
        type: 'GET',
        url: `./page/schedule/${year}.html`,
        dataType: 'html',
        success: function (data) {
            let $main = $('#main');
            $main.html("");
            $('#main').append(data);
            setNo();
        },
        error: function () {
            alert('問題がありました。');
        }
    });
}