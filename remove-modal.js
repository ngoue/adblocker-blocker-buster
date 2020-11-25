/**
 * This works for any tp-modal.
 *
 * Tested:
 * https://www.forbes.com
 * https://www.sltrib.com
 */
function tpModal() {
  // items to remove
  let classNames = ['tp-modal', 'tp-backdrop']

  // remove all items
  for (let className of classNames) {
    console.log('removing element: ' + className)
    let collection = document.getElementsByClassName(className)
    for (let item of collection) {
      console.log('removing item: ' + item.toString())
      item.remove()
    }
  }

  // remove classes from body
  let bodyClassNames = ['adblock-on', 'tp-modal-open']
  for (let bodyClassName of bodyClassNames) {
    console.log('removing body class: ' + bodyClassName)
    document.body.classList.remove(bodyClassName)
  }
}

/**
 * Sourcepoint
 *
 * Tested:
 * https://www.usatoday.com
 */
function sourcepoint() {
  let partials = ['sp_message_container', 'sp_veil']

  for (let partial of partials) {
    let selector = '[class*=' + partial + ']'
    console.log('removing elements: ' + selector)
    let collection = document.querySelectorAll(selector)
    for (let item of collection) {
      console.log('removing item: ' + item.toString())
      item.remove()
    }
  }

  for (let item of [document.documentElement, document.body]) {
    item.style.overflowY = 'auto'
  }
}

// TODO: try invoking functions based on the host
tpModal()
sourcepoint()
