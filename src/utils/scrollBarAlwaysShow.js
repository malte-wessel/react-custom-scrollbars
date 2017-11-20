import {actualBarWidth} from './getScrollbarWidth'

export default function scrollBarAlwaysShow(){
  return !!actualBarWidth()
}
