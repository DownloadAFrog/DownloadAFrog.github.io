// GitHub repo info
const username = "DownloadAFrog";
const repo = "DownloadAFrog.github.io";
const folder = "images/frogs"; // folder inside repo
const branch = "main";   // branch name

const apiURL = `https://api.github.com/repos/${username}/${repo}/contents/${folder}?ref=${branch}`;

document.getElementById("downloadAFrogBtn").addEventListener("click", async () => {
  try {
    const response = await fetch(apiURL);
    const files = await response.json();

    // Filter only images
    const images = files.filter(file =>
      file.type === "file" &&
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
    );

    if (images.length === 0) {
      alert("No images found in folder.");
      return;
    }

    // Pick a random image
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // Trigger download
    const imageResponse = await fetch(randomImage.download_url);
    const blob = await imageResponse.blob();

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = randomImage.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl); 
    //88
  } catch (err) {
    console.error(err);
    alert("Error fetching images.");
  }
});