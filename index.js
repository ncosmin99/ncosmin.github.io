var activePage = "skills";

// utilitis functions

function $(selector) {
  return document.querySelector(selector);
}

function hide(id) {
  console.info("hide %o element", id);
  $(`#${id}`).style.display = "none";
}

function show(id) {
  var page = $("#" + id);
  console.info("show %o", id, page);
  page.style.display = "block";
}

function showPage(id) {
  var oldLink = $(`#top-menu-bar a[data-page=${activePage}]`);
  oldLink.classList.remove("active");

  hide(activePage);

  activePage = id;

  var link = $(`#top-menu-bar a[data-page=${activePage}]`);
  link.classList.add("active");

  show(activePage);
}

function clickOnMenu(e) {
  var link = e.target.closest("a");
  //console.warn("click", link, e.target);
  if (link) {
    var id = link.dataset.page;
    //console.warn("click %o menu", e.target.getAttribute("data-page"));
    //console.warn("click %o menu", id, e.target.matches("a"));
    //console.warn("click %o menu", id);
    if (id) {
      //if (e.target.matches("a") & id) {
      showPage(id);
    }
  }
}

function sortByEndorcements(a, b) {
  return b.endorcements - a.endorcements;
}

function sortByName(a, b) {
  return a.name.localeCompare(b.name);
}

function showSkills(skills) {
  skills.sort(sortByEndorcements);
  var htmlSkills = skills.map(function (skill) {
    //<li class="favorite">HTML</li>
    console.info("skill", skill);
    var cls = skill.favorite ? "favorite" : "";
    return `<li class="${cls}">${skill.name} <span>- ${skill.endorcements}</span></li>`;
  });
  console.info("skill", htmlSkills);
  var ul = $("#skills ul");
  ul.innerHTML = htmlSkills.join("");
}

function loadSkills() {
  //console.time("load");
  var response = fetch("skills.json");
  var loaded = response.then(function (r) {
    return r.json();
  });
  loaded.then(function (skills) {
    showSkills(skills);
    //console.timeEnd("load");
    //console.warn("ready");
  });
  //console.warn("end");
}

//HR Skills

function showHrSkills(skills) {
  var htmlSkills = skills.map(function (skill) {
    console.info("skill", skill);
    return `<li>${skill.name}</li>`;
  });
  console.info("skills", htmlSkills);
  var ul = $("#hrSkills");
  ul.innerHTML = htmlSkills.join("");
}

function loadHrSkills() {
  var response = fetch("hrskills.json");
  var loaded = response.then(function (r) {
    return r.json();
  });
  loaded.then(function (skills) {
    showHrSkills(skills);
  });
}

function showTableOfFour() {
  var checkBox = document.getElementById("four");
  var table = document.getElementById("tableOfFour");
  if (checkBox.checked == true) {
    table.style.display = "block";
  } else {
    table.style.display = "none";
  }
}

function showTableOfNine() {
  var checkBox = document.getElementById("nine");
  var table = document.getElementById("tableOfNine");
  if (checkBox.checked == true) {
    table.style.display = "block";
  } else {
    table.style.display = "none";
  }
}
// start our code

showPage(activePage);
$("#top-menu-bar").addEventListener("click", clickOnMenu);
loadSkills();
loadHrSkills();
