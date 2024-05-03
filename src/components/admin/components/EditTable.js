import { ComponentsTypes } from "../../../utils/helpers";
import { Form, Table, Typography, Popconfirm, Row, Col, Divider, Button } from "antd";

export const EditTable = ({ columns, dataSource, type, handleAdd, onEditMode, removeHandler, ...rest }) => {
  const [ form ] = Form.useForm();
  const isCategoriesList = type === ComponentsTypes.CATEGORIES;
  const isSubCategoriesList = type === ComponentsTypes.SUB_CATEGORIES;
  const isBrandsList = type === ComponentsTypes.BRANDS;
  const componentName = isCategoriesList ? 'category' : isSubCategoriesList ? 'sub-category' : isBrandsList ? 'brand' : 'product';

  const duplicateHandler = async (record) => {
  };

  columns.push({
    title: 'Actions',
    key: 'action',
    width: 200,
    render: (_, record) => (
      <Row align={'middle'}>
        <Col>
          <Typography.Link onClick={() => onEditMode(record)}>
            Edit
          </Typography.Link>
        </Col>
        <Divider type="vertical" />
        <Col>
          <Typography.Link onClick={() => duplicateHandler(record)}>
            Duplicate
          </Typography.Link>
        </Col>
        <Divider type="vertical" />
        <Col>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => removeHandler(record._id)}
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
      />
      <Form.Item className="mt-20">
        <Button onClick={handleAdd}>Add {componentName}</Button>
      </Form.Item>
    </Form>
  );
};