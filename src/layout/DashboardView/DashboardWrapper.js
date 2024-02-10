import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Menu } from "antd";
import { useSelector } from "react-redux";
import { Colors, Sizes, toCapitalize } from "../../utils/helpers";
import { BiSupport } from "react-icons/bi";

export const DashboardWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const subCategories = useSelector((state) => state.subCategories);
  const [ pathOptions, setPathOptions] = useState([]);
  const [ current, setCurrent ] = useState('');

  useEffect(() => {
    let list = categories?.map((category) => ({id: category._id, name: category.category}));

    products?.forEach(product => {
      list.push({id: product._id, name: product.name});
    });
    subCategories?.forEach(subC => {
      list.push({id: subC._id, name: subC.subCategory});
    });

    const locationArray = location.pathname.split('/').filter((path) => path !== '' && path !== 'home');
    const [,, categoryIdPath] = locationArray;
    setCurrent(categoryIdPath);

    const options = [];
    for (let i = 0; i < locationArray.length; i++) {
      const parentPath = locationArray.slice(0, i).join('/');
      const path = locationArray[i];
      const name = list?.find((some) => some.id === path)?.name || '';

      if (name) {
        options.push({
          title: (
            <Link to={`${parentPath}/${path}`}>
              {toCapitalize(name)}
            </Link>
          )
        });
      }
    }

    setPathOptions(options);
  }, [categories, location.pathname, navigate, products, subCategories]);

  const items = [
    {
      label: <span><BiSupport color={Colors.ICON} size={Sizes.TOP_MENU_ICON} style={{ marginRight: '5px'}} />Customers-Support</span>,
      key: 'customers-support',
      onClick: () => navigate('/customers-support')
    },
    {
      label: <span>Business Relations</span>,
      key: 'business-relations',
      onClick: () => navigate('/customers-support#business-relations')
    },
    {
      label: <span>Gift Card</span>,
      key: 'gift-card',
      onClick: () => navigate('/gift-card')
    },
  ];

  return (
    <>
      <Menu
        disabledOverflow
        mode="horizontal"
        selectedKeys={[current]}
        style={{ background: 'transparent' }}
        items={items}
        className="top-menu-navbar"
      />

      {pathOptions.length > 0 && (
        <Breadcrumb
          separator=">"
          items={[{title: <Link to={'/'}>Home</Link>}, ...pathOptions]}
        />
      )}
    </>
  );
};