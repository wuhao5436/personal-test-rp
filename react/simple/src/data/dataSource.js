const  menuData   =  [
    {
        title: 'react 和 redux 的耦合',
        code: 'react_and_redux',
        id:'001'
    },
    {
        title: 'title2',
        code: 'title2',
        id:'002'
    },
    {
        title: 'title3',
        code: 'title3',
        id:'003'
    },
    {
        title: 'title4',
        code: 'title4',
        id:'004'
    },
    {
        title: '测试react新生命周期',
        code: 'title5',
        id:'005'
    }
]
 
const dataCreater = (type) =>{
    switch (type) {
        case 'menuData': 
            return menuData;
            break;
        case 'menuData1': 
            return menuData;
            break;
        case 'menuData2': 
            return menuData;
            break;
        default : 
            return {};
    }
}

export {dataCreater}