function showTool(tool) {
  document.getElementById("menu").classList.add("hidden");
  document.querySelectorAll(".tool-section").forEach((section) => section.classList.add("hidden"));
  document.getElementById(tool).classList.remove("hidden");
}

function goBack() {
  document.querySelectorAll(".tool-section").forEach((section) => section.classList.add("hidden"));
  document.getElementById("menu").classList.remove("hidden");
}

function processAccounts() {
  const resultContainer = document.getElementById("checkerResult");
  resultContainer.textContent = "Processing accounts... (Mock functionality for now)";
}

function removeUrls() {
  const resultContainer = document.getElementById("urlResult");
  resultContainer.textContent = "URLs removed! (Mock functionality for now)";
}

function formatAccounts() {
  const resultContainer = document.getElementById("formatterResult");
  resultContainer.textContent = "Accounts formatted! (Mock functionality for now)";
}
