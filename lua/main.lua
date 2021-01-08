WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600

function love.load()
  -- Set the window title to Snake
  love.window.setTitle('Snake')

  -- Pixelated filter
  love.graphics.setDefaultFilter('nearest', 'nearest')

  -- Set the window config
  love.window.setMode(WINDOW_WIDTH, WINDOW_HEIGHT, {
    fullscreen = false,
    resizable = false,
    vsync = true
  })

  -- Use OS time to generate random numbers
  math.randomseed(os.time())

  -- Size variable for every block in the screen
  blockSize = 20

  -- Snake variables
  snake = {}

  snakeX = 0
  snakeY = 0

  -- Intended velocity to respect the timer update
  intSnakeDX = 0
  intSnakeDY = 0

  -- Snake's real velocity
  snakeDX = 0
  snakeDY = 0

  table.insert(snake, { x = snakeX, y = snakeY })

  -- Fruit variable
  randomX = math.random(0, WINDOW_WIDTH)
  randomY = math.random(0, WINDOW_HEIGHT)

  fruitX = randomX - (randomX % blockSize)
  fruitY = randomY - (randomY % blockSize)

  timer = 0
end

function love.keypressed(key)
  if key == 'escape' then
    love.event.quit()
  end
end

function love.update(dt)
  -- Save the timer
  timer = timer + dt

  if love.keyboard.isDown('up') and snakeDY == 0 then
    -- If user press the up key, snake goes up
    intSnakeDX = 0
    intSnakeDY = -blockSize
  elseif love.keyboard.isDown('down') and snakeDY == 0 then
    -- If user press the down key, snake goes down
    intSnakeDX = 0
    intSnakeDY = blockSize
  elseif love.keyboard.isDown('left') and snakeDX == 0 then
    -- If user press the left key, snake goes left
    intSnakeDX = -blockSize
    intSnakeDY = 0
  elseif love.keyboard.isDown('right') and snakeDX == 0 then
    -- If user press the right key, snake goes right
    intSnakeDX = blockSize
    intSnakeDY = 0
  end

  -- Updates every 0.12 seconds
  if timer >= 0.12 then
    timer = 0

    -- Updates the snake's real velocity
    snakeDX = intSnakeDX
    snakeDY = intSnakeDY

    -- Change snake's head position
    snakeX = snakeX + snakeDX
    snakeY = snakeY + snakeDY

    -- Eat fruit
    if snakeX == fruitX and snakeY == fruitY then
      -- Snake grows
      growSnake()

      -- Fruit is reset
      resetFruit()
    end

    if snakeX < 0 then
      -- Snake hits left wall
      snakeX = 0
    elseif snakeX > WINDOW_WIDTH - blockSize then
      -- Snake hits right wall
      snakeX = WINDOW_WIDTH - blockSize
    elseif snakeY < 0 then
      -- Snake hits top wall
      snakeY = 0
    elseif snakeY > WINDOW_HEIGHT - blockSize then
      -- Snake hits bottom wall
      snakeY = WINDOW_HEIGHT - blockSize
    else
      -- Move the snake, only if it hasn't collide
      table.insert(snake, 1, { x = snakeX, y = snakeY })
      table.remove(snake)
    end
  end
end

function love.draw()
  -- Clear screen
  love.graphics.clear(43 / 255, 45 / 255, 66 / 255)

  -- Render Fruit
  love.graphics.setColor(239 / 255, 35 / 255, 60 / 255)
  love.graphics.rectangle('fill', fruitX, fruitY, blockSize, blockSize)

  -- Render Snake
  for i in pairs(snake) do
    love.graphics.setColor(236 / 255, 235 / 255, 228 / 255)
    love.graphics.rectangle('fill', snake[i]['x'], snake[i]['y'], blockSize, blockSize)
  end
end

function growSnake()
  tableSize = table.getn(snake)
  lastPosition = snake[tableSize]

  for i = 1, 5 do
    table.insert(snake, { x = lastPosition['x'], y = lastPosition['y'] })
  end
end

function resetFruit()
  randomX = math.random(0, WINDOW_WIDTH)
  randomY = math.random(0, WINDOW_HEIGHT)

  fruitX = randomX - (randomX % blockSize)
  fruitY = randomY - (randomY % blockSize)
end
