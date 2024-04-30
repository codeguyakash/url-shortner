const shortBtn = document.getElementById("shortBtn");
const copyBtn = document.getElementById("copyBtn");
const copyBtnDiv = document.getElementById("copyBtnDiv");
const showMsg = document.getElementById("showMsg");
const api_url = "https://url.codeguyakash.me";
// const api_url = "http://localhost:5432";

shortBtn.disabled = false;
shortBtn.addEventListener("click", function () {
  const urlInputValue = document.getElementById("urlInput").value;

  if (urlInputValue == "") {
    return (showMsg.innerText = "Please paste your long url here 👇");
  }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: urlInputValue }),
  };
  postData(api_url, requestOptions);
});

async function postData(url, options) {
  shortBtn.innerText = "Loading...";
  showMsg.innerText = "Loading...";

  shortBtn.disabled = true;
  const response = await fetch(url, options);
  const data = await response.json();
  copyBtnDiv.classList.remove("hidden");

  const newGenUrl = `${api_url}/${data.id}`;
  localStorage.setItem("newUrl", newGenUrl);
  const newUrl = localStorage.getItem("newUrl");
  console.log(newUrl);
  if (newGenUrl) {
    document.getElementById("newUrlInput").value = newGenUrl;
    showMsg.innerText = "Generate Success 👍";
    shortBtn.innerText = "SHORT URL";
    shortBtn.disabled = false;
  }
}
copyBtn.addEventListener("click", async function () {
  await navigator.clipboard.writeText(
    document.getElementById("newUrlInput").value
  );
  document.getElementById("copyBtn").innerText = "COPIED!!";
  showMsg.innerText = "COPIED 👍";
  console.log("COPIED!!");
});
