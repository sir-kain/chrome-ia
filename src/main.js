async function checkAIAvailability() {
  const available = await LanguageModel.availability();
  if (available === "unavailable") {
    throw new Error("L'API Chrome AI n'est pas disponible sur ce système.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const button = document.querySelector("button");
  const output = document.querySelector("output");
  const input = document.querySelector("input[type=text]");
  const imageInput = document.querySelector("input[type=file]");
  const previewDiv = document.getElementById("preview");
  const previewImage = document.getElementById("previewImage");

  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previewImage.src = event.target.result;
        previewDiv.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      previewDiv.style.display = "none";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    button.setAttribute("aria-busy", "true");
    button.disabled = true;
    output.innerHTML = "";

    try {
      await checkAIAvailability();

      const session = await LanguageModel.create({
        expectedInputs: [{ type: "image" }, { type: "text" }],
      });
      const result = await session.prompt([
        {
          role: "user",
          content: [
            { type: "text", value: input.value },
            { type: "image", value: document.querySelector("img") },
          ],
        },
      ]);
      // const result = await session.prompt(
      //   [
      //     {
      //       role: "user",
      //       content: [
      //         {
      //           type: "text",
      //           value: input.value,
      //         },
      //         { type: "image", value: document.querySelector("img") },
      //       ],
      //     },
      //   ],
      //   {
      //     responseConstraint: {
      //       type: "boolean",
      //     },
      //   }
      // );
      output.innerHTML = result;
    } catch (error) {
      output.innerHTML = error;
    } finally {
      button.removeAttribute("aria-busy");
      button.disabled = false;
    }
  });
});
