(async () => {
  const gameBoard = document.getElementById("game") as HTMLCanvasElement | null;
  if (!gameBoard) {
    throw new Error("No gameboard found");
  }
  const factor = 80;
  gameBoard.height = 6 * factor;
  gameBoard.width = 10 * factor;

  const ctx = gameBoard.getContext("2d");

  if (!ctx) {
    throw new Error("2D context not supported");
  }

  let ball = await import("./ball.js");
  const state = new ball.State(60, 200, 200);

  const isDev = window.location.hostname === "localhost";
  if (isDev) {
    const socket = new WebSocket("ws://localhost:3030");
    socket.addEventListener("open", () => socket.send("client connected"));

    socket.addEventListener("message", async (event) => {
      console.log(event.data);
      if (event.data === "reload") {
        console.log("Module Hot Reloaded");
        ball = await import("./ball.js?time=" + new Date().getTime());
        Object.setPrototypeOf(
          state,
          Object.getPrototypeOf(
            new ball.State(state.radius, state.velX, state.velY)
          )
        );
      }
    });
  }

  let prevTimestamp = 0;

  const frame = (timestamp: number) => {
    const delta = (timestamp - prevTimestamp) / 1000;
    prevTimestamp = timestamp;
    state.update(ctx, delta);

    window.requestAnimationFrame(frame);
  };

  window.requestAnimationFrame((timestamp) => {
    prevTimestamp = timestamp;
    window.requestAnimationFrame(frame);
  });
})();
