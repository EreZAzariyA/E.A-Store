import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EditTable } from "../components/EditTable";
import { AdminInsert } from "../components/AdminInsert";
import { adminCategoriesServices } from "../../../services/admin/categories-services";
import { ComponentsTypes } from "../../../utils/helpers";
import { Input, Space, message } from "antd";

const Steps = {
  ADD_CATEGORY: "ADD_CATEGORY",
  UPDATE_CATEGORY: "UPDATE_CATEGORY",
};

export const CategoriesTable = () => {
  const products = useSelector((state) => (state.products));
  const allCategories = useSelector((state) => (state.categories));
  const [filterState, setFilterState] = useState({
    category: ''
  });
  const categories = filtering();

  const [category, setCategory] = useState(null);
  const [step, setStep] = useState(null);


  useEffect(() => {
    if (step && step === Steps.ADD_CATEGORY) {
      setCategory(null);
    }
  }, [step]);

  function filtering() {
    let filteredCategories = [...allCategories];

    if (filterState.category) {
      filteredCategories.filter((c) => (c.category.toLowerCase().startsWith(filterState.category.toLowerCase())));
    }

    return filteredCategories;
  };

  const handleEditMode = (record) => {
    setStep(Steps.UPDATE_CATEGORY);
    setCategory(record);
  };

  const onFinish = async (values) => {
    let newValue = '';
    let successMessage = '';
    try {
      if (category) {
        newValue = await adminCategoriesServices.updateCategory({...values, _id: category?._id});
        successMessage = `Category '${newValue?.category}' with id: '${newValue?._id}' updated successfully`;
      } else {
        newValue = await adminCategoriesServices.addCategory(values);
        successMessage = `Category '${newValue?.category}' with id: '${newValue?._id}' added successfully`;
      }
      if (newValue) {
        message.success(successMessage);
        setStep(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      key: 'category',
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => (a.category.localeCompare(b.category)),
      editable: true,
      width: 120,
      fixed: 'left',
    },
    {
      title: 'Image URL',
      key: 'image_url',
      dataIndex: 'image_url',
      editable: true,
      width: 200,
      render: (text) => (
        <p className="long-text-field">{text}</p>
      ),
    },
    {
      key: 'subCategories',
      title: 'Sub-Categories',
      dataIndex: 'subCategories',
      render: (subCategories) => {
        return <p>{ subCategories?.length || 0}</p>
      },
      width: 160,
    },
    {
      key: 'products',
      title: 'Products',
      shouldUpdate: false,
      render: (_, record) => {
        const productsLength = [...products].filter((p) => (p.category_id === record._id)).length;
        return <p>{ productsLength ?? 0}</p>
      },
      sorter: (a, b) => {
        const aLength = [...products].filter((p) => (p.category_id === a._id)).length;
        const bLength = [...products].filter((p) => (p.category_id === b._id)).length;

        if (aLength < bLength) {
          return -1;
        } else if (aLength > bLength) {
          return 1;
        } else {
          return 0;
        }
      },
      width: 100,
    },
  ];

  return (
    <Space direction="vertical" className="w-100">
      {!step && (
        <>
          <Space>
            <Input
              type="text"
              placeholder='Search category'
              onChange={(val) => setFilterState({...filterState, category: val.target.value})}
            />
          </Space>
          <EditTable
            loading={!categories}
            rowKey={'_id'}
            columns={columns}
            dataSource={categories}
            type={ComponentsTypes.CATEGORIES}
            handleAdd={() => setStep(Steps.ADD_CATEGORY)}
            onEditMode={handleEditMode}
          />
        </>
      )}

      {(step && step === Steps.ADD_CATEGORY) && (
        <AdminInsert
          type={ComponentsTypes.CATEGORIES}
          onBack={() => setStep(null)}
          onFinish={onFinish}
        />
      )}
      {(step && step === Steps.UPDATE_CATEGORY) && (
        <AdminInsert
          type={ComponentsTypes.CATEGORIES}
          onBack={() => setStep(null)}
          onFinish={onFinish}
          record={category}
        />
      )}
    </Space>
  );
};