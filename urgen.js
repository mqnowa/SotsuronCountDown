function main() {
    const gen_button = document.getElementById("submit");
    const bac_deadline = document.getElementById("bac-deadline");
    const mas_deadline = document.getElementById("mas-deadline");
    const bac_string = document.getElementById("bac-string");
    const mas_string = document.getElementById("mas-string");
    const a = document.querySelector("a");
    gen_button.addEventListener("click", () => {
        var url = "https://mqnowa.github.io/SotsuronCountDown/eva"
                  + "?bdl=" + encodeURIComponent(bac_deadline.value)
                  + "&mdl=" + encodeURIComponent(mas_deadline.value)
                  + "&sotsu=" + encodeURIComponent(bac_string.value)
                  + "&syuu=" + encodeURIComponent(mas_string.value);
        a.textContent = url;
        a.href = url;
    });
}

addEventListener("DOMContentLoaded", () => {
    main();
})