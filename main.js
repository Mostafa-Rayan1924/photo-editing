// envoke the inputs and the tools
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayScale = document.getElementById("grayScale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hueRotate");
let download = document.getElementById("download");
let upload = document.getElementById("upload");
let reset = document.querySelector("span");
let img = document.getElementById("img");
let canavs = document.getElementById("canvas");
let ctx = canavs.getContext("2d");
let body = document.getElementById("body");
let icon = document.getElementById("icon");

// in the beginning hide the buttons we dont need it
window.onload = () => {
  download.style.display = "none";
  reset.style.display = "none";
};
// in any change in button upload make this codes
upload.onchange = () => {
  // show the 2buttons which we hidden in the first
  download.style.display = "block";
  reset.style.display = "block";
  // reset the filters
  resetvalue();
  //   use the js class to read the file in pc
  let file = new FileReader();
  //   read the file after choise
  file.readAsDataURL(upload.files[0]);
  //   make the photo take time to upload
  file.onload = function () {
    img.src = file.result;
  };
  img.onload = function () {
    canavs.width = img.width;
    canavs.height = img.height;
    ctx.drawImage(img, 0, 0, canavs.width, canavs.height);
    img.style.display = "none";
  };
};

let filters = document.querySelectorAll("ul li input");
filters.forEach((item) => {
  item.addEventListener("input", function () {
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayScale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `;
    ctx.drawImage(img, 0, 0, canavs.width, canavs.height);
  });
});
// reset the filters
function resetvalue() {
  ctx.filter = "none";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayScale.value = "0";
  hueRotate.value = "0";
  blur.value = "0";
  ctx.drawImage(img, 0, 0, canavs.width, canavs.height);
}
reset.addEventListener("click", resetvalue);

// download

download.onclick = function () {
  download.href = canavs.toDataURL();
};
let labels = document.querySelectorAll(".la");
icon.onclick = () => {
  labels.forEach((item) => {
    item.classList.toggle("sun");
  });
  body.classList.toggle("white");
  document.querySelector(".container").classList.toggle("active");
  document.querySelector("label").style.border = "2px dashed white";
  if (body.classList.contains("white")) {
    icon.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  } else {
    icon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }
};
