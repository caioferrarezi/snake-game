import canvas from 'utils/canvas';

export default class GameOverScreen {
  show(score) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    canvas.context.fillStyle = '#222222';
    canvas.context.textAlign = 'center';
    canvas.context.textBaseline = 'middle';
    canvas.context.font = `normal 48px VT323, monospace`;
    canvas.context.fillText(`You've scored: ${score}`, x, y - 30);
    canvas.context.font = `normal 32px VT323, monospace`;
    canvas.context.fillText(`Press [Enter] or [Space] to restart`, x, y + 30);
  }
}
