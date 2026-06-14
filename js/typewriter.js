function typeText(element, text, speed = 24) {
  return new Promise((resolve) => {
    let index = 0;
    element.textContent = "";

    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }

    type();
  });
}
