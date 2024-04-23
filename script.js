const shortBtn = document.getElementById("shortBtn");
const copyBtn = document.getElementById("copyBtn");
const copyBtnDiv = document.getElementById("copyBtnDiv");
const api_url = "https://url.codeguyakash.me";

shortBtn.addEventListener("click", function () {
  const urlInputValue = document.getElementById("urlInput").value;

  if (urlInputValue == "") {
    return console.log("first");
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
  const response = await fetch(url, options);
  const data = await response.json();
  shortBtn.innerText = "SHORT URL";
  copyBtnDiv.classList.remove("hidden");

  const newGenUrl = `${api_url}/${data.id}`;
  localStorage.setItem("newUrl", newGenUrl);
  const newUrl = localStorage.getItem("newUrl");
  console.log(newUrl);
  document.getElementById("newUrlInput").value = newGenUrl;
}
copyBtn.addEventListener("click", async function () {
  await navigator.clipboard.writeText(
    document.getElementById("newUrlInput").value
  );
  document.getElementById("svgIcon").classList.add("animate-jump");
});
