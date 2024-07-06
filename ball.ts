export class State {
  posX: number;
  posY: number;
  velX: number;
  velY: number;
  radius: number;

  constructor(radius: number, velX: number, velY: number) {
    this.posX = radius;
    this.posY = radius;
    this.velX = velX;
    this.velY = velY;
    this.radius = radius;
  }

  update(ctx: CanvasRenderingContext2D, delta: number) {
    const newPosX = this.posX + this.velX * delta;
    if (
      newPosX - this.radius < 0 ||
      newPosX + this.radius >= ctx.canvas.width
    ) {
      this.velX = -this.velX;
    } else {
      this.posX = newPosX;
    }

    const newPosY = this.posY + this.velY * delta;
    if (
      newPosY - this.radius < 0 ||
      newPosY + this.radius >= ctx.canvas.height
    ) {
      this.velY = -this.velY;
    } else {
      this.posY = newPosY;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // ctx.beginPath();
    ctx.fillStyle = "white";
    // ctx.arc(this.posX, this.posY, this.radius, 0, 90);
    ctx.fillRect(
      this.posX - this.radius,
      this.posY - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }
}

// interface AState {
//   posX: number;
//   posY: number;
//   velX: number;
//   velY: number;
// }

// export function createState(): AState {
//   return {
//     posX: RADIUS,
//     posY: RADIUS,
//     velX: 200,
//     velY: 200,
//   };
// }

// export function updateState(
//   ctx: CanvasRenderingContext2D,
//   state: AState,
//   delta: number
// ) {
//   const newPosX = state.posX + state.velX * delta;
//   if (newPosX - RADIUS < 0 || newPosX + RADIUS >= ctx.canvas.width) {
//     state.velX = -state.velX;
//   } else {
//     state.posX = newPosX;
//   }

//   const newPosY = state.posY + state.velY * delta;
//   if (newPosY - RADIUS < 0 || newPosY + RADIUS >= ctx.canvas.height) {
//     state.velY = -state.velY;
//   } else {
//     state.posY = newPosY;
//   }

//   ctx.fillStyle = "black";
//   ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//   // ctx.beginPath();
//   ctx.fillStyle = "#677ff8";
//   // ctx.arc(state.posX, state.posY, RADIUS, 0, 90);
//   ctx.fillRect(
//     state.posX - RADIUS,
//     state.posY - RADIUS,
//     RADIUS * 2,
//     RADIUS * 2
//   );
// }
