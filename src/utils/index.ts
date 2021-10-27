const trimArr = function (s: string) {
  return (s || '').split(' ').filter((item) => !!item.trim())
}

export function hasClass(el: HTMLElement | Element, cls: string): boolean {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1)
    throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    const className = el.getAttribute('class') || ''
    return className.split(' ').includes(cls)
  }
}

export function addClass(el: HTMLElement | Element, cls: string): void {
  if (!el) return
  let className = el.getAttribute('class') || ''
  const curClass = trimArr(className)
  const classes = (cls || '')
    .split(' ')
    .filter((item) => !curClass.includes(item) && !!item.trim())

  if (el.classList) {
    el.classList.add(...classes)
  } else {
    className += ` ${classes.join(' ')}`
    el.setAttribute('class', className)
  }
}

export function removeClass(el: HTMLElement | Element, cls: string): void {
  if (!el || !cls) return
  const classes = trimArr(cls)
  let curClass = el.getAttribute('class') || ''

  if (el.classList) {
    el.classList.remove(...classes)
    return
  }
  classes.forEach((item) => {
    curClass = curClass.replace(` ${item} `, ' ')
  })
  const className = trimArr(curClass).join(' ')
  el.setAttribute('class', className)
}
