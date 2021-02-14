require 'Snake'
require 'Fruit'

WINDOW_WIDTH = 1280
WINDOW_HEIGHT = 720

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

  -- Set fonts
  smallFont = love.graphics.newFont('assets/retro-gaming.ttf', 20)
  largeFont = love.graphics.newFont('assets/retro-gaming.ttf', 40)

  -- Load audios
  hit = love.audio.newSource('assets/hit.wav', 'static')
  collect = love.audio.newSource('assets/collect.wav', 'static')

  hit:setVolume(0.5)
  collect:setVolume(0.5)

  -- Use OS time to generate random numbers
  math.randomseed(os.time())

  -- Size variable for every block in the screen
  blockSize = 20

  -- Reset snake variables
  resetSnake()

  -- Reset fruit variables
  resetFruit()

  -- Time to control frame update
  timer = 0

  -- Game state control
  gameState = 'start'

  -- Store game score
  score = 0
end

function love.keypressed(key)
  if key == 'escape' then
    love.event.quit()
  end

  if key == 'return' or key == 'enter' then
    if gameState == 'start' then
      gameState = 'play'
    elseif gameState == 'play' then
      gameState = 'pause'
    elseif gameState == 'pause' then
      gameState = 'play'
    elseif gameState == 'done' then
      gameState = 'play'
      resetSnake()
      resetFruit()
      score = 0
    end
  end
end

function love.update(dt)
  -- Save the timer
  timer = timer + dt

  if gameState == 'play' then
    if love.keyboard.isDown('up') and snake.dy == 0 then
      -- If user press the up key, snake goes up
      intSnakeDX = 0
      intSnakeDY = -blockSize
    elseif love.keyboard.isDown('down') and snake.dy == 0 then
      -- If user press the down key, snake goes down
      intSnakeDX = 0
      intSnakeDY = blockSize
    elseif love.keyboard.isDown('left') and snake.dx == 0 then
      -- If user press the left key, snake goes left
      intSnakeDX = -blockSize
      intSnakeDY = 0
    elseif love.keyboard.isDown('right') and snake.dx == 0 then
      -- If user press the right key, snake goes right
      intSnakeDX = blockSize
      intSnakeDY = 0
    end

  -- Updates every 0.12 seconds
    if timer >= 0.12 then
      timer = 0

      -- Updates the snake's real velocity
      snake.dx = intSnakeDX
      snake.dy = intSnakeDY

      -- Change snake's head position
      snake.x = snake.x + snake.dx
      snake.y = snake.y + snake.dy

      -- Eat fruit
      if snake.x == fruit.x and snake.y == fruit.y then
        -- Snake grows
        snake:grow()

        -- Fruit is reset
        resetFruit()

        -- Add 1 to the score
        score = score + 1

        -- Play collect audio
        collect:play()
      end

      if
        snake.x < 0 or snake.y < 0 or
        snake.x > WINDOW_WIDTH - blockSize or
        snake.y > WINDOW_HEIGHT - blockSize or
        snake:isAt(snake.x, snake.y, 2)
      then
        -- Snake hits left wall
        gameState = 'done'

        -- Play hit audio
        hit:play()
      else
        -- Move the snake, only if it hasn't collide
        snake:move()
      end
    end
  end
end

function love.draw()
  -- Clear screen
  love.graphics.clear(34 / 255, 34 / 255, 34 / 255)

  if gameState == 'play' then
    -- Render Fruit
    love.graphics.setColor(239 / 255, 35 / 255, 60 / 255)
    love.graphics.rectangle('fill', fruit.x, fruit.y, blockSize, blockSize)

    -- Render Snake
    for i in pairs(snake.body) do
      love.graphics.setColor(236 / 255, 235 / 255, 228 / 255)
      love.graphics.rectangle('fill', snake.body[i]['x'], snake.body[i]['y'], blockSize, blockSize)
    end

    -- Display score
    love.graphics.setFont(smallFont)
    love.graphics.setColor(87 / 255, 178 / 255, 124 / 255)
    love.graphics.print('Score: ' .. score, blockSize, blockSize)
  elseif gameState == 'pause' then
    -- Display pause screen
    love.graphics.setFont(largeFont)
    love.graphics.setColor(87 / 255, 178 / 255, 124 / 255)
    love.graphics.printf('Game paused', 0, (WINDOW_HEIGHT / 2) - 20, WINDOW_WIDTH, 'center')
  elseif gameState == 'start' then
    -- Display start screen
    love.graphics.setFont(largeFont)
    love.graphics.setColor(87 / 255, 178 / 255, 124 / 255)
    love.graphics.printf('Welcome to Snake', 0, (WINDOW_HEIGHT / 2) - 60, WINDOW_WIDTH, 'center')

    love.graphics.setFont(smallFont)
    love.graphics.printf('Press [enter] to play!', 0, (WINDOW_HEIGHT / 2) + 10, WINDOW_WIDTH, 'center')
  elseif gameState == 'done' then
    -- Display end game screen
    love.graphics.setFont(largeFont)
    love.graphics.setColor(87 / 255, 178 / 255, 124 / 255)
    love.graphics.printf('You\'ve scored: ' .. score, 0, (WINDOW_HEIGHT / 2) - 60, WINDOW_WIDTH, 'center')

    love.graphics.setFont(smallFont)
    love.graphics.printf('Press [enter] to play again!', 0, (WINDOW_HEIGHT / 2) + 10, WINDOW_WIDTH, 'center')
  end
end

function resetSnake()
  local pos = getRandomPosition()

  -- Intended velocity to respect the timer update
  intSnakeDX = 0
  intSnakeDY = 0

  -- Create snake instance
  snake = Snake:new(pos['x'], pos['y'])
end

function resetFruit()
  repeat
    local pos = getRandomPosition()

    fruit = Fruit:new(pos['x'], pos['y'])
  until( not snake:isAt(fruit.x, fruit.y, 1) )
end

function getRandomPosition()
  local randomX = math.random(0, WINDOW_WIDTH)
  local randomY = math.random(0, WINDOW_HEIGHT)

  return {
    x = randomX - (randomX % blockSize),
    y = randomY - (randomY % blockSize)
  }
end
