-- Create the Snake class
Snake = {}

function Snake:new(x, y)
  local o = {}
  setmetatable(o, self)
  self.__index = self

  self.x = x
  self.y = y

  self.dx = 0
  self.dy = 0

  self.body = {}
  table.insert(self.body, { x = x, y = y })

  return o
end

function Snake:move()
  table.insert(snake.body, 1, { x = snake.x, y = snake.y })
  table.remove(snake.body)
end

function Snake:grow()
  local tableSize = table.getn(self.body)
  local lastPosition = self.body[tableSize]

  for i = 1, 5 do
    table.insert(self.body, { x = lastPosition['x'], y = lastPosition['y'] })
  end
end

function Snake:isAt(x, y, start)
  local tableSize = table.getn(self.body)

  for i = start, tableSize do
    if x == self.body[i]['x'] and y == self.body[i]['y'] then
      return true
    end
  end

  return false
end

function Snake:collides(fruit)
  return self.x == fruit.x and self.y == fruit.y
end

function Snake:hitWall()
  return (
    snake.x < 0 or snake.y < 0 or
    snake.x > VIRTUAL_WIDTH - BLOCK_SIZE or
    snake.y > VIRTUAL_HEIGHT - BLOCK_SIZE
  )
end

function Snake:update(dx, dy)
  -- Updates the snake's real velocity
  self.dx = dx
  self.dy = dy

  -- Change snake's head position
  self.x = self.x + self.dx
  self.y = self.y + self.dy
end

function Snake:render()
  for i in pairs(self.body) do
    love.graphics.setColor(236 / 255, 235 / 255, 228 / 255)
    love.graphics.rectangle('fill', self.body[i]['x'], self.body[i]['y'], BLOCK_SIZE, BLOCK_SIZE)
  end
end
