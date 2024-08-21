import { useState } from "react";
import { EditTable } from "../components/EditTable";
import { ComponentsTypes } from "../../../utils/helpers";
import { AdminInsert } from "../components/AdminInsert";
import { adminBrandsServices } from "../../../services/admin/brands-services";
import { Space, message } from "antd";
import { useSelector } from "react-redux";
import { Filters } from "../components/Filters";

const Steps = {
  NEW_BRAND: 'NEW_BRAND',
  UPDATE_BRAND: 'UPDATE_BRAND'
};

export const AdminBrands = () => {
  const allBrands = useSelector((state) => (state.brands));

  const [step, setStep] = useState(null);
  const [brand, setBrand] = useState(null);
  const [filterState, setFilterState] = useState({
    name: ''
  });

  const filtering = () => {
    let filteredBrands = [...allBrands];

    if (filterState.name) {
      filteredBrands = filteredBrands.filter((c) => (c.name.toLowerCase().startsWith(filterState.name.toLowerCase())));
    }

    filteredBrands = filteredBrands.sort((a, b) => (
      new Date(b.updatedAt) - new Date(a.updatedAt)
    ));
    return filteredBrands;
  };
  const brands = filtering();

  const handleEditMode = (record) => {
    setStep(Steps.UPDATE_BRAND);
    setBrand(record);
  };

  const removeHandler = async (brand_id) => {
    try {
      await adminBrandsServices.removeBrand(brand_id);
    } catch (err) {
      message.error(err);
    }
  };

  const onFinish = async (values) => {
    let newValue = '';
    let successMessage = '';
    try {
      if (brand) {
        newValue = await adminBrandsServices.updateBrand({...values, _id: brand?._id});
        successMessage = `Brand '${newValue?.name}' with id: '${newValue?._id}' updated successfully`;
      } else {
        newValue = await adminBrandsServices.addBrand(values);
        successMessage = `Brand '${newValue?.category}' with id: '${newValue?._id}' added successfully`;
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 50,
    }
  ];

  return (
    <Space direction="vertical" className="w-100">
      {!step && (
        <>
          <Filters
            brand
            handleFilterChange={(val) => {
              setFilterState({ ...filterState, name: val });
            }}
          />

          <EditTable
            rowKey={'_id'}
            dataSource={brands}
            columns={columns}
            handleAdd={() => setStep(Steps.NEW_BRAND)}
            removeHandler={removeHandler}
            type={ComponentsTypes.BRANDS}
            onEditMode={handleEditMode}
          />
        </>
      )}
      {step === Steps.NEW_BRAND && (
        <AdminInsert
          type={ComponentsTypes.BRANDS}
          onBack={() => setStep(null)}
          onFinish={onFinish}
        />
      )}
      {step === Steps.UPDATE_BRAND && (
        <AdminInsert
          type={ComponentsTypes.BRANDS}
          onBack={() => setStep(null)}
          onFinish={onFinish}
          record={brand}
        />
      )}
    </Space>
  );
};