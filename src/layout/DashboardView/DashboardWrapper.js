import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Menu } from "antd";
import { useSelector } from "react-redux";
import { toCapitalize } from "../../utils/helpers";

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

  const defaultItems = [
    {
      label: 'Home',
      key: 'home',
      onClick: () => navigate('/home')
    },
  ];

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={[current]}
        style={{background: 'transparent', justifyContent: 'center'}}
        items={defaultItems.concat(categories?.map((category) => {
          return {
            key: category._id,
            label: category.category,
            onClick: () => navigate(`/categories/${category._id}`)
          };
        }))}
      />

      {pathOptions.length > 0 &&
        <Breadcrumb
          items={[{title: <Link to={'/'}>Home</Link>}, ...pathOptions]}
        />
      }
    </>
  );
};