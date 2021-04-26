window.addEventListener('load', init);

/** 初期表示*/
function init(e) {
    setNo();
}

/** Noを降順にセットする*/
function setNo() {
    let elemNos = document.querySelectorAll(".no");
    let index = 0;
    for (let no = elemNos.length; 0 < no; no--) {
        const ele = elemNos[index];
        ele.textContent = `No.${no}`;
        index++;
    }
}