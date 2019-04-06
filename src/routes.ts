import {RouteConfig} from "vue-router";
import BaseLayout from "./layouts/BaseLayout.vue";
import AppHome from "./pages/AppHome.vue";
import AppEditor from "./pages/AppEditor.vue";

export const routes: RouteConfig[] = [
    {
        path: '',
        component: BaseLayout,
        children: [
            {
                path: '',
                component: AppHome,
                name: 'home',
            },
            {
                path: 'editor',
                component: AppEditor,
                name: 'editor',
            }
        ]
    }
];