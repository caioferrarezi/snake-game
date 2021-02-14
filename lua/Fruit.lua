Fruit = {}

function Fruit:new(x, y)
  local o = {}
  setmetatable(o, self)
  self.__index = self

  self.x = x
  self.y = y

  return o
end
