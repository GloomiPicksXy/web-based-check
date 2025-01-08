const mainUI = document.getElementById("main-ui");
const dynamicUI = document.getElementById("dynamic-ui");

// Handles button clicks
document.getElementById("acc-checker-btn").addEventListener("click", () => {
  startAccountChecker();
});

document.getElementById("url-remover-btn").addEventListener("click", () => {
  startURLRemover();
});

document.getElementById("acc-formatter-btn").addEventListener("click", () => {
  startAccountFormatter();
});

// Function for Account Checker
function startAccountChecker() {
  mainUI.style.display = "none"; // Hide main buttons
  dynamicUI.style.display = "block"; // Show dynamic UI

  // Step 1: Ask for output folder
  dynamicUI.innerHTML = `
    <h1>Account Checker</h1>
    <label>Output Folder:</label>
    <input type="text" id="output-folder" placeholder="Enter folder path" />
    <button id="start-checking-btn">Start Checking</button>
  `;

  document
    .getElementById("start-checking-btn")
    .addEventListener("click", () => {
      const outputFolder = document.getElementById("output-folder").value;
      if (!outputFolder) {
        alert("Please enter an output folder!");
        return;
      }

      // Step 2: Show progress
      showProgress(outputFolder);
    });
}

function showProgress(outputFolder) {
  dynamicUI.innerHTML = `
    <h1>Please be patient kupal, it's checking</h1>
    <p id="time-remaining">Time remaining: Calculating...</p>
    <p id="accounts-checked">Accounts checked: 0 - 0</p>
  `;

  // Mocking API call and progress
  let totalAccounts = 10;
  let checkedAccounts = 0;

  const interval = setInterval(() => {
    checkedAccounts++;
    document.getElementById(
      "accounts-checked"
    ).textContent = `Accounts checked: ${checkedAccounts} - ${totalAccounts}`;
    document.getElementById("time-remaining").textContent = `Time remaining: ${
      totalAccounts - checkedAccounts
    } seconds`;

    if (checkedAccounts === totalAccounts) {
      clearInterval(interval);

      // Step 3: Show results
      showResults(outputFolder, totalAccounts, totalAccounts - 1, 1);
    }
  }, 1000); // Mocking 1-second intervals
}

function showResults(outputFolder, totalChecked, totalSuccess, totalFailed) {
  dynamicUI.innerHTML = `
    <h1>Result mo kupal</h1>
    <p>Time taken: 10 seconds</p>
    <p>Total Checked: ${totalChecked}</p>
    <p>Total Success: ${totalSuccess}</p>
    <p>Total Failed: ${totalFailed}</p>
    <p>File saved to: ${outputFolder}</p>
    <button id="back-btn">Back</button>
  `;

  document.getElementById("back-btn").addEventListener("click", () => {
    dynamicUI.style.display = "none";
    mainUI.style.display = "block";
  });
}

// Mock URL Remover
function startURLRemover() {
  mainUI.style.display = "none";
  dynamicUI.style.display = "block";
  dynamicUI.innerHTML = `<h1>URL Remover Placeholder</h1>`;
}

// Mock Account Formatter
function startAccountFormatter() {
  mainUI.style.display = "none";
  dynamicUI.style.display = "block";
  dynamicUI.innerHTML = `<h1>Account Formatter Placeholder</h1>`;
}
