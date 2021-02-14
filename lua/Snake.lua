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
