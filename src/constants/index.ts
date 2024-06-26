import { getRoutePrefix } from '@/utils/route';

 
export const SocialAccounts = [
  {
    type: 'blog',
    icon: `${getRoutePrefix()}/images/resume/social-accounts/blog.svg`,
    link: 'https://hankliu62.github.io/',
    name: '博客',
  },
  {
    type: 'github',
    icon: `${getRoutePrefix()}/images/resume/social-accounts/github.svg`,
    link: 'https://github.com/hankliu62',
    name: 'Github',
  },
  {
    type: 'zhihu',
    icon: `${getRoutePrefix()}/images/resume/social-accounts/zhihu.svg`,
    link: 'https://www.zhihu.com/people/hankliu62/activities',
    name: '知乎',
  },
  {
    type: 'segmentfault',
    icon: `${getRoutePrefix()}/images/resume/social-accounts/segmentfault.svg`,
    link: 'https://segmentfault.com/u/yizhikewangfeixiangdezhu',
    name: 'Segmentfault',
  },
  {
    type: 'weibo',
    icon: `${getRoutePrefix()}/images/resume/social-accounts/weibo.svg`,
    link: 'https://weibo.com/2769648804/profile',
    name: '微博',
  },
];

export const User = {
  Name: '刘小聪',
  Signature: '曾经的梦想，结果都让别人实现了；以后的梦想，也该轮到自己来完成了！',
};

export const Information = [
  {
    type: 'birthday',
    value: '1992.06.12',
  },
  {
    type: 'education',
    value: '湖南商学院 · 计算机科学与技术',
  },
  {
    type: 'graduation',
    value: '2014年',
  },
  {
    type: 'email',
    value: '397694072@qq.com',
  },
  {
    type: 'telephone',
    value: '18521516462',
  },
  {
    type: 'address',
    value: '上海',
  },
];

export const Skills = [
  {
    type: 'html5',
    popover: 'HTML',
    percent: 85,
    contexts: [
      '熟练HTML5与CSS3、DIV+CSS网页布局样式，了解HTML语义化；',
      '熟悉流式布局和弹性盒子布局，能处理PC和移动端各主流浏览器的兼容问题；',
    ],
  },
  {
    type: 'css3',
    popover: 'CSS',
    percent: 75,
    contexts: ['熟练HTML5与CSS3、DIV+CSS网页布局样式；', '熟悉Sass、Less等CSS预处理器语言；'],
  },
  {
    type: 'javascript',
    popover: 'Javascript',
    percent: 85,
    contexts: [
      '熟悉原生JavaScript，熟悉jQuery，了解Zepto；熟悉ES6特性；',
      '熟悉gulp、webpack等工程化构建化工具，能够使用其进行相应的JS、CSS等代码检查、（图片）压缩、优化前端性能；',
      '熟悉Typescript，能够使用其进行相关SDK的开发和维护；',
    ],
  },
  {
    type: 'react',
    popover: 'React',
    percent: 80,
    contexts: ['熟悉React等主流Web前端框架，能够独立开发SPA应用；'],
  },
  {
    type: 'vue',
    popover: 'Vue',
    percent: 75,
    contexts: ['熟悉Vue等主流Web前端框架，能够独立开发SPA应用；'],
  },
  {
    type: 'nodejs',
    popover: 'Node',
    percent: 60,
    contexts: ['了解nodejs，能够使用其搭建简单的服务器;'],
  },
  {
    type: 'golang',
    popover: 'Go',
    percent: 55,
    contexts: ['了解golang，能够阅读代码并且进行简单功能的开发。'],
  },
  {
    type: 'python',
    popover: 'Python',
    percent: 50,
    contexts: ['了解python，能够阅读代码并且进行简单功能的开发。'],
  },
];

export const Experiences = [
  {
    company: '特赞(上海)信息科技有限公司',
    time: '2021.09 - 2023.07',
    profile:
      '特赞致力于通过中国领先、世界一流的平台化和智能化技术，建构创意内容的数字新基建。以企业级内容数据资产管理为中心，特赞打造了连接企业内外「内容生产」和「内容流转」的数字化平台。',
    post: '高级前端工程师',
    works: [
      '内容生产团队中管理后台系统网页功能开发和维护；',
      '内容生产业务通用组建的开发和维护；',
      '创新项目MuseLink，MuseTransfer和MuseArt等前端项目的构建和开发；',
      '特赞运维管理系统前端页面的开发和维护。',
    ],
    image: '/images/resume/experiences/tezign.jpeg',
  },
  {
    company: '上海掌小门教育科技有限公司',
    time: '2018.11 - 2021.07',
    profile:
      '掌门一对一是一个高端中小学在线教育辅导品牌，超万人资深教研团队，深耕在线教育15年。专注小、初、高全科在线1对1辅导，量身定制辅导方案的在线教育公司。',
    post: '研发工程师',
    works: [
      '音视频监控数据展示以及数据统计系统的前后端开发；',
      '音视频通信的ElectronSDK和WebSDK的开发和封装；',
      '自研ZMRTC通道的WebSDK的开发。',
    ],
    image: '/images/resume/experiences/zhangmen.png',
  },
  {
    company: '上海忻知信息科技有限公司',
    time: '2018.1 - 2018.11',
    profile:
      '公司旗下的八爪鱼AI平台是一个智能内容服务平台，主营业务包括帮助内容生产商进行智能分发以及数据分析，同时提供内容决策服务，智能分析用户的需求，零成本解决粉丝获取、粉丝运营以及商业变现等问题。',
    post: '初级软件工程师（前端）',
    works: [
      '官网构建以及页面内容的实现；',
      '负责八爪鱼AI前台客户、后台管理平台页面研发；',
      '负责页面的构建以及网页性能的优化；',
      '官网SEO的优化；',
      '小部分后台接口的实现。',
    ],
    image: '/images/resume/experiences/bzy.jpg',
  },
  {
    company: '美味不用等（上海）信息科技股份有限公司',
    time: '2017.8 - 2017.12',
    profile:
      '美味不用等(上海)美味不用等是专业的智慧餐饮服务商，通过B端SaaS服务和C端产品，解决餐厅的效率、管理、营销、成本和顾客就餐体验等方面的问题。 ',
    post: '前端开发工程师',
    works: [
      '商户管理系统页面内容的开发和维护；',
      '页面通用组件的封装；',
      '代码以及流程规范化的构建；',
      '网页性能的优化。',
    ],
    image: '/images/resume/experiences/mwee.jpg',
  },
  {
    company: '群硕软件开发（上海）有限公司',
    time: '2014.7 - 2017.7',
    profile:
      '群硕致力于提供广泛的软件开发服务和解决方案服务，综合运用最佳实践和领域知识以及一流开发工具和技术，我们为全球客户提供高附加值软件开发及解决方案服务。 ',
    post: '前端开发工程师',
    works: [
      '公司旗下产品群脉SCRM前端页面的开发和维护；',
      '公司旗下服务抱米SOS系统前端页面的开发和维护；',
      '页面通用组件的封装。',
    ],
    image: '/images/resume/experiences/augmentum.jpg',
  },
];

export const Projects = [
  {
    name: '特赞运维管理系统',
    company: '特赞（上海）信息科技有限公司',
    time: '2022.12 - 2023.07',
    profile:
      '特赞运维管理系统是特赞内部的运维平台网站，主要用来管理公司内部的项目，数据库，Redis，集群、容器等资源，使用部署自动化工具和流程来优化项目系统的稳定性和可靠性，使用SQL审核执行流程自动化对数据安全进行严格把控，同时还包括错误监控、故障排除等功能。',
    duties: [
      '独立开发，从构建、开发到维护都是独自一人实现;',
      '配合devops开发人员进行页面功能的设计，所有模块的前端页面的开发和维护，网页功能使用后反馈的迭代;',
      'UI控件采用的是tailwindUI和headlessui，同时使用响应式布局，在PC端的不同的屏幕上都能完美展示网页内容。',
    ],
    summary:
      '该项目前端基础架构是独自一人完成构建和开发任务，由于是公司内部研发人员使用的系统，所以整个系统没有专门的UI设计师，所有页面的设计都是和devops开发讨论进行设计的，第一次从使用者的角度思考如何在功能齐全的情况下如何简化页面操作流程，nextjs默认选择tailwindcss库，通过使用了tailwindcss框架，是我能更快速的开发网页，不需要思考合适的类名和自定义CSS样式，同时巩固了nextjs最新版本的用法，配合typescript编写代码时就进行类型检测，在编译阶段错误检测，使代码质量更好，更清晰。项目中涉及到SQL和yaml的编辑和展示，使用文本编辑器monaco-editor，增加了文本编辑器开发使用经验，系统需要支持实时查看服务器资源和日志内容，还使用了websocket技术，方便与后端数据进行交互，总的来说，学会从简约操作的角度来设计功能界面，巩固已有知识和技术，同时也接触了自动化部署流程等运维相关的新知识。',
    link: 'https://www.tezign.com/page/',
    image: '/images/resume/projects/tezign.jpeg',
  },
  {
    name: '特赞内容生产后台管理系统',
    company: '特赞（上海）信息科技有限公司',
    time: '2021.09 - 2022.11',
    profile:
      '内容生产后台管理系统是特赞基地，是内容生产的数字化管理平台，包含数据面板，CRM/业务管理，数字资源/业务/商城运营等模块，具有从销售线索，到销售机会，企业项目，创意方报价，再到业务签单，业务交互的完整的销售过程，同时还管理创意方和案例的数字资源，以及存储创新产品配置信息。',
    duties: [
      '主要负责CRM/业务管理，Muse创新项目管理等模块的持续更新迭代，以及数字资源功能的改版升级;',
      '封装业务组建，在不同的项目中复用，减少重复代码，提高代码使用率;',
      '升级webpack版本，删除项目无用的页面和组件代码，减少项目体积，提升项目构建速度;',
      '整理项目文档，整理销售线索到业务交互的使用流程文档，便于新入职开发和业务熟悉系统功能;',
    ],
    summary:
      '入职后接手的项目，该系统使用的技术栈为react+sass+typescript+webpack，由于系统内容庞大，由多人合作共同维护，每个人都负责自己的模块，熟悉了多人多功能同时协同迭代开发的方式，增加了解决代码冲突的经验，由于项目使用react17版本，同时熟练了react hooks的使用，由于接手钱项目迭代时间长，项目中存在很多没有使用的页面和组件代码，使得项目体积臃肿，使用DeadCodePlugin插件检测删除无用代码，同时内容模块多，每次构建发布都需要等待很长的时间，不便于开发和测试环境的功能验证，通过升级webpack到最新版本，配合webpack缓存，以及Eslint+Stylelint操作前置到Commit时等方式，大大缩减了构建的时间，提高开发效率和体验。同时在迭代间隙期间，还会穿插一些创新Web项目和小程序的开发，创新项目采用的技术有umijs，nextjs以及tarojs等，学习了新的前端框架。',
    link: 'https://muselink.cc/',
    image: '/images/resume/projects/muselink.svg',
  },
  {
    name: '音视频数据指标监控管理平台',
    company: '上海掌小门教育科技有限公司',
    time: '2018.11 - 2021.07',
    profile:
      '音视频数据指标监控管理平台主要负责监控自研ZMRTC通道音视频实时通讯质量数据的监控以及工单率和上课使用量等多项数据指标的统计。',
    duties: [
      '独立开发，监控前端系统从构建、开发到维护都是独自一人实现；监控后台系统的后期开发和维护；',
      '监控前端系统技术栈采用的是vue全家桶，监控后台系统技术栈采用的是使用python的Flask框架实现一个RESTful API服务器端；',
      '在布局上使用elementUI的响应式栅格布局，在不同的屏幕上都能完美展示网页内容；',
      '针对移动端使用不同的css和切图，图标和表格都兼容移动平台；',
      '在项目之外，封装electron平台和web平台音视频相关的SDK，跨平台兼容和磨平SDK之间的差异性，方便业务端跨平台的接入，真正只需要关注业务端逻辑问题。',
    ],
    summary:
      '该项目系统前端基础架构是独自一人完成构建和开发任务，由于系统迭代需求比较快，能够尽快的给到数据监控页面方便ZMRTC开发人员进行问题的排查，所以前端系统当时选择选择vue全家桶，监控数据图表选择Echart.js库进行数据可视化的展示，然后中后期，由于人员调整，系统后台服务的开发也由本人接手，由于之前对python语言技术了解不是很多，为了能够对监控系统的维护和后续开发，在这一阶段对python语言进行了查漏补缺式的快速的学习，由于每日课程量和webrtc监控数据量比较大，所以后期中使用了pandas这一开源库，为Python编程语言提供高性能,易于使用的数据结构和数据分析工具。由于后期阶段独自一个人完成了项目前后端的开发，总的来说的话，让我对项目前后端分离开发流程又有了深刻的了解，以后台开发的角度来思考，如何封装数据让前端开发人员方便来进行数据的展示，而且还学习的新技术python这一新的语言技术，然后同时也学习了数据库MYSQL和redis相关的知识，拓广技术的知识面。',
    link: '',
    image: '/images/resume/projects/zhangmen.png',
  },
  {
    name: '八爪鱼·AI',
    company: '上海忻知信息科技有限公司',
    time: '2018.09 - 2017.10',
    profile: '八爪鱼AI是国内专业的内容服务平台，服务于内容方，帮助合作方解决粉丝运营的难题。',
    duties: [
      '独立开发，从构建、开发到维护都是独自一人实现;',
      '由于官网需要支持SEO，在架构上使用轻量级的 React 服务端渲染应用框架Next.js;',
      '在布局上使用ant-design的响应式栅格布局，在不同的屏幕上都能完美展示网页内容;',
      '针对移动端使用不同的css和切图，完美兼容移动平台;',
      'SEO的优化，通过网页中标签、keywords、description的设置，网站结构布局优化以及网页代码优化，提升 网站的搜索引擎自然排名。',
    ],
    summary:
      '由于该项目独自一人完成的，所以对于项目的开发流程有了更为深刻的了解，从技术框架的选择到项目初始化的构建的过程中遇到了很多的问题，例如: 为了能让ant-design中的组件按需加载，需要使用 babel-plugin-import 来进行按需加载，由于需要兼容移动端，又引入了 ant-design-mobile UI组件库，对于 babel@7+ 来说，babel-plugin-import 库中的 options 是不能伟数组的，所以导致了当时编译一直报错;由此可见，当我们构建项目的时候，库与库之间依赖的关系，以及版本兼容一定要非常注意，而且对于 eslint 和 stylelint 等 codinglint 的功能一定要在项目初见时加入，不然后面修改起来很麻烦。总的来说的话，让我对项目开发流程又有了深刻的了解，而且还学习的新技术Next.js服务端渲染应用框架。',
    link: 'https://www.bzy.ai/',
    image: '/images/resume/projects/bzy.jpg',
  },
  {
    name: '商户管理系统',
    company: '美味不用等（上海）信息科技股份有限公司',
    time: '2017.08 - 2017.12',
    profile:
      '美味不用等是专业的智慧餐饮服务商，通过我们的产品，解决餐厅的效率、管理、营销、成本和顾客就餐体验等方面的问题。',
    duties: [
      '使用react +react-router+redux 等技术开发网页页面;',
      '运用jQuery、Bootstrap等框架库，提高团队开发效率;',
      '配置 eslint 和 stylelint 等代码检查工具来降低代码的错误率，以及提高代码的一致性;',
      '封装通用的react组件，提高代码的复用率，减少代码的体积，以及降低copy-paste的出错率;',
      '优化代码逻辑，利用 webpack 的 code splitting 特性，将各个步骤的代码进行拆分，实现按需加载，减少代 码的体积;',
      '优化 webpack 配置文件，提高 webpack 构建的速度，减少打包后代码的体积。',
    ],
    summary:
      '由于该项目是我中途接手的一个项目，由于一开始未使用eslint和stylelint等代码检查工具，在项目开发过程中，很容易出现一些低级的语法错误，而且只有等webpack构建完成，刷新页面才能发觉错误，大大的降低来开发速度，加入代码检查工具后这种现象大大减少，所以对于一个项目来说代码检查是一个必不可少的环节。而且在此次项目中学习来很多webpack的优化策略，加深来对webpack的了解。',
    link: 'http://shop.mwee.cn/',
    image: '/images/resume/projects/mwee.jpg',
  },
  {
    name: '抱米SOS系统',
    company: '群硕软件开发（上海）有限公司',
    time: '2015.11 - 2017.07',
    profile:
      '抱米SOS系统的核心目标就是直观体现最有针对性、影响服务判断的客户维护信息。通过定制化标签，智能筛选搜索和关键业绩概述来清晰的了解您客户的需求，并可跨门店分享',
    duties: [
      '使用react + redux + sass 等技术实现前台页面；',
      '封装通用的公共组件，提高代码的复用率；',
      '通过axios与后台数据进行交互，协调后端同学完成产品的开发。',
    ],
    summary:
      '这是工作以后的第二个项目，抱米餐厅管理系统网页端前端使用的技术主要是React+Redux+Webpack，React可以说是2015最热门的前端框架之一，React 只是涉及到MVC框架的V(视图)部分，React 更加注重UI的组件化，在一开始写React的时候，最主要的问题是如何来划分component以及状态的传递。随着不断的学习和练习，使我加深了对React的了解，对前端的组件化也有了一定的认识，通过对Redux的学习，使我对前端树形的数据存储结构以及单向数据流有了初步的了解。总的来说，通过抱米项目，使我对React+Redux这种开发方式有了全新的认识。',
    link: 'https://www.baomiding.com/',
    image: '/images/resume/projects/baomi.png',
  },
  {
    name: '群脉SCRM',
    company: '群硕软件开发（上海）有限公司',
    time: '2014.07 - 2015.11',
    profile:
      '群脉SCRM是一个可定制的社会化的客户管理系统，其基本的功能就是通过一系列的社会渠道来与客户建立关系，同时通过一系列的营销活动和优惠来推动游客成为会员，同时增加会员的忠诚度。 ',
    duties: [
      '使用AngularJs 1.X + CoffeeScript + Sass 等技术后台管理页面;',
      '使用vue + vue.router 等技术微信h5页面;',
      '封装通用的directive指令，提高代码的复用率，例如: baidu map directive;',
      '通过Ajax与后台数据进行交互，与后端工作有效对接。',
    ],
    summary:
      '这个可以说是我入职以来的第一个项目，刚从学校出来，发现在工作中使用到的技术和当时在学校中学到的知识有很大的区别，所以在项目开始的一段时间里，发现完成组长安排的任务还是有一定的难度，但是那段时间也是自己进步比较快的一段时间，从技术方面来讲，群脉前端使用的是组件化开发的思想，我们前端Js框架使用的是AngularJs加上使用的Javascript的扩展语言CoffeeScript，在CSS方面使用的CSS预处理语言Sass，在代码管理工具使用的是Git，这些新的技术和工具都是在这段时间慢慢熟悉起来。我觉得在这段时间收获最大的就是技术方面的积累，同时也熟悉了前后台分工同时开发的工作流程。',
    link: 'https://www.quncrm.com/',
    image: '/images/resume/projects/qunscrm.jpeg',
  },
];

export const BlogLink = 'https://hankliu62.github.io/';

export const Metas = [
  {
    name: 'renderer',
    content: 'webkit',
  },
  {
    name: 'viewport',
    content:
      'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
  },
  {
    name: 'X-UA-Compatible',
    content: 'IE=edge,chrome=1',
  },
  {
    name: 'format-detection',
    content: 'telephone=no',
  },
  {
    name: 'format-detection',
    content: 'email=no',
  },
  {
    name: 'baidu-site-verification',
    content: 'EdvlpBgoG9',
  },
];
