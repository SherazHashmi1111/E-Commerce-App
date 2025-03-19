import { LayoutDashboard, ShoppingBag, ShoppingCart } from "lucide-react";

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];
export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const  adminSidebarMenuItems =  [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard />
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: <ShoppingBag />
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <ShoppingCart />
  },
]


export const addProductFormElements = [
  {
    label: "Product Name",
    name: "productName",
    componentType: "input",
    type: "text",
    placeholder: "Enter product name",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter product description",
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter price",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    type: "dropdown",
    placeholder: "Select category",
    options: [
      { id: 'men', value: "Men", label: "Men" },
      { id: "women", value: "Women", label: "Women" },
      { id: "child", value: "Child", label: "Child" },
      { id: "accessories", value: "Accessories", label: "Accessories" },
      { id: "electronics", value: "Electronics", label: "Electronics" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    type: "dropdown",
    placeholder: "Select brand",
    options: [
      { id: "nike", value: "Nike", label: "Nike" },
      { id: "adidas", value: "Adidas", label: "Adidas" },
      { id: "puma", value: "Puma", label: "Puma" },
      { id: "apple", value: "Apple", label: "Apple" },
      { id: "samsung", value: "Samsung", label: "Samsung" },
      { id: "sony", value: "Sony", label: "Sony" },
    ],
  },
  {
    label: "Stock",
    name: "stock",
    componentType: "input",
    type: "number",
    placeholder: "Enter stock quantity",
  },
];

export const initialAddProductState = {
  productName: "",
  price: "",
  description: "",
  category: "",
  brand: "",
  stock: "",
  image: null,
};