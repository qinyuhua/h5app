import Vue from 'vue'
import {
  NavBar, Swipe, SwipeItem, Cell,
  CellGroup, Popup, Dialog, Button,
  Field, Toast, Checkbox, CheckboxGroup,
  Loading, Lazyload, Row, Col, Icon,
  List, PullRefresh, DatetimePicker, PasswordInput, NumberKeyboard,
  Collapse,
} from 'vant'

Vue.use(NavBar)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Cell).use(CellGroup)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Popup)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Lazyload)
Vue.use(Row).use(Col)
Vue.use(Icon)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(DatetimePicker)
Vue.use(Collapse)
Vue.use(PasswordInput).use(NumberKeyboard)
