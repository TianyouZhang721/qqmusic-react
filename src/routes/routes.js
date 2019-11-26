import Home from "../pages/Home";
import TopList from "../pages/TopList";
import Login from "../pages/Login";
import Plays from "../pages/Play";
import Recommend from '../pages/Home/Recommend'
import Rank from '../pages/Home/Rank'
import Searchs from '../pages/Home/Searchs'

const routes = [
    {
        path: "/toplist",
        component: TopList
    },
    {
        path: "/play",
        component: Plays
    },
    {
        path:"/login",
        component: Login
    },
    {
        path: "/",
        component: Home,
        children: [
            {
                path: "/home/recommend",
                component: Recommend
            },
            {
                path: "/home/rank",
                component: Rank
            },
            {
                path: "/home/search",
                component: Searchs,
                auth: true
            },
            {
                from: "/",
                to: "/home/recommend"
            }
        ]
    },
    {
        from: "/",
        to: '/'
    }
]
export default routes;