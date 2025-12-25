let myLinks = [];
let inputEl = document.getElementById("input-el");
const saved = document.getElementById("save-btn");
const ulEl = document.getElementById("ul-el")
const dltBtn = document.getElementById("dlt-btn");
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));
const tabBtn = document.getElementById("tab-btn");

if (linksFromLocalStorage) {
  myLinks = linksFromLocalStorage;
  render(myLinks);
}

tabBtn.addEventListener("click", function() {
  // get the current chrome tab url   
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLinks.push(tabs[0].url)
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    render(myLinks);   
  });

})

function render(links) {
    let listItems = "";
    for (let i = 0; i < links.length; i++) {
        if (links[i] !== "") {   // skip empty strings
             // storing all list items in one variable
            listItems += `
            <li>
              <a href="${links[i]}" target="_blank">
                - ${links[i]}
              </a>
            </li>`;
        }
    }
     // Render out the list elements to Web page
    ulEl.innerHTML = listItems;  // always update, even if empty
}

saved.addEventListener("click", function() {
    let url = inputEl.value;
    if (url != "")
    if (!url.startsWith("http://") && !url.startsWith("https://")){
        url = "https://" + url;
    }
    myLinks.push(url);
    inputEl.value = "";
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    render(myLinks);
})

dltBtn.addEventListener("dblclick", function () {
  // When double clicked, clear localStorage, myLeads, and the DOM
  localStorage.clear();
  myLinks = [];
  render(myLinks);
});
