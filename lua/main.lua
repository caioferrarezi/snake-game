require 'Snake'
require 'Fruit'

push = require 'push'

VIRTUAL_WIDTH = 960
VIRTUAL_HEIGHT= 540

WINDOW_WIDTH = 1280
WINDOW_HEIGHT = 720

function love.load()
  -- Set the window title to Snake
  love.window.setTitle('Snake')

  -- Pixelated filter
  love.graphics.setDefaultFilter('nearest', 'nearest')

  -- Set the window config

  -- love.window.setMode(WINDOW_WIDTH, WINDOW_HEIGHT, {
  --   fullscreen = false,
  --   resizable = false,
  --   vsync = true
  -- })

  push:setupScreen(VIRTUAL_WIDTH, VIRTUAL_HEIGHT, WINDOW_WIDTH, WINDOW_HEIGHT, {
    fullscreen = false,
    resizable = true,
    vsync = true
  })

  -- Set fonts
  smallFont = love.graphics.newFont('assets/retro-gaming.ttf', 20)
  largeFont = love.graphics.newFont('assets/retro-gaming.ttf', 40)

  -- Load audios
  hit = love.audio.newSource('assets/hit.wav', 'static')
  collect = love.audio.newSource('assets/collect.wav', 'static')

  hit:setVolume(0.3)
  collect:setVolume(0.3)

  -- Use OS time to generate random numbers
  math.randomseed(os.time())

  -- Size variable for every block in the screen
  BLOCK_SIZE = 20

  -- Create snake variables
  createSnake()

  -- Create fruit variables
  createFruit()

  -- Time to control frame update
  timer = 0
  updateRate = 0.12

  -- Game state control
  gameState = 'start'

  -- Store game score
  score = 0
end

function love.resize(width, height)
  push:resize(width, height)
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

      createSnake()
      createFruit()

      score = 0
      updateRate = 0.12
    end
  end
end

function love.update(dt)
  -- Save the timer
  timer = timer + dt

  if gameState == 'play' then
    if love.keyboard.isDown('up') then
      -- If user press the up key, snake goes up
      intSnakeDX = 0
      intSnakeDY = -BLOCK_SIZE
    elseif love.keyboard.isDown('down') then
      -- If user press the down key, snake goes down
      intSnakeDX = 0
      intSnakeDY = BLOCK_SIZE
    elseif love.keyboard.isDown('left') then
      -- If user press the left key, snake goes left
      intSnakeDX = -BLOCK_SIZE
      intSnakeDY = 0
    elseif love.keyboard.isDown('right') then
      -- If user press the right key, snake goes right
      intSnakeDX = BLOCK_SIZE
      intSnakeDY = 0
    end

  -- Updates when timer is greater than o equal to update rate seconds
    if timer >= updateRate then
      timer = 0

      -- Updates the snake's position
      snake:update(intSnakeDX, intSnakeDY)

      -- Eat fruit
      if snake:collides(fruit) then
        -- Snake grows
        snake:grow()

        -- Fruit is reset
        createFruit()

        -- Add 1 to the score
        score = score + 1

        -- Remove 0.001 second from update rate
        -- with 0.08 second being the max value
        updateRate = math.max(updateRate - 0.001, 0.08)

        -- Play collect audio
        collect:play()
      end

      if snake:hitWall() or snake:isAt(snake.x, snake.y, 2) then
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
  push:start()

  -- Clear screen
  love.graphics.clear(34 / 255, 34 / 255, 34 / 255)

  if gameState == 'play' then
    -- Display game screen
    displayGameScreen()
  elseif gameState == 'pause' then
    -- Display pause screen
    displayPauseScreen()
  elseif gameState == 'start' then
    -- Display start screen
    displayStartScreen()
  elseif gameState == 'done' then
    -- Display end game screen
    displayEndGameScreen()
  end

  push:finish()
end

function createSnake()
  local pos = getRandomPosition()

  -- Intended velocity to respect the timer update
  intSnakeDX = 0
  intSnakeDY = 0

  -- Create snake instance
  snake = Snake:new(pos['x'], pos['y'])
end

function createFruit()
  repeat
    local pos = getRandomPosition()

    fruit = Fruit:new(pos['x'], pos['y'])
  until( not snake:isAt(fruit.x, fruit.y, 1) )
end

function getRandomPosition()
  local randomX = math.random(0, VIRTUAL_WIDTH)
  local randomY = math.random(0, VIRTUAL_HEIGHT)

  return {
    x = randomX - (randomX % BLOCK_SIZE),
    y = randomY - (randomY % BLOCK_SIZE)
  }
end

function displayScore()
  love.graphics.setFont(smallFont)
  love.graphics.setColor(87 / 255, 178 / 255, 124 / 255)
  love.graphics.print('Score: ' .. score, BLOCK_SIZE, BLOCK_SIZE)
end

function displayGameScreen()
  -- Render Fruit
  fruit:render()

  -- Render Snake
  snake:render()

  -- Display score
  displayScore()
end

function displayPauseScreen()
  love.graphics.setFont(largeFont)
  love.graphics.setColor(87 / 255, 178 / 255, 124 / 255)
  love.graphics.printf('Game paused', 0, (VIRTUAL_HEIGHT / 2) - 20, VIRTUAL_WIDTH, 'center')
end

function displayStartScreen()
  love.graphics.setFont(largeFont)
  love.graphics.setColor(87 / 255, 178 / 255, 124 / 255)
  love.graphics.printf('Welcome to Snake', 0, (VIRTUAL_HEIGHT / 2) - 60, VIRTUAL_WIDTH, 'center')

  love.graphics.setFont(smallFont)
  love.graphics.printf('Press [enter] to play!', 0, (VIRTUAL_HEIGHT / 2) + 10, VIRTUAL_WIDTH, 'center')
end

function displayEndGameScreen()
  love.graphics.setFont(largeFont)
  love.graphics.setColor(87 / 255, 178 / 255, 124 / 255)
  love.graphics.printf('You\'ve scored: ' .. score, 0, (VIRTUAL_HEIGHT / 2) - 60, VIRTUAL_WIDTH, 'center')

  love.graphics.setFont(smallFont)
  love.graphics.printf('Press [enter] to play again!', 0, (VIRTUAL_HEIGHT / 2) + 10, VIRTUAL_WIDTH, 'center')
end
