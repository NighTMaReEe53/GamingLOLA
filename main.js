let thePropmt;

document.querySelector(".theBtn").onclick = function () {
  thePropmt = prompt("What Is Your Name !??");

  if (thePropmt) {
    document.querySelector(".name span").innerHTML = thePropmt;
  } else {
    document.querySelector(".name span").innerHTML = "Unknown";
  }

  document.body.style.overflow = "auto";

  document.querySelector(".lightbox").remove();
};

// Set Variable's

let theDuration = 1000;

let theContainer = document.querySelector(".game-container");
let theBlocks = Array.from(theContainer.children);

let theArrayOfBlocks = [...Array(theBlocks.length).keys()];

theShuffle(theArrayOfBlocks);

theBlocks.forEach((block, indx) => {
  block.style.order = theArrayOfBlocks[indx];

  block.addEventListener("click", () => {
    isFliped(block);
  });
});

function isFliped(element) {
  element.classList.add("isFliped");

  let theFiltered = theBlocks.filter((block) =>
    block.classList.contains("isFliped")
  );

  if (theFiltered.length === 2) {
    stopClicked();

    finishGame(theFiltered[0], theFiltered[1]);
  }

}

function congrUser(theName) {
  document.getElementById("cong").play();
  let div = document.createElement("div");

  div.className = "box";

  let overlay = document.createElement("div");

  overlay.className = "overlay";

  div.appendChild(overlay);

  let theHeading = document.createElement("h2");

  theHeading.appendChild(
    document.createTextNode(`Congratulation => `)
  );

  let theSpan = document.createElement("span");

    theSpan.appendChild(document.createTextNode(theName))

  theHeading.appendChild(theSpan)

  div.appendChild(theHeading);

  document.body.appendChild(div);

  document.body.style.overflow = "hidden"


}

function stopClicked() {
  theContainer.classList.add("no-click");

  setTimeout(() => {
    theContainer.classList.remove("no-click");
  }, theDuration);
}

function finishGame(fBlock, sBlock) {
  let theTries = document.querySelector(".tries span");

  if (fBlock.dataset.lola === sBlock.dataset.lola) {
    fBlock.classList.remove("isFliped");
    sBlock.classList.remove("isFliped");
    fBlock.classList.add("has-match");
    sBlock.classList.add("has-match");
    document.getElementById("sucess").play();
    let theMatched = theBlocks.filter((block) => block.classList.contains("has-match"))
    if (theMatched.length === 28) {
      congrUser(thePropmt);
    }
  } else {
    theTries.innerHTML = parseInt(theTries.innerHTML) + 1;
    document.getElementById("failed").play();
    setTimeout(() => {
      fBlock.classList.remove("isFliped");
      sBlock.classList.remove("isFliped");
    }, theDuration);
  }
}

function theShuffle(theArray) {
  let current = theArray.length,
    random,
    temp;

  while (current) {
    random = Math.floor(Math.random() * current);

    current--;

    temp = theArray[current];

    theArray[current] = theArray[random];

    theArray[random] = temp;
  }

  return theArray;
}