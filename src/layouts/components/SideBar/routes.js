export const roleEnum = {
  Admin: 1,
  Supervisor: 2,
  Employee: 3,
  Customer: 4
}

export const routes = [
  {
    title: 'Tổng quan',
    path: '/admin',
    exactly: true,
    permissions: [roleEnum.Employee, roleEnum.Admin]

  },
  {
    title: 'Quản lý sách',
    path: '/admin/book',
    subMenu: [
       {
        title: 'Thêm sách mới',
        path: '/admin/book/add',
       },
       {
        title: 'Quản lý tác giả',
        path: '/admin/author',
      },
    ],
    permissions: [roleEnum.Employee, roleEnum.Admin]
  },
  {
    title: 'Quản lý đơn hàng',
    path: '/admin/order',
    permissions: [roleEnum.Employee, roleEnum.Admin]
  },
  {
    title: 'Mã giảm giá',
    path: '/admin/voucher',
    permissions: [roleEnum.Employee, roleEnum.Admin]
  },
  {
    title: 'Khách hàng',
    path: '/admin/customer',
    permissions: [roleEnum.Employee, roleEnum.Admin]
  },
  {
    title: 'Nhân viên',
    path: '/admin/Employee',
    permissions: [roleEnum.Admin]
  },
];