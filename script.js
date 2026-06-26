/* ----------------------------------------------------------------
   Toggle control for the wildlife film.

   The single button does two jobs, matching the brief:
     - if the film is not playing, clicking plays it (revealing it
       first if it was hidden)
     - if the film is playing, clicking hides it and stops it

   The button label and its aria-pressed state are kept in step with
   the video at all times, including when the native controls are used.
------------------------------------------------------------------- */

const video = document.getElementById("wildlife");
const button = document.getElementById("toggle");

// Reflect the current state on the button so it always tells the truth
function showAsPlaying() {
  button.textContent = "Hide film";
  button.setAttribute("aria-pressed", "true");
}

function showAsStopped() {
  button.textContent = "Play film";
  button.setAttribute("aria-pressed", "false");
}

button.addEventListener("click", () => {
  if (video.classList.contains("is-hidden")) {
    // Film was hidden: bring it back and play it
    video.classList.remove("is-hidden");
    video.play();
  } else if (video.paused) {
    // Film is visible but stopped: play it
    video.play();
  } else {
    // Film is playing: stop and hide it
    video.pause();
    video.classList.add("is-hidden");
    showAsStopped();
  }
});

// Keep the button honest if the viewer uses the native controls instead
video.addEventListener("play", showAsPlaying);
video.addEventListener("pause", () => {
  // Only relabel while the film is still on screen
  if (!video.classList.contains("is-hidden")) {
    showAsStopped();
  }
});
video.addEventListener("ended", showAsStopped);
