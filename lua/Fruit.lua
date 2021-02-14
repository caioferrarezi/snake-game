Fruit = {}

function Fruit:new(x, y)
  local o = {}
  setmetatable(o, self)
  self.__index = self

  self.x = x
  self.y = y

  return o
end

function Fruit:render()
  love.graphics.setColor(239 / 255, 35 / 255, 60 / 255)
  love.graphics.rectangle('fill', self.x, self.y, BLOCK_SIZE, BLOCK_SIZE)
end
