async function runVaultBoot() {
  const bootTitle = document.getElementById("boot-title");
  const bootText = document.getElementById("boot-text");
  const enterButton = document.getElementById("enter-vault-btn");

  const titleText = "VAULT SYSTEM ONLINE";

  const bootSequence = [
    "> Establishing encrypted tunnel...",
    "> Authenticating Chronic Worm credentials...",
    "> Scanning genetics archive...",
    "> Unlocking restricted breeding files...",
    "> Opening Wormhole project network...",
    "> Access level confirmed.",
    "",
    "ACCESS GRANTED"
  ].join("\n");

  await typeText(bootTitle, titleText, 45);
  await typeText(bootText, bootSequence, 20);

  enterButton.classList.remove("hidden");
}

function enterVault() {
  const bootScreen = document.getElementById("boot-screen");
  const site = document.getElementById("site");

  bootScreen.classList.add("vault-open");

  setTimeout(() => {
    bootScreen.classList.add("hidden");
    site.classList.remove("hidden");
    window.scrollTo(0, 0);
  }, 500);
}
