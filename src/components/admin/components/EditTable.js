import { adminProductsServices } from "../../../services/admin/products-services";
import { adminCategoriesServices } from "../../../services/admin/categories-services";
import { adminSubCategoriesServices } from "../../../services/admin/subCategories-services";
import { ComponentsTypes } from "../../../utils/helpers";
import { Form, Table, Typography, Popconfirm, message, Row, Col, Divider, Button } from "antd";

export const EditTable = ({columns, dataSource, type, handleAdd, onEditMode, ...rest}) => {
  const [ form ] = Form.useForm();
  const isCategoriesList = type === ComponentsTypes.CATEGORIES;
  const isSubCategoriesList = type === ComponentsTypes.SUB_CATEGORIES;
  const componentName = isCategoriesList ? 'category' : isSubCategoriesList ? 'sub-category' : 'product';

  const remove = async (record) => {
    try {
      if (isCategoriesList) {
        await adminCategoriesServices.removeCategory(record._id)
        message.success('Removed');
      } else if (isSubCategoriesList) {
        await adminSubCategoriesServices.removeSubCategory(record._id);
        message.success('Removed');
      } else {
        await adminProductsServices.removeProduct(record._id);
        message.success('Removed');
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  columns.push({
    title: 'Actions',
    key: 'action',
    width: 100,
    render: (_, record) => (
      <Row align={'middle'}>
        <Col>
          <Typography.Link onClick={() => onEditMode(record)}>
            Edit
          </Typography.Link>
        </Col>
        <Divider type="vertical" />
        <Col>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => remove(record)}
          >
            <Typography.Link>
              Delete
            </Typography.Link>
          </Popconfirm>
        </Col>
      </Row>
    ),
  });

  return (
    <Form form={form}>
      <Table
        {...rest}
        bordered
        columns={columns}
        dataSource={dataSource}
        rootClassName="editable-row"
        scroll={{ x: 1200, y: 440 }}
      />
      <Form.Item>
        <Button onClick={handleAdd}>Add {componentName}</Button>
      </Form.Item>
    </Form>
  );
};