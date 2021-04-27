/** 初期表示*/
$(function () {
  // 今年のページを取得して表示する
  getSchedulePage(2021);

  // 年切替イベント
  $("#yearSelect").on("change", (e) => onChageYearSelect(e));
});

/** 年切替 */
function onChageYearSelect(e) {
  let year = $(e.currentTarget).val();
  getSchedulePage(year);
}

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
  let now = new Date();

  $.ajax({
    type: "GET",
    url: `./page/schedule/${year}.html?${now.getTime}_${now.getSeconds}`,
    dataType: "html",
    beforeSend: function () {
      let $main = $("#main");
      $main.html("Loading...");
    },
    success: function (data) {
      let $main = $("#main");
      $main.hide();
      $main.html("");
      $main.append(data);
      setNo();
      $main.fadeIn(1000);
    },
    error: function () {
      alert("エラー");
    },
  });
}
