import Vue from 'vue'
import Router from 'vue-router'
import Pico from '@/components/Pico'
import Attributes from '@/components/Attributes'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Pico
        },
        {
            path: '/info',
            name: 'info',
            component: Attributes
        }
    ]
})