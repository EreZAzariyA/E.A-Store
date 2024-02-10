import { useState } from "react";
import { useSelector } from "react-redux";
import { EditTable } from "../components/EditTable";
import { AdminInsert } from "../components/AdminInsert";
import { adminSubCategoriesServices } from "../../../services/admin/subCategories-services";
import { ComponentsTypes, getError } from "../../../utils/helpers";
import { Input, Space, message } from "antd";

const Steps = {
  ADD_SUBCATEGORY: "ADD_SUBCATEGORY",
  UPDATE_SUBCATEGORY: "UPDATE_SUBCATEGORY",
};

export const SubCategoriesTable = () => {
  const products = useSelector((state) => (state.products));
  const allSubCategories = useSelector((state) => (state.subCategories));

  const [subCategory, setSubCategory] = useState(null);
  const [step, setStep] = useState(null);
  const [filterState, setFilterState] = useState({
    subCategory: '',
  });

  const filtering = () => {
    let filteredSubCategories = [...allSubCategories];

    if (filterState.subCategory) {
      filteredSubCategories = filteredSubCategories.filter((p) => p.subCategory.startsWith(filterState.subCategory))
    }

    filteredSubCategories.sort((a, b) => (
      new Date(b.updatedAt) - new Date(a.updatedAt)
    ));
    return filteredSubCategories;
  };
  const subCategories = filtering();

  const handleEditMode = (record) => {
    setStep(Steps.UPDATE_SUBCATEGORY);
    setSubCategory(record);
  };

  const removeHandler = async (subCategory_id) => {
    try {
      await adminSubCategoriesServices.removeSubCategory(subCategory_id);
    } catch (err) {
      message.error(err);
    }
  };

  const onFinish = async (values) => {
    let newValue;
    let successMessage;

    try {
      if (subCategory) {
        newValue = await adminSubCategoriesServices.updateSubCategory({...values, _id: subCategory._id });
        successMessage = `Sub-Category '${newValue?.subCategory}' with id: '${newValue?._id}' updated successfully`;
      } else {
        newValue = await adminSubCategoriesServices.addSubCategory(values);
        successMessage = `Sub-Category '${newValue?.subCategory}' with id: '${newValue?._id}' added successfully`;
      }
      if (newValue) {
        message.success(successMessage);
        setStep(null);
      }
    } catch (error) {
      message.error(getError(error.message));
    }
  };

  const columns = [
    {
      key: 'subCategory',
      title: 'Sub-Category',
      dataIndex: 'subCategory',
      sorter: (a, b) => (a.subCategory.localeCompare(b.subCategory)),
      editable: true,
      width: 100,
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
      key: 'products',
      title: 'Products',
      shouldUpdate: false,
      width: 100,
      render: (_, record) => {
        const productsLength = [...products].filter((p) => (p.subCategory_id === record._id)).length;
        return <p>{ productsLength ?? 0}</p>
      },
      sorter: (a, b) => {
        const aLength = [...products].filter((p) => (p.subCategory_id === a._id)).length;
        const bLength = [...products].filter((p) => (p.subCategory_id === b._id)).length;

        if (aLength < bLength) {
          return -1;
        } else if (aLength > bLength) {
          return 1;
        } else {
          return 0;
        }
      },
    },
  ];

  return (
    <Space direction="vertical" className="w-100">
      {!step && (
        <>
          <Space align="center" wrap>
            <Input
              allowClear
              type="text"
              placeholder='Search sub-category'
              onChange={(val) => setFilterState({...filterState, subCategory: val.target.value})}
            />
          </Space>

          <EditTable
            columns={columns}
            loading={!subCategories}
            rowKey={'_id'}
            dataSource={subCategories}
            type={ComponentsTypes.SUB_CATEGORIES}
            handleAdd={() => setStep(Steps.ADD_SUBCATEGORY)}
            onEditMode={handleEditMode}
            removeHandler={removeHandler}
            scroll={{ x: 1300, y: 440 }}
          />
        </>
      )}

      {(step && step === Steps.ADD_SUBCATEGORY) && (
        <AdminInsert
          type={ComponentsTypes.SUB_CATEGORIES}
          onBack={() => setStep(null)}
          onFinish={onFinish}
        />
      )}
      {(step && step === Steps.UPDATE_SUBCATEGORY) && (
        <AdminInsert
          type={ComponentsTypes.SUB_CATEGORIES}
          onBack={() => setStep(null)}
          onFinish={onFinish}
          record={subCategory}
        />
      )}
    </Space>
  );
};