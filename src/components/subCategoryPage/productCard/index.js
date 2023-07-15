// import { useSelector } from "react-redux";
import { CustomDivider } from "../../components/Divider";
import { HeartIcon, brands } from "../../../utils/helpers";
import { Button, Card, Col, Row, Tooltip } from "antd";
import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined";
import "./productCard.css";


export const ProductCard = (props) => {
  const { product } = props;
  // const categories = useSelector((state) => state.categories);
  // const [category, setCategory] = useState(null);

  // useEffect(() => {
  //   const category = [...categories].find((category) => category._id === product.category_id);
  //   setCategory(category);
  // }, [categories]);

  return (
    <Card
      className="card product-card"
      cover={<img alt={''} src={product.image_url} />}
    >
      <Row justify={'space-between'} align={'middle'}>
        <Col>
          <div className="logo">
            <img src={brands['samsung'].image_url} alt="" />
          </div>
        </Col>

        <Col>
          <Row gutter={5}>
            <Col>
            <Tooltip title='Add to favourites'>
              <Button shape="circle" size="small">
                <HeartIcon />
              </Button>
            </Tooltip>
            </Col>
            
            <Col>
            <Tooltip title='Compare to other brands'>
              <Button shape="circle" size="small">
                <BarChartOutlined />
              </Button>
            </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col>
          <p>
            <span>SKU: {product?._id?.slice(0, product?._id?.length / 3)}</span>
          </p>
        </Col>
      </Row>

      <Row style={{ height: '70px' }}>
        <Col>
          <p>{product.description}</p>
        </Col>
      </Row>

      <Row justify={'end'}>
        <Col>
          <p>${product.price}</p>
        </Col>
      </Row>
      <CustomDivider />

      <Row justify={'start'} gutter={[10, 10]} className="mt-10">
        <Col>
          <Tooltip title='Add to cart'>
            <Button type="primary" style={{ background: 'orange' }}>
              <ShoppingCartOutlined style={{ fontSize: '16px' }} />
            </Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title='Buy now'>
            <Button type="primary" style={{ background: 'green' }}>
              Buy now
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </Card>
  );
};