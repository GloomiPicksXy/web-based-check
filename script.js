const mainUI = document.getElementById("main-ui");
const dynamicUI = document.getElementById("dynamic-ui");

// Event Listeners
document.getElementById("acc-checker-btn").addEventListener("click", startAccountChecker);
document.getElementById("url-remover-btn").addEventListener("click", startURLRemover);
document.getElementById("acc-formatter-btn").addEventListener("click", startAccountFormatter);

// Account Checker
function startAccountChecker() {
  mainUI.classList.add("hidden");
  dynamicUI.classList.remove("hidden");

  dynamicUI.innerHTML = `
    <h2>Account Checker</h2>
    <div class="input-box">
      <label for="output-folder">Output Folder:</label><br>
      <input type="text" id="output-folder" placeholder="Enter folder path">
    </div>
    <button id="start-checking-btn">Start Checking</button>
  `;

  document.getElementById("start-checking-btn").addEventListener("click", () => {
    const outputFolder = document.getElementById("output-folder").value;
    if (!outputFolder) {
      alert("Please enter an output folder.");
      return;
    }

    runAccountChecker(outputFolder);
  });
}

function runAccountChecker(outputFolder) {
  dynamicUI.innerHTML = `
    <h2>Please be patient kupal, it's checking</h2>
    <div class="progress">
      <p id="time-remaining">Time remaining: Calculating...</p>
      <p id="accounts-checked">Accounts checked: 0 / 10</p>
    </div>
  `;

  // Simulating the API call
  let totalAccounts = 10;
  let checked = 0;

  const interval = setInterval(() => {
    checked++;
    document.getElementById("accounts-checked").innerText = `Accounts checked: ${checked} / ${totalAccounts}`;
    document.getElementById("time-remaining").innerText = `Time remaining: ${totalAccounts - checked}s`;

    if (checked === totalAccounts) {
      clearInterval(interval);
      showResults(outputFolder, totalAccounts, totalAccounts - 1, 1);
    }
  }, 1000); // Simulate 1 second per account
}

function showResults(outputFolder, totalChecked, totalSuccess, totalFailed) {
  dynamicUI.innerHTML = `
    <h2>Results mo kupal</h2>
    <div class="results">
      <p>Time taken: 10 seconds</p>
      <p>Total Checked: ${totalChecked}</p>
      <p>Total Success: ${totalSuccess}</p>
      <p>Total Failed: ${totalFailed}</p>
      <p>File saved to: ${outputFolder}</p>
    </div>
    <button id="back-btn">Back</button>
  `;

  document.getElementById("back-btn").addEventListener("click", () => {
    dynamicUI.classList.add("hidden");
    mainUI.classList.remove("hidden");
  });
}

// URL Remover
function startURLRemover() {
  mainUI.classList.add("hidden");
  dynamicUI.classList.remove("hidden");

  dynamicUI.innerHTML = `
    <h2>URL Remover</h2>
    <p>Coming soon...</p>
    <button id="back-btn">Back</button>
  `;

  document.getElementById("back-btn").addEventListener("click", () => {
    dynamicUI.classList.add("hidden");
    mainUI.classList.remove("hidden");
  });
}

// Account Formatter
function startAccountFormatter() {
  mainUI.classList.add("hidden");
  dynamicUI.classList.remove("hidden");

  dynamicUI.innerHTML = `
    <h2>Account Formatter</h2>
    <p>Coming soon...</p>
    <button id="back-btn">Back</button>
  `;

  document.getElementById("back-btn").addEventListener("click", () => {
    dynamicUI.classList.add("hidden");
    mainUI.classList.remove("hidden");
  });
}
