/**
 * This works for any tp-modal.
 *
 * Tested:
 * https://www.forbes.com
 */

// items to remove
let classNames = ['tp-modal', 'tp-backdrop']

// remove all items
for (let className of classNames) {
  console.log('removing element: ' + className)
  let collection = document.getElementsByClassName(className);
  for (let item of collection) {
    console.log('removing item: ' + item.toString())
    item.remove();
  }
}

// remove classes from body
let bodyClassNames = ['adblock-on', 'tp-modal-open'];
for (let bodyClassName of bodyClassNames) {
  console.log('removing body class: ' + bodyClassName)
  document.body.classList.remove(bodyClassName);
}
