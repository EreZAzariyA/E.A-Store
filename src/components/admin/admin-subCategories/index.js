import { useSelector } from "react-redux";
import { Input, Space, message } from "antd";
import { useEffect, useState } from "react";
import { EditTable } from "../components/EditTable";
import { AdminInsert } from "../admin-insert";
import { adminCategoriesServices } from "../../../services/admin/categories-services";
import { getError } from "../../../utils/helpers";

const Steps = {
  NEW_ROW: "NEW ROW",
};

export const SubCategoriesTable = () => {
  const products = useSelector((state) => (state.products));
  const subCategories = useSelector((state) => (state.subCategories));
  const [ filteredSubCategories, setFilteredSubCategories ] = useState([]);
  const [step, setStep] = useState(null);

  const [ filterState, setFilterState ] = useState({
    subCategory: '',
  });

  useEffect(() => {
    if (filterState.subCategory) {
      const subCategoryToSearch = filterState.subCategory.toLowerCase();
      const filteredSubCategories = [...subCategories].filter((subC) => {
        return subC.subCategory.toLowerCase().startsWith(subCategoryToSearch)
      });
      setFilteredSubCategories(filteredSubCategories);
    } else {
      setFilteredSubCategories(subCategories);
    }
  }, [filterState.subCategory, subCategories]);

  const onFinish = async (values) => {
    try {
      const addedSubCategory = await adminCategoriesServices.addSubCategory(values);
      message.success(`Sub-Category '${addedSubCategory.subCategory}' with id: '${addedSubCategory._id}' added successfully`);
      setStep(null);
    } catch (error) {
      message.error(getError(error.message));
    }
  };

  const handleAdd = () => {
    setStep(Steps.NEW_ROW);
  };

  const columns = [
    {
      key: '_id',
      title: 'ID',
      dataIndex: '_id',
      editable: true,
      width: 220,
    },
    {
      key: 'subCategory',
      title: 'Sub-Category',
      dataIndex: 'subCategory',
      sorter: (a, b) => (a.subCategory.localeCompare(b.subCategory)),
      editable: true,
      width: 220,
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
    <Space direction="vertical" style={{width: '99%'}}>
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
            loading={!subCategories}
            rowKey={'_id'}
            columns={columns}
            dataSource={filteredSubCategories}
            component={'sub-categories'}
            handleAdd={handleAdd}
          />
        </>
      )}

      {(step && step === Steps.NEW_ROW) && (
        <AdminInsert
          component={'sub-categories'}
          onBack={() => setStep(null)}
          onFinish={onFinish}
        />
      )}

    </Space>
  );
};