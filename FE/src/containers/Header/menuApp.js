export const adminMenu = [
    { //Quản lý người dùng 
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            { //Quản lý kế hoạch khám bênh của admin
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]
    },
    { //Quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            }
        ]
    },
    { //Quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty '
            }
        ]
    },
    { //Quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            }
        ]
    }
];
export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //Quản lý kế hoạch khám bênh của bác sỹ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]
    }
];