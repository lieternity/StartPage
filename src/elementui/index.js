import Vue from 'vue'
import {
    Select,
    Option,
    Collapse,
    Col,
    collapseItem,
    Button,
    Input,
    Switch,
    Popover,
    Card,
    Avatar,
    FormItem,
    Form,
    Upload,
    Timeline,
    TimelineItem,
    Dialog,
    Autocomplete,
    Backtop,
    Divider,
    Slider,
    MessageBox,
    Message,
    Link,
    Tabs,
    TabPane,
} from 'element-ui';

Vue.use(Card)
Vue.use(Link)
Vue.use(Divider)
Vue.use(Slider)
Vue.use(Backtop)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(Dialog)
Vue.use(TimelineItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Avatar)
Vue.use(Select);
Vue.use(Option);
Vue.use(Collapse);
Vue.use(Switch);
Vue.use(Button);
Vue.use(Input);
Vue.use(Popover);
Vue.use(collapseItem);
Vue.use(Autocomplete)
Vue.use(Tabs)
Vue.use(TabPane);


Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

