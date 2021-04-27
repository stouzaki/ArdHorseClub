/** 初期表示*/
$(function () {
    setNo();
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