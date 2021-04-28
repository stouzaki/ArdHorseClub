// スケジュールページをここに溜め込む
var htmlYearPage = "";

/** 初期表示 */
$(function () {
  // 今年のページを取得して表示する
  let nowYear = (new Date()).getFullYear();
  getSchedulePages(nowYear);

  // 年切替イベント
  $("#yearSelect").on("change", (e) => onChageYearSelect(e));
});

/** 年切替 */
function onChageYearSelect(e) {
  let value = $(e.currentTarget).val();
  getSchedulePages(value);
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

/** 選択された年を取得する */
function getSelectedYears(value) {
  let years = new Array();

  // ALLが選択された場合はSelectから全ての年を取得する
  if (value === "ALL") {
    $("#yearSelect option").each((index, elem) => {
      let year = $(elem).val();
      if (year === "ALL") { return; }
      years.push(year);
    });
  } else {
    years.push(value);
  }

  return years;
}

/** スケジュールページを取得して表示する */
function getSchedulePages(value) {

  // スケジュールページをクリア
  htmlYearPage = "";

  // Loading中の表示にする
  let $main = $("#main");
  $main.html("Loading...");

  // 選択された年を取得する
  let years = getSelectedYears(value);

  // 順番制御用Deferredオブジェクト
  let d = new $.Deferred();
  let p = d.promise();

  // 各年度の取得を登録
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    p = p.then(() => getSchedulePage(year));
  }

  // 全て取得した後でスケジュールページを表示するよう登録
  p = p.then(() => displaySchedulePage());

  // 登録順に実行する
  d.resolve();
}

/** 取得済みのスケジュールページを表示する */
function displaySchedulePage() {

  // 完了を知らせるためにDeferredオブジェクトを生成する
  let deferred = new $.Deferred();

  // 表示
  let $main = $("#main");
  $main.hide();
  $main.html("");
  $main.append(htmlYearPage);
  setNo();
  $main.fadeIn(1000);

  // 完了通知 
  deferred.resolve();

  // 順番登録用にpromiseを返却する
  return deferred.promise();
}

/** スケジュールページを取得 */
function getSchedulePage(year) {

  // 完了を知らせるためにDeferredオブジェクトを生成しそれを返す
  let deferred = new $.Deferred();

  // キャッシュ対策用にリクエストに日付を付けてみる（効果は不明）
  let now = new Date();
  let addParam = `${now.getTime}_${now.getSeconds}`;

  $.ajax({
    type: "GET",
    url: `./page/schedule/${year}.html?${addParam}`,
    dataType: "html",
    success: function (data) {
      // 取得したhtmlを溜め込む
      htmlYearPage += data;
    },
    error: function () {
      alert("何故かエラーが発生");
    },
    complete: function () {
      // 完了通知
      deferred.resolve();
    }
  });

  // 順番登録用にpromiseを返却する
  return deferred.promise();
}
