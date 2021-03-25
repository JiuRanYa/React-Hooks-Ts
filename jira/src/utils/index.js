export const isFalsy = (value) => value === 0 ? false : !value

// 清除对象中为空的值
export const cleanObject = (object) => {
  // assign外部object，防止对象引用修改造成的污染
  const result = {...object}

  Object.keys(result).forEach(key => {
    const value = result[key]
    
    if (isFalsy(value)) {
      delete result[key]
    }
  })

  return result
}