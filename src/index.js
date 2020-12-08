const SCREEN = document.querySelector('#screen')

const WIDTH = SCREEN.width
const HEIGHT = SCREEN.height
const PIXEL_SIZE = 1

const context = SCREEN.getContext('2d')

const colors = {
  background: '#F7F7FF',
  snake: '#070600',
  fruit: '#EA526F'
}

function clearScreen() {
  context.fillStyle = colors.background
  context.fillRect(0, 0, WIDTH, HEIGHT)
}

function start() {
  clearScreen()

  context.fillStyle = colors.snake
  context.fillRect(1, 1, PIXEL_SIZE, PIXEL_SIZE)

  requestAnimationFrame(start)
}

start()
