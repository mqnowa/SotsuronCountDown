var getUrlParams = function() {
    return window.location.search.substring(1).split('&').reduce(function(result, query) { var pair = query.split('='); result[pair[0]] = decodeURI(pair[1]); return result; }, {});
}

function main() {
    const parms = location.search.substr(1).split('&').reduce((p, c) => {
        const cs = c.split('=');
        return Object.assign(p, { [cs[0]]: cs[1] })
    }, {});
    console.log(parms.bdl)
    const BACH_DEAD_LINE = new Date((parms.bdl) ? decodeURIComponent(parms.bdl) : "2025-01-31T16:00:00+09:00").getTime();
    const MAST_DEAD_LINE = new Date((parms.mdl) ? decodeURIComponent(parms.mdl) : "2025-01-30T16:00:00+09:00").getTime();
    const BACH_CD_D = document.getElementById("cd-bac-day");
    const BACH_CD_H = document.getElementById("cd-bac-hour");
    const BACH_CD_M = document.getElementById("cd-bac-min");
    const BACH_CD_S = document.getElementById("cd-bac-sec");
    const MAST_CD_D = document.getElementById("cd-mas-day");
    const MAST_CD_H = document.getElementById("cd-mas-hour");
    const MAST_CD_M = document.getElementById("cd-mas-min");
    const MAST_CD_S = document.getElementById("cd-mas-sec");
    const f2f = document.getElementById("faild-to-fetch");

    if (parms.sotsu)
        document.getElementById("sotsu").textContent = decodeURIComponent(parms.sotsu);
    if (parms.syuu)
        document.getElementById("syuu").textContent = decodeURIComponent(parms.syuu);

    var bach_remain;
    var mast_remain;

    var time_exact_last_refresh;
    var time_local_last_refresh;
    var time_local_now;

    if (BACH_CD_D != null)
        document.getElementById("bac-remain").textContent = new Date(BACH_DEAD_LINE);
    if (MAST_CD_D != null)
        document.getElementById("mas-remain").textContent = new Date(MAST_DEAD_LINE);

    var refresh_time = async () => {
        try {
            var res = await fetch("https://elp.emptybox.win/");
            if (res.status == 200) {
                time_exact_last_refresh = (await res.json()).unix_time_ms;
                time_local_last_refresh = Date.now();
                f2f.hidden = true;
            } else {
                time_exact_last_refresh = Date.now();
                time_local_last_refresh = Date.now();
                f2f.hidden = false;
            }
        } catch {
            time_exact_last_refresh = Date.now();
            time_local_last_refresh = Date.now();
            f2f.hidden = false;
        }
    }

    refresh_time();

    setInterval(() => {
        time_exact_now = time_exact_last_refresh + (new Date() - time_local_last_refresh);

        if (BACH_CD_D != null) {
            bach_remain = (BACH_DEAD_LINE - time_exact_now) / 1000;
            BACH_CD_D.textContent = ("0" + Math.floor(bach_remain / 86400)).slice(-2);
            BACH_CD_H.textContent = ("0" + Math.floor(bach_remain / 3600 % 24)).slice(-2);
            BACH_CD_M.textContent = ("0" + Math.floor(bach_remain / 60 % 60)).slice(-2);
            BACH_CD_S.textContent = ("0" + (bach_remain % 60).toFixed(1)).slice(-4);
        }
        
        if (MAST_CD_D != null) {
            mast_remain = (MAST_DEAD_LINE - time_exact_now) / 1000;
            MAST_CD_D.textContent = ("0" + Math.floor(mast_remain / 86400)).slice(-2);
            MAST_CD_H.textContent = ("0" + Math.floor(mast_remain / 3600 % 24)).slice(-2);
            MAST_CD_M.textContent = ("0" + Math.floor(mast_remain / 60 % 60)).slice(-2);
            MAST_CD_S.textContent = ("0" + (mast_remain % 60).toFixed(1)).slice(-4);
        }
    }, 1000 / 20);

    setInterval(() => {
        refresh_time();
    }, 300000);
}

addEventListener("DOMContentLoaded", () => main());